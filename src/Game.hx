package;

import Entity;
import MovingEntity;
import openfl.display.Bitmap;
import openfl.display.BitmapData;
import openfl.display.Sprite;
import openfl.errors.Error;
import openfl.events.Event;
import openfl.geom.Point;
import openfl.geom.Rectangle;
import openfl.ui.Keyboard;
import openfl.Lib;

/**
 * ...
 * @author 01101101
 */
class Game extends Sprite
{

	static public var TAR:Rectangle = new Rectangle();
	static public var TAP:Point = new Point();
	
	static public var WIDTH:Int = 640;
	static public var HEIGHT:Int = 640;
	
	static public var INST:Game;

	var canvas:Bitmap;
	var canvasData:BitmapData;

	var entities:Array<Entity>;
	public var player:Player;
	var aura:Aura;

	var spawnDelay:Int;
	var spawnTick:Int;

	var hasGameStarted:Bool;
	var hasGameEnded:Bool;

	public function new ()
	{
		if (INST != null)
			throw new Error("Game already instanciated!");
		else
			INST = this;
		
		super();
		
		// Setup canvas
		canvasData = new BitmapData(WIDTH, HEIGHT, false);
		canvas = new Bitmap(canvasData);
		canvas.x = canvas.y = 0;
		addChild(canvas);

		reset();
		addEventListener(Event.ENTER_FRAME, update);
	}

	function reset ()
	{
		entities = [];

		spawnDelay = 300;
		spawnTick = 10;

		hasGameStarted = hasGameEnded = false;

		if (player == null)
			player = new Player();
		entities.remove(player);
		entities.push(player);
		player.x = WIDTH / 2;
		player.y = HEIGHT / 2;
		player.currentMove = Move.CONTROLLED;
	}

	function startGame ()
	{
		if (aura == null)
			aura = new Aura();
		aura.x = player.x;
		aura.y = player.y;
		entities.remove(aura);
		entities.push(aura);

		hasGameStarted = true;
	}
	
	function update (e:Event)
	{
		// If game has started and not ended
		if (hasGameStarted && !hasGameEnded)
		{
			// Spawn
			spawnTick--;
			if (spawnTick == 0) {
				spawnEnemy();
				spawnTick = spawnDelay;
			}
		}
		else if (!hasGameStarted)
		{
			if (Controls.isDown(Keyboard.SPACE))
				startGame();
		}
		else if (hasGameEnded)
		{
			if (Controls.isDown(Keyboard.SPACE))
				reset();
		}

		// Update entities
		for (e in entities) {
			e.update();
		}
		// Collision checks
		checkCollisions();
		// Clean up dead entities
		entities = entities.filter(filterDead);
		// Update entities
		for (e in entities) {
			e.postUpdate();
		}
		// Render
		render();
	}

	function spawnEnemy (playerOnTop:Bool = true)
	{
		var e = new Enemy();
		var xx = player.x;
		var yy = player.y;
		while (getDistanceXY(xx, yy, player.x, player.y) <= Sprites.getSheet(Sprites.AURA).data.height/2)
		{
			xx = Std.random(WIDTH - 2*e.cx);
			yy = Std.random(HEIGHT - 2*e.cy);
		}
		e.x = xx;
		e.y = yy;
		entities.push(e);
		// Put the player back on top
		if (playerOnTop) {
			entities.remove(player);
			entities.push(player);
		}
	}
	
	function filterDead (e:Entity) :Bool
	{
		return !e.isDead;
	}
	
	function checkCollisions ()
	{
		// Check every entity ONCE against every other
		for (i in 0...entities.length)
		{
			var ea = entities[i];
			// Skip entity if dead
			if (ea == null || ea.isDead)
				continue;
			
			for (j in i + 1...entities.length) 
			{
				var eb = entities[j];
				// Skip entity if dead
				if (eb == null || eb.isDead)
					continue;
				// Skip check if entities are not supposed to collide
				if (ea.collList.indexOf(eb.collType) == -1)
					continue;
				// Resolve collision if entities are effectively colliding
				var dist = getDistance(ea, eb);
				if (dist < ea.collRadius + eb.collRadius)
					resolveCollision(ea, eb, dist);
			}
		}
	}
	
	function resolveCollision (ea:Entity, eb:Entity, dist:Float)
	{
		// Enemy/Aura collisions
		if (Std.is(ea, Aura) && Std.is(eb, Enemy))
			cast(eb, Enemy).isInAura = true;
		else if (Std.is(ea, Enemy) && Std.is(eb, Aura))
			cast(ea, Enemy).isInAura = true;
		// Player/anything collisions
		else if (Std.is(ea, Player) || Std.is(eb, Player))
			endGame();
	}
	
	public function getDistance (ea:Entity, eb:Entity) :Float
	{
		var dx = (eb.x + eb.cx) - (ea.x + ea.cx);
		var dy = (eb.y + eb.cy) - (ea.y + ea.cy);
		return Math.sqrt(dx * dx + dy * dy);
	}
	
	public function getDistanceXY (eax:Float, eay:Float, ebx:Float, eby:Float) :Float
	{
		var dx = ebx - eax;
		var dy = eby - eay;
		return Math.sqrt(dx * dx + dy * dy);
	}
	
	function render ()
	{
		// Render all graphics
		canvasData.fillRect(canvasData.rect, 0xFF11111F);
		// Render entities
		for (e in entities) {
			Sprites.draw(canvasData, e.spriteID, e.x, e.y, e.frame);
		}
	}

	function endGame ()
	{
		hasGameEnded = true;
		player.currentMove = Move.STATIC;
		player.xVel = player.yVel = 0;
		entities.remove(player);
		entities.remove(aura);
	}

}