let windowheight = window.innerHeight
let windowwidth = window.innerWidth
    var config = {
        type: Phaser.AUTO,
        width: windowwidth,
        height: windowheight,
				backgroundColor: '#ffffff',
    		physics: {
        default: 'arcade',
        	arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

    var player;
    var platforms;

    var game = new Phaser.Game(config);

    function preload ()
    {
				
				cursors = this.input.keyboard.createCursorKeys();
        this.load.image('ground', '../img/platform.png');
        this.load.image('star', '../img/star.png');
        this.load.image('bomb', '../img/bomb.png');
				this.load.image('block', '../img/block.png');
        this.load.spritesheet('dude', '../img/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    function create ()
			{
			
        platforms = this.physics.add.staticGroup();
				platforms.create(50, window.innerHeight - 10, 'block');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        player = this.physics.add.sprite(100, 450, 'dude');
				player.setDisplaySize(52, 68);
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);
				this.physics.add.collider(player, platforms);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    function update ()
    {
			if (cursors.left.isDown)
		{
    	player.setVelocityX(-160);

    	player.anims.play('left', true);
		}
		else if (cursors.right.isDown)
		{
    player.setVelocityX(160);
    player.anims.play('right', true);
		}
		else
		{
    	player.setVelocityX(0);
    	player.anims.play('turn');
		}

		if (cursors.up.isDown)
		{
    	player.setVelocityY(-330);
		}
			
    }


