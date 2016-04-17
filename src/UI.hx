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
	var scoreLetters:Array<UILetter>;

	var score = 0;
	var numLetters = 10;
	var letterSpacing = 2;

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
		canvasData.fillRect(canvasData.rect, 0x00000000);
		// Render entities
		for (e in entities) {
			Sprites.draw(canvasData, e.spriteID, e.x + e.rox, e.y + e.roy, e.frame);
		}
	}

	public function reset ()
	{
		entities = [];
		scoreLetters = [];
		score = 0;

		var fontSheet = Sprites.getSheet(Sprites.FONT);
		var letterWidth = fontSheet.data.width / fontSheet.frames;
		var letterHeight = fontSheet.data.height;

		var wordX = Std.int((Game.WIDTH - (letterWidth + letterSpacing) * numLetters + letterSpacing) / 2);
		var wordY = Std.int(Game.HEIGHT - letterHeight - 16);

		for (i in 0 ... numLetters)
		{
			var e = new UILetter();
			e.x = (letterWidth + letterSpacing) * i + wordX;
			e.y = wordY;
			entities.push(e);
			scoreLetters.push(e);
		}
	}

	public function addToScore (v:Int)
	{
		score += v;
		if (score >= Math.pow(10, numLetters))
			score = Std.int(Math.pow(10, numLetters) - 1);
		updateScore();
	}

	function updateScore ()
	{
		var str = addZeros(score);
		for (i in 0 ... str.length) {
			scoreLetters[i].display(str.charAt(i));
		}
	}
	
	function addZeros (s:Int) :String
	{
		var string = Std.string(s);
		while (string.length < numLetters) {
			string = "0" + string;
		}
		return string;
	}

}