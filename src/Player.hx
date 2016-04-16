package;

import Entity;
import MovingEntity;

/**
 * ...
 * @author 01101101
 */
class Player extends MovingEntity
{
	
	public function new ()
	{
		super();
		setAnim(Sprites.PLAYER);
		
		collRadius = cx;
		collType = CollType.PLAYER;
		collList.push(CollType.ENEMY);
		
		friction = 0.85;
		xVelMax = 3;
		yVelMax = 3;

		currentMove = Move.CONTROLLED;
	}
	
	override public function update ()
	{
		// MovingEntity update
		super.update();
		
		// Restrict position to screen space
		if (x < 10)	x = 10;
		else if (x + 2 * cx - 10 > Game.WIDTH)	x = Game.WIDTH - 2 * cx + 10;
		if (y + 2 * cy - 10 > Game.HEIGHT)	y = Game.HEIGHT - 2 * cy + 10;
		else if (y < 10)	y = 10;
	}
	
}