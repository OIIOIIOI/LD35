package;

import Entity;

class Enemy extends MovingEntity
{

	var sizes = [Sprites.SIZE_A, Sprites.SIZE_B, Sprites.SIZE_C];
	var currentSize:Int;

	var growTick:Int;
	var growDelay:Int;
	public var isInAura:Bool;

	public function new (size:Int = 0)
	{
		super();

		currentSize = size;
		setAnim(sizes[currentSize]);

		collRadius = cx;
		collType = CollType.ENEMY;
		collList.push(CollType.AURA);
		collList.push(CollType.PLAYER);

		velMax = Std.random(2)*2-1;
		velMax *= (Std.random(10) + 10) / 10;
		var angle = Math.random()*6.28;
		xVel = velMax * Math.cos(angle);
		yVel = velMax * Math.sin(angle);

		growTick = growDelay = 120;
		isInAura = false;
	}

	override public function update ()
	{
		super.update();

		isInAura = false;

		if (x+cx > Game.WIDTH || x+cx < 0)
			xVel = -xVel;
		if (y+cy > Game.HEIGHT || y+cy < 0)
			yVel = -yVel;
	}

	override public function postUpdate ()
	{
		super.postUpdate();

		if (isInAura) {
			rox = Std.random(2)*2-1;
			roy = Std.random(2)*2-1;
			shrink();
		}
		else {
			rox = roy = 0;
			grow();
		}
	}

	function grow ()
	{
		if (growTick > 0)
		{
			growTick--;
			if (growTick == 0 && currentSize < sizes.length-1)
			{
				currentSize++;
				applySize(true);

				growTick = growDelay;
			}
		}
	}

	function shrink ()
	{
		if (growTick <= growDelay)
		{
			growTick += 2;
			if (growTick >= growDelay)
			{
				if (currentSize > 0)
				{
					currentSize--;
					applySize(false);
					growTick = 0;
					Game.INST.shake(4, 7);
				}
				else
				{
					die();
					Game.INST.shake(5, 12);
				}
			}
		}
	}

	function applySize (up:Bool = true)
	{
		setAnim(sizes[currentSize]);

		var diff = collRadius - cx;
		x += diff;
		y += diff;
		collRadius = cx;

		var mod = 1.2;
		if (up) {
			xVel *= 1/mod;
			yVel *= 1/mod;
		} else {
			xVel *= mod;
			yVel *= mod;
		}
	}

	function die ()
	{
		isDead = true;
	}

}
