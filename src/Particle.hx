package;

/**
 * ...
 * @author 01101101
 */
class Particle extends MovingEntity {
	
	var lifetime:Int;
	
	public function new (t:ParticleType) {
		super();
		
		switch (t)
		{
			case ParticleType.SIZE_A_PART:
				lifetime = 30 + Std.random(30);
				setAnim(Sprites.SIZE_A_PART);
				xVel = (Std.random(2)*2-1) * (Math.random() * 0.5);
				yVel = (Std.random(2)*2-1) * (Math.random() * 0.5);

			case ParticleType.SIZE_B_PART:
				lifetime = 30 + Std.random(30);
				setAnim(Sprites.SIZE_B_PART);
				xVel = (Std.random(2)*2-1) * (Math.random() * 0.5);
				yVel = (Std.random(2)*2-1) * (Math.random() * 0.5);

			case ParticleType.SIZE_C_PART:
				lifetime = 30 + Std.random(30);
				setAnim(Sprites.SIZE_C_PART);
				xVel = (Std.random(2)*2-1) * (Math.random() * 0.5);
				yVel = (Std.random(2)*2-1) * (Math.random() * 0.5);

			case ParticleType.SPLIT_A:
				var sheet = Sprites.getSheet(Sprites.SPLIT_A);
				lifetime = sheet.frames * sheet.delay;
				setAnim(Sprites.SPLIT_A);

			case ParticleType.SPLIT_B:
				var sheet = Sprites.getSheet(Sprites.SPLIT_B);
				lifetime = sheet.frames * sheet.delay;
				setAnim(Sprites.SPLIT_B);

			default:
				lifetime = 80 + Std.random(120);
				setAnim(Sprites.DEFAULT_PART);
				xVel = (Std.random(2)*2-1) * (Math.random() * 0.5);
				yVel = (Math.random() * 1) + 1;
		}
	}
	
	override public function update ()
	{
		super.update();
		
		lifetime--;
		if (lifetime <= 0)
			isDead = true;
	}
	
}

enum ParticleType
{
	DEFAULT;
	SIZE_A_PART;
	SIZE_B_PART;
	SIZE_C_PART;
	SPLIT_A;
	SPLIT_B;
}