package;

import Entity;

class UILetter extends Entity
{
	
	public function new ()
	{
		super();

		setAnim(Sprites.FONT);
	}

	public function display (letter:String = "0")
	{
		if (letter.length > 1)
			letter = letter.charAt(0);

		frame = switch (letter)
		{
			case "1":	1;
			case "2":	2;
			case "3":	3;
			case "4":	4;
			case "5":	5;
			case "6":	6;
			case "7":	7;
			case "8":	8;
			case "9":	9;
			default:	0;
		}
	}

	override function postUpdate ()
	{
		// super.postUpdate();
	}

}
