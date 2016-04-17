package;

import Entity;

class Ammo extends MovingEntity
{
	
	public function new ()
	{
		super();

		setAnim(Sprites.AMMO);
		velMax = 1.5;

		collRadius = cx;
		// collType = CollType.AURA;
		// collList.push(CollType.ENEMY);
	}

	override public function update ()
	{
		super.update();

		var angle = Math.atan2(Game.INST.player.y + Game.INST.player.cy - y - cy, Game.INST.player.x + Game.INST.player.cx - x - cx);
		xVel = velMax * Math.cos(angle);
		yVel = velMax * Math.sin(angle);
	}

}
