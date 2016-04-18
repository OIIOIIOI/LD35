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
	static public var SIZE_A:String = "size_a";
	static public var SIZE_B:String = "size_b";
	static public var SIZE_C:String = "size_c";
	static public var AURA:String = "aura";
	static public var BONUS:String = "bonus";
	static public var FONT:String = "font";
	static public var TITLE:String = "title";
	static public var GAME_OVER:String = "game_over";
	static public var BG_A:String = "bg_a";
	static public var BG_B:String = "bg_b";
	static public var BG_C:String = "bg_c";
	static public var BG_D:String = "bg_d";
	static public var BG_E:String = "bg_e";
	static public var BG_F:String = "bg_f";

	static public var DEFAULT_PART:String = "default_part";
	static public var SIZE_A_PART:String = "size_a_part";
	static public var SIZE_B_PART:String = "size_b_part";
	static public var SIZE_C_PART:String = "size_c_part";
	static public var SPLIT_A:String = "split_a";
	static public var SPLIT_B:String = "split_b";
	static public var APPEAR:String = "appear";
	
	static var sprites:Map<String, SpriteSheet>;

	static public function init ()
	{
		sprites = new Map();
		// Store all assets and animation infos
		sprites.set(PLAYER, { data:Assets.getBitmapData("img/player.png"), frames:4, delay:8 });
		sprites.set(SIZE_A, { data:Assets.getBitmapData("img/enemy_0.png"), frames:4, delay:4 });
		sprites.set(SIZE_B, { data:Assets.getBitmapData("img/enemy_1.png"), frames:12, delay:6 });
		sprites.set(SIZE_C, { data:Assets.getBitmapData("img/enemy_2.png"), frames:2, delay:8 });
		sprites.set(AURA, { data:Assets.getBitmapData("img/aura.png"), frames:4, delay:8 });
		sprites.set(BONUS, { data:Assets.getBitmapData("img/bonus.png"), frames:2, delay:10 });
		sprites.set(FONT, { data:Assets.getBitmapData("img/font.png"), frames:10, delay:0 });
		sprites.set(TITLE, { data:Assets.getBitmapData("img/title.png"), frames:1, delay:0 });
		sprites.set(GAME_OVER, { data:Assets.getBitmapData("img/gameover.png"), frames:1, delay:0 });
		sprites.set(BG_A, { data:Assets.getBitmapData("img/bgA.png"), frames:1, delay:0 });
		sprites.set(BG_B, { data:Assets.getBitmapData("img/bgB.png"), frames:1, delay:0 });
		sprites.set(BG_C, { data:Assets.getBitmapData("img/bgC.png"), frames:1, delay:0 });
		sprites.set(BG_D, { data:Assets.getBitmapData("img/bgD.png"), frames:1, delay:0 });
		sprites.set(BG_E, { data:Assets.getBitmapData("img/bgE.png"), frames:1, delay:0 });
		sprites.set(BG_F, { data:Assets.getBitmapData("img/bgF.png"), frames:1, delay:0 });
		
		sprites.set(DEFAULT_PART, { data:new BitmapData(2, 2, false, 0xFFFFFFFF), frames:1, delay:0 });
		sprites.set(SIZE_A_PART, { data:Assets.getBitmapData("img/parts_0.png"), frames:4, delay:10 });
		sprites.set(SIZE_B_PART, { data:Assets.getBitmapData("img/parts_1.png"), frames:4, delay:10 });
		sprites.set(SIZE_C_PART, { data:Assets.getBitmapData("img/parts_2.png"), frames:4, delay:10 });
		sprites.set(SPLIT_A, { data:Assets.getBitmapData("img/split_0.png"), frames:2, delay:4 });
		sprites.set(SPLIT_B, { data:Assets.getBitmapData("img/split_1.png"), frames:2, delay:4 });
		sprites.set(APPEAR, { data:Assets.getBitmapData("img/appear.png"), frames:4, delay:8 });
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
