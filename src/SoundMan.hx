package;

import openfl.Assets;
import openfl.media.SoundTransform;

/**
 * ...
 * @author 01101101
 */
class SoundMan {
	
	static public var VOL_MOD:Float = 0.5;

	static public var PLAYER_DEATH:String = "snd/death";
	
	#if html5
	static var ext:String = ".ogg";
	#else
	static var ext:String = ".wav";
	#end
	
	static public function playOnce (s:String, vol:Float = 1)
	{
		vol *= VOL_MOD;
		// Choose variant if needed
		// if (s == POINTS)	s = s + "" + Std.random(3);
		// Get sound
		var snd = Assets.getSound(s + ext);
		if (snd == null)
			return;
		// Play sound
		if (vol == 1)
			snd.play();
		else {
			var st = new SoundTransform(vol);
			snd.play(0, 0, st);
		}
	}
	
}