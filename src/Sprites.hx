package;

import openfl.Assets;
import openfl.display.BitmapData;

/**
 * ...
 * @author 01101101
 */
class Sprites
{

	static public var PLAYER:String = "player";
	static public var AURA:String = "aura";
	static public var SIZE_A:String = "size_a";
	static public var SIZE_B:String = "size_b";
	static public var SIZE_C:String = "size_c";
	
	static var sprites:Map<String, SpriteSheet>;

	static public function init ()
	{
		sprites = new Map();
		// Store all assets and animation infos
		// sprites.set(SIZE_A, { data:Assets.getBitmapData("img/test.png"), frames:2, delay:10 });
		sprites.set(PLAYER, { data:Assets.getBitmapData("img/player.png"), frames:1, delay:0 });
		sprites.set(AURA, { data:Assets.getBitmapData("img/aura.png"), frames:1, delay:0 });
		sprites.set(SIZE_A, { data:Assets.getBitmapData("img/enemy_0.png"), frames:4, delay:4 });
		sprites.set(SIZE_B, { data:Assets.getBitmapData("img/enemy_1.png"), frames:3, delay:6 });
		sprites.set(SIZE_C, { data:Assets.getBitmapData("img/enemy_2.png"), frames:4, delay:8 });
	}
	
	static public function getSheet (id:String) :SpriteSheet
	{
		if (sprites == null || !sprites.exists(id))
			return null;
		return sprites.get(id);
	}
	
	static public function draw (c:BitmapData, id:String, x:Float = 0, y:Float = 0, frame:Int = 0)
	{
		if (sprites == null || !sprites.exists(id))
			return;
		
		var sheet:SpriteSheet = sprites.get(id);
		var data = sheet.data;
		
		Game.TAR.width = data.width / sheet.frames;
		Game.TAR.height = data.height;
		Game.TAR.x = frame * Game.TAR.width;
		Game.TAR.y = 0;
		
		Game.TAP.x = Math.round(x);
		Game.TAP.y = Math.round(y);
		
		c.copyPixels(data, Game.TAR, Game.TAP);
	}

}

typedef SpriteSheet = {
	data:BitmapData,
	frames:Int,
	delay:Int
}
