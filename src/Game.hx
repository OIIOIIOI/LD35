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
		
		reset();
		addEventListener(Event.ENTER_FRAME, update);
	}

	function reset ()
	{
		// Setup canvas
		canvasData = new BitmapData(WIDTH, HEIGHT, false);
		canvas = new Bitmap(canvasData);
		canvas.x = canvas.y = 0;
		addChild(canvas);
		
		entities = [];

		spawnTick = spawnDelay = 120;

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
		e.x = Std.random(WIDTH - 2*e.cx);
		e.y = Std.random(HEIGHT - 2*e.cy);
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
			if (ea.isDead)
				continue;
			
			for (j in i + 1...entities.length) 
			{
				var eb = entities[j];
				// Skip entity if dead
				if (eb.isDead)
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
		if (Std.is(ea, Aura) && Std.is(eb, Enemy))
			cast(eb, Enemy).isInAura = true;
		else if (Std.is(ea, Enemy) && Std.is(eb, Aura))
			cast(ea, Enemy).isInAura = true;
		// Player collision
		else if (Std.is(ea, Player) || Std.is(eb, Player))
			endGame();

		// if (ea.collType == CollType.AURA && eb.collType == CollType.ENEMY)
		// {
		// 	// var enemy = cast(eb, Enemy);
		// 	if (Std.is(ea, Aura) && Std.is(eb, Enemy))
		// 	{
		// 		trace("shrink "+eb);
		// 		cast(eb, Enemy).shrink();
		// 	}
			/*var ena = cast(ea, Enemy);
			var enb = cast(eb, Enemy);
			var ang = Math.atan2(ea.y-eb.y, ea.x-eb.x);
			var diff = (ea.collRadius + eb.collRadius) - dist;
			diff *= 0.5;

			var velTotal = ena.velMax + enb.velMax;
			var ratioa = ena.velMax / velTotal;
			var ratiob = 1 - ratioa;

			ena.x += Math.cos(ang) * diff;
			ena.y += Math.sin(ang) * diff;
			enb.x -= Math.cos(ang) * diff;
			enb.y -= Math.sin(ang) * diff;
			ena.xVel = velTotal * ratiob * Math.cos(ang);
			ena.yVel = velTotal * ratiob * Math.sin(ang);
			enb.xVel = velTotal * ratioa * -Math.cos(ang);
			enb.yVel = velTotal * ratioa * -Math.sin(ang);*/
			// ena.xVel = 0;
			// ena.yVel = 0;
			// enb.xVel = 0;
			// enb.yVel = 0;
		// }
	}
	
	public function getDistance (ea:Entity, eb:Entity) :Float
	{
		var dx = (eb.x + eb.cx) - (ea.x + ea.cx);
		var dy = (eb.y + eb.cy) - (ea.y + ea.cy);
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