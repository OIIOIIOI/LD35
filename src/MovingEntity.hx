package;

import openfl.ui.Keyboard;

/**
 * ...
 * @author 01101101
 */
class MovingEntity extends Entity
{
	
	var friction:Float;
	public var xVel:Float;
	public var yVel:Float;
	var xVelMax:Float;
	var yVelMax:Float;
	public var velMax:Float;
	public var currentMove:Move;

	public function new ()
	{
		super();

		friction = 1;
		xVelMax = 100;
		yVelMax = 100;
		velMax = -1;
		xVel = yVel = 0;
		currentMove = Move.DEFAULT;
	}
	
	override public function update ()
	{
		super.update();

		move();// Apply selected move

		// Limit velocity and actually update the x position
		xVel = Math.max(Math.min(xVel * friction, xVelMax), -xVelMax);
		if (Math.abs(xVel) < 0.01)
			xVel = 0;
		x += xVel;
		// Same for y
		yVel = Math.max(Math.min(yVel * friction, yVelMax), -yVelMax);
		if (Math.abs(yVel) < 0.01)
			yVel = 0;
		y += yVel;
	}

	function move ()
	{
		switch (currentMove)
		{
			// Player controlled
			case CONTROLLED:
				if (Controls.isDown(Keyboard.RIGHT))
					xVel += xVelMax * 0.2;
				if (Controls.isDown(Keyboard.LEFT))
					xVel -= xVelMax * 0.2;
				if (Controls.isDown(Keyboard.UP))
					yVel -= yVelMax * 0.2;
				if (Controls.isDown(Keyboard.DOWN))
					yVel += yVelMax * 0.2;
			// Static
			case STATIC:
				xVel = yVel = 0;
			// Default
			default:
		}
	}

}

enum Move
{
	CONTROLLED;
	STATIC;
	DEFAULT;
}
