package;

import openfl.display.Sprite;
import openfl.geom.Point;
import openfl.Lib;
import openfl.Assets;

/**
 * ...
 * @author 01101101
 */
class Main extends Sprite 
{

	public function new () 
	{
		super();
		Controls.init();
		Sprites.init();
		Lib.current.stage.addChild(new Game());
	}

}
