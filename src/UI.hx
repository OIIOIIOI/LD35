package;

import openfl.display.Bitmap;
import openfl.display.BitmapData;
import openfl.errors.Error;

class UI
{
	
	static public var INST:UI;

	public var canvas:Bitmap;
	var canvasData:BitmapData;

	public var entities:Array<Entity>;

	var score = 0;

	static public function init ()
	{
		new UI();
	}

	public function new ()
	{
		if (INST != null)
			throw new Error("UI already instanciated!");
		else
			INST = this;
		
		// Setup canvas
		canvasData = new BitmapData(Game.WIDTH, Game.HEIGHT, true, 0x00000000);
		canvas = new Bitmap(canvasData);
		canvas.x = canvas.y = 0;

		entities = [];
	}

	public function update ()
	{
		// Update entities
		for (e in entities) {
			e.update();
		}

		// Clean up dead entities
		entities = entities.filter(Game.INST.filterDead);

		// Post update entities
		for (e in entities) {
			e.postUpdate();
		}
	}
	
	public function render ()
	{
		// Render all graphics
		canvasData.fillRect(canvasData.rect, 0x11FF00FF);
		// Render entities
		for (e in entities) {
			Sprites.draw(canvasData, e.spriteID, e.x + e.rox, e.y + e.roy, e.frame);
		}
	}

	public function reset ()
	{
		entities = [];

		var numLetters = 10;
		var letterSpacing = 2;
		var fontSheet = Sprites.getSheet(Sprites.FONT);
		var letterWidth = fontSheet.data.width / fontSheet.frames;
		var letterHeight = fontSheet.data.height;

		var wordX = (Game.WIDTH - (letterWidth + letterSpacing) * numLetters + letterSpacing) / 2;
		var wordY = Game.HEIGHT - letterHeight - 16;

		for (i in 0 ... numLetters)
		{
			var e = new UILetter();
			e.x = (letterWidth + letterSpacing) * i + wordX;
			e.y = wordY;
			// e.display(Std.string(i));
			entities.push(e);
		}
	}

	public function addToScore (x:Int)
	{
		score += x;
		updateScore();
	}

	function updateScore ()
	{
		
	}

}