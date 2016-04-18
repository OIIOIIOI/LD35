package;

import Entity;

class Background extends Entity
{

	var offset = 0;
	
	public function new (s:String, o:Int)
	{
		super();

		setAnim(s);

		offset = o;
	}

	override public function update ()
	{
		super.update();

		var xRatio = (Game.INST.player.x - Game.INST.shakeOffset) / Game.WIDTH;
		x = xRatio * -offset;
		var yRatio = (Game.INST.player.y - Game.INST.shakeOffset) / Game.HEIGHT;
		y = yRatio * -offset;
	}

}