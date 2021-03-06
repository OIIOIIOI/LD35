package;

import Entity;
import MovingEntity;
import Particle;
import openfl.display.Bitmap;
import openfl.display.BitmapData;
import openfl.display.Sprite;
import openfl.errors.Error;
import openfl.events.Event;
import openfl.geom.Matrix;
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
	var particles:Array<Particle>;

	var title:Title;

	var background:Array<Entity>;

	public var player:Player;
	var aura:Aura;

	var spawnDelay:Int;
	var spawnTick:Int;
	
	public var shakeOffset:Int = 10;
	var shakeAmount:Int = 3;
	var shakeTick:Int;
	var shakeMode:ShakeMode;

	var isGrinding:Bool;

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
		canvasData = new BitmapData(WIDTH + 2 * shakeOffset, HEIGHT + 2 * shakeOffset, false);
		canvas = new Bitmap(canvasData);
		canvas.x = canvas.y = -shakeOffset;
		addChild(canvas);

		addChild(UI.INST.canvas);

		reset(true);

		addEventListener(Event.ENTER_FRAME, update);
	}

	function reset (first:Bool = false)
	{
		background = [];
		entities = [];
		particles = [];

		spawnDelay = 120;
		spawnTick = 10;
		shakeTick = 0;
		shakeMode = ShakeMode.FIXED;

		hasGameStarted = hasGameEnded = isGrinding = false;

		if (player == null)
			player = new Player();
		entities.remove(player);
		entities.push(player);
		player.x = 322;
		player.y = 355;
		player.currentMove = Move.DEFAULT;

		setupBackground();

		UI.INST.reset(first);

		if (first)
		{
			title = new Title();
			title.x = title.y = shakeOffset;
			entities.push(title);
		}
	}

	function setupBackground ()
	{
		var e:Background;
		e = new Background(Sprites.BG_F, 30);
		background.push(e);
		e = new Background(Sprites.BG_E, 20);
		background.push(e);
		e = new Background(Sprites.BG_D, 30);
		background.push(e);
		e = new Background(Sprites.BG_C, 40);
		background.push(e);
		e = new Background(Sprites.BG_B, 20);
		background.push(e);
		e = new Background(Sprites.BG_A, 30);
		background.push(e);
	}

	function startGame ()
	{

		if (aura == null)
			aura = new Aura();
		aura.x = player.x;
		aura.y = player.y;
		entities.remove(aura);
		entities.push(aura);

		title.isDead = true;
		UI.INST.reset();

		player.currentMove = Move.CONTROLLED;
		
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
				preSpawnEnemy();
				spawnTick = spawnDelay;
			}
			// Update UI
			UI.INST.update();
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

		// Update background
		for (e in background) {
			e.update();
		}

		// Update entities
		for (e in entities) {
			e.update();
		}

		// Collision checks
		var wasGrinding = isGrinding;
		isGrinding = false;
		checkCollisions();

		// Clean up dead entities
		entities = entities.filter(filterDead);

		// Post update entities
		for (e in entities) {
			e.postUpdate();
		}
		
		// Update particles
		for (p in particles) {
			p.update();
			p.postUpdate();
		}
		// Clean up dead particles
		particles = particles.filter(filterDead);

		// Render
		render();

		// Screen shake
		if (shakeTick > 0) {
			var sa:Float = shakeAmount;
			if (shakeMode == ShakeMode.RANDOM)
				sa = Math.random()*shakeAmount;
			canvas.x = -shakeOffset + sa * Std.random(2) * 2 - 1;
			canvas.y = -shakeOffset + sa * Std.random(2) * 2 - 1;
			shakeTick--;
		}
		else if (shakeTick == 0) {
			canvas.x = canvas.y = -shakeOffset;
			shakeTick--;
		}

		// Grind loop
		if (isGrinding && !wasGrinding)
			SoundMan.playLoop(SoundMan.GRIND, 0.5);
		else if (!isGrinding)
			SoundMan.stopLoop(SoundMan.GRIND);
	}

	function preSpawnEnemy ()
	{
		var xx = player.x;
		var yy = player.y;
		while (getDistanceXY(xx, yy, player.x, player.y) <= Sprites.getSheet(Sprites.AURA).data.height/2)
		{
			xx = Std.random(WIDTH) + shakeOffset;
			yy = Std.random(HEIGHT) + shakeOffset;
		}
		spawnParticles(ParticleType.APPEAR, xx, yy);
	}

	public function spawnEnemy (xx:Float, yy:Float)
	{
		var e = new Enemy(0);
		e.x = xx;
		e.y = yy;
		spawnEntity(e);
	}

	public function spawnEntity (e:Entity, playerOnTop:Bool = true)
	{
		entities.push(e);
		// Put the player back on top
		if (playerOnTop) {
			entities.remove(player);
			entities.push(player);
		}
	}
	
	public function spawnParticles (t:ParticleType, px:Float, py:Float, amount:Int = 1)
	{
		switch (t)
		{
			default:
				for (i in 0...amount)
				{
					var p = new Particle(t);
					p.x = px + (Std.random(2)*2-1) * 4;
					p.y = py + (Std.random(2)*2-1) * 4;
					p.x -= p.cx;
					p.y -= p.cy;
					particles.push(p);
				}
		}
	}
	
	public function spawnFollowParticles (t:ParticleType, e:MovingEntity, amount:Int = 1)
	{
		switch (t)
		{
			default:
				for (i in 0...amount)
				{
					var p = new Particle(t);
					p.x = e.x + e.cx - p.cx;
					p.y = e.y + e.cy - p.cy;
					p.xVel = e.xVel;
					p.yVel = e.yVel;
					particles.push(p);
				}
		}
	}
	
	public function filterDead (e:Entity) :Bool
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
				if (dist < ea.collRadius + eb.collRadius) {
					var continueLoop = resolveCollision(ea, eb, dist);
					if (!continueLoop)
						return;
				}
			}
		}
	}
	
	function resolveCollision (ea:Entity, eb:Entity, dist:Float) :Bool
	{
		// Enemy/Aura collisions
		if (Std.is(ea, Aura) && Std.is(eb, Enemy))
			enemyInAura(cast(eb, Enemy));
		else if (Std.is(ea, Enemy) && Std.is(eb, Aura))
			enemyInAura(cast(ea, Enemy));
		else if (Std.is(ea, Player) && Std.is(eb, Bonus))
			cast(eb, Bonus).pickUp();
		else if (Std.is(ea, Bonus) && Std.is(eb, Player))
			cast(ea, Bonus).pickUp();
		// Player/anything collisions
		else if (Std.is(ea, Player) || Std.is(eb, Player)) {
			endGame();
			return false;
		}

		return true;
	}

	function enemyInAura (e:Enemy)
	{
		e.isInAura = true;
		isGrinding = true;
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
		// Render background
		for (e in background) {
			Sprites.draw(canvasData, e.spriteID, e.x + e.rox, e.y + e.roy, e.frame);
		}
		// Render entities
		for (e in entities) {
			Sprites.draw(canvasData, e.spriteID, e.x + e.rox, e.y + e.roy, e.frame);
		}
		// Render particles
		for (p in particles) {
			Sprites.draw(canvasData, p.spriteID, p.x, p.y, p.frame);
		}
		// Render UI
		UI.INST.render();
	}
	
	public function shake (amount:Int, duration:Int, mode:ShakeMode = null)
	{
		if (mode == null)
			mode = ShakeMode.FIXED;
		// Apply screen shake if none is taking place currently
		// or if new one is at least as strong
		// or if new one is fixed
		if (shakeTick == -1 || amount >= shakeAmount || mode == ShakeMode.FIXED) {
			shakeAmount = amount;
			shakeTick = duration;
			shakeMode = mode;
		}
	}

	function endGame ()
	{
		SoundMan.playOnce(SoundMan.PLAYER_DEATH);
		shake(5, 60);

		hasGameEnded = true;

		player.currentMove = Move.STATIC;
		player.xVel = player.yVel = 0;
		entities.remove(player);
		entities.remove(aura);

		var e = new GameOver();
		e.x = WIDTH / 2 - e.cx + shakeOffset;
		e.y = HEIGHT / 2 - e.cy + shakeOffset;
		entities.push(e);

		for (e in entities) {
			if (Std.is(e, Bonus))
				cast(e, Bonus).pickUp();
		}
	}

}

enum ShakeMode
{
	FIXED;
	RANDOM;
}