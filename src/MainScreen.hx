package;

import openfl.display.Sprite;
import openfl.events.Event;
import openfl.ui.Keyboard;
import openfl.Lib;

class MainScreen extends Sprite
{

	var keyboardActive:Bool;

	public function new () 
	{
		super();

		trace("Main Screen");

		keyboardActive = true;

		addEventListener(Event.ENTER_FRAME, update);
	}
	
	function update (e:Event)
	{
		if (keyboardActive && Controls.isDown(Keyboard.SPACE))
			startGame();
	}

	function startGame ()
	{
		Lib.current.stage.removeChild(this);
		Lib.current.stage.addChild(new Game());
	}

}