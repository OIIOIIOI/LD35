package;

import Entity;

class Bonus extends MovingEntity
{
	
	public function new ()
	{
		super();

		setAnim(Sprites.BONUS);
		velMax = 5;

		collRadius = cx;
		collType = CollType.BONUS;
		collList.push(CollType.PLAYER);
	}

	override public function update ()
	{
		super.update();

		var angle = Math.atan2(Game.INST.player.y + Game.INST.player.cy - y - cy, Game.INST.player.x + Game.INST.player.cx - x - cx);
		xVel = velMax * Math.cos(angle);
		yVel = velMax * Math.sin(angle);
	}

}
