package;

import Entity;

class GameOver extends Entity
{
	
	public function new ()
	{
		super();

		setAnim(Sprites.GAME_OVER);
	}

}