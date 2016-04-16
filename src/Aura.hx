package;

import Entity;

class Aura extends Entity
{
	
	public function new ()
	{
		super();

		setAnim(Sprites.AURA);

		collRadius = cx;
		collType = CollType.AURA;
		collList.push(CollType.ENEMY);
	}

	override public function update ()
	{
		super.update();

		x = Game.INST.player.x + Game.INST.player.cx - cx;
		y = Game.INST.player.y + Game.INST.player.cy - cy;
	}

}
