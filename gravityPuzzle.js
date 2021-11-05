var can;

var mainMenu;

var CELLWIDTH;

document.addEventListener("mousedown", function(e) {
	mainMenu.handleInput(e);
});

var touchX;
var touchY;
var movedTouchX;
var movedTouchY;
document.addEventListener("touchstart", function(e) {
	mainMenu.handleInput(e);
	touchX = (e.clientX || e.targetTouches[0].clientX);
	touchY = (e.clientY || e.targetTouches[0].clientY);
	movedTouchX = touchX;
	movedTouchY = touchY;
});

document.addEventListener("touchmove", function(e) {
	e.preventDefault();
	movedTouchX = (e.clientX || e.targetTouches[0].clientX);
	movedTouchY = (e.clientY || e.targetTouches[0].clientY);
});

document.addEventListener("touchend", function(e) {
	
	if(!mainMenu.inGame()){
		return;
	}
	
	var diffX = movedTouchX - touchX;
	var diffY = movedTouchY - touchY;
	
	if(Math.abs(diffX) > Math.abs(diffY)){
		if(diffX > 0){
			mainMenu.game.toRightGravity();
		}else{
			mainMenu.game.toLeftGravity();
		}
	}else{
		if(diffY > 0){
			mainMenu.game.toBottomGravity();
		}else{
			mainMenu.game.toTopGravity();
		}
	}
	
});


document.addEventListener("keydown", function(e) {
	if(!mainMenu.inGame()){
		return;
	}
	
	if (e.keyCode == 37) {
		mainMenu.game.toLeftGravity();
	} else if (e.keyCode == 38) {
		mainMenu.game.toTopGravity();
	} else if (e.keyCode == 39) {
		mainMenu.game.toRightGravity();
	} else if (e.keyCode == 40) {
		mainMenu.game.toBottomGravity();
	}
});


window.onload = function() {
	can = document.getElementById("can");
	can.width = Math.min(window.innerWidth, window.innerHeight);
	can.height = Math.min(window.innerWidth, window.innerHeight);
	
	CELLWIDTH = can.width / 12;
	//CELLWIDTH = 10;

	mainMenu = new MainMenu(can);

	animate();
}

function animate() {

	mainMenu.run();

	requestAnimationFrame(animate);
}





function MainMenu(can) {
	this.can = can;
	this.c = can.getContext("2d");

	this.seeds = [
		/*
		order:
			player: null,
			goal: null,
			blocks: [],
			movables: [],
			pathconstrained: [],
			oneways: [],
			points: [],
			coins: []
		*/

		"1,1,u/8,8/8,1;2,4;7,5;3,9;////2,1;3,1;4,1;5,1;6,1;7,2;7,3;7,4;6,4;5,4;4,4;3,5;3,6;3,7;4,8;5,8;6,8;7,8;/3,8;3,4;7,1;",
		"1,1,r/3,8/6,1;5,5;2,4;3,7;8,6;7,9;7,1;8,1;9,1;10,1;////2,1;3,1;4,1;5,1;5,2;5,3;5,4;3,6;4,6;5,6;6,6;7,6;7,8;6,8;5,8;/7,7;3,4;4,8;",
		"1,1,l/8,2/4,1;3,8;3,5;2,6;5,6;6,4;9,7;8,1;///4,7,d;1,2,d;/4,6;4,5;5,5;2,1;3,1;3,4;3,7;4,7;5,7;6,7;7,7;8,3;8,4;8,5;8,6;4,4;1,3;1,4;1,5;1,6;1,7;1,8;1,9;/3,6;5,4;8,7;",
		"1,1,u/6,7/1,2;2,2;3,2;2,3;1,3;1,4;2,4;1,5;9,2;8,2;///10,2,d;6,3,u;6,6,d;7,8,r;3,9,d;5,1,l;/2,1;3,1;4,1;6,1;7,1;8,1;9,1;3,4;4,4;5,4;6,4;3,5;3,6;3,7;4,8;5,8;6,8;6,5;6,2;/3,8;10,1;",
		"8,1,r/3,5/10,1;9,1;1,2;3,2;4,2;3,3;3,4;4,4;5,4;6,4;7,4;8,4;9,4;10,4;10,2;9,2;8,2;4,5;2,8;5,9;6,7;/10,3;//2,2,u;8,3,r;/2,1;3,1;4,1;5,1;6,1;7,1;1,3;1,4;1,5;1,6;1,7;1,8;1,9;2,4;2,5;2,6;2,7;3,7;4,7;5,7;/3,8;2,3;1,1;",
		"1,1,l/7,8/6,1;6,2;6,3;8,4;5,5;4,4;3,6;7,7;1,9;1,10;1,4;///3,4,d;2,4,d;5,3,u;9,3,u;10,3,u;3,10,r;/2,1;3,1;4,1;5,1;7,4;7,5;7,6;6,8;5,8;4,8;3,8;2,8;1,5;1,6;1,7;/7,1;4,5;1,8;",
		"4,1,l/2,3/1,1;2,1;3,1;4,2;5,2;6,2;7,2;8,2;9,2;10,4;9,4;6,4;7,4;5,3;5,4;4,3;4,6;5,6;5,7;5,8;6,8;4,9;3,9;10,6;9,6;/5,1;6,1;//10,2,u;8,6,d;7,6,d;6,6,d;2,9,u;1,9,u;1,7,l;3,5,l;/10,3;9,3;8,3;9,5;8,5;7,5;6,5;1,4;2,4;3,4;3,3;3,2;2,2;1,2;1,3;2,5;2,6;3,8;4,8;4,7;10,7;10,8;10,9;10,10;7,1;8,1;9,1;10,1;/2,7;6,7;10,5;",
		"1,1,l/9,7/1,2;2,2;3,2;4,2;6,2;7,2;7,1;5,6;2,5;8,4;//4,1,t,2,6;3,8,t,3,5;/3,4,u;4,5,r;6,3,r;4,3,l;5,2,u;/3,3;2,3;1,3;1,4;1,5;3,6;4,7;5,7;6,7;7,7;10,2;10,1;9,1;8,1;8,2;8,3;7,3;5,3;5,4;5,5;/3,5;3,7;8,7;",
		"1,1,l/7,10/6,1;6,3;6,4;5,4;4,4;3,4;2,4;1,4;10,1;6,9;8,9;8,10;6,10;3,5;2,8;4,7;1,5;3,10;5,5;9,6;8,5;9,5;/2,5;//10,4,d;10,8,r;10,7,r;/2,1;3,1;4,1;5,1;5,2;5,3;4,3;3,3;2,3;1,3;1,2;2,2;3,2;10,2;10,3;8,3;9,3;/4,2;7,3;7,9;",
		"1,1,r/6,2/5,5;6,5;2,4;3,8;4,8;8,7;9,2;/6,1;//5,1,l;7,1,r;//",
		"4,6,l/6,4/2,2;4,2;5,2;5,3;6,3;7,3;7,4;7,5;8,5;9,5;9,6;9,7;8,7;7,7;6,7;5,7;4,7;5,5;5,4;4,5;3,5;3,4;2,4;1,4;5,8;6,10;7,8;8,10;9,1;/1,5;4,4;/1,6,t,1,3;/3,6,l;2,10,l;4,10,r;4,9,r;4,8,r;/5,6;7,6;/6,5;8,6;6,6;",
		"1,10,l/6,5/1,7;2,7;3,7;4,7;5,7;6,7;6,8;4,8;6,9;7,9;8,8;9,8;9,9;9,6;9,5;8,5;7,5;7,4;6,4;5,4;4,4;4,3;4,2;3,4;5,5;5,6;1,5;1,4;1,1;2,1;3,10;10,2;10,1;8,2;6,1;/4,5;4,6;//10,4,u;10,10,d;2,4,d;/3,8;2,8;1,8;1,9;3,9;2,10;2,9;4,10;5,10;6,10;7,10;8,10;9,10;10,6;10,7;10,8;9,7;8,7;8,6;7,6;6,6;/5,8;10,5;10,9;",
		"1,3,d/10,2/8,1;9,1;10,1;10,3;9,3;8,3;10,4;10,5;10,8;9,4;8,4;7,4;6,4;6,5;6,6;6,8;7,8;6,10;4,9;5,8;4,8;3,8;2,8;3,7;3,6;3,5;3,4;/2,3;/4,5,t,4,5;/6,7,l;3,3,l;1,4,d;2,4,d;/9,2;8,2;2,2;3,2;4,2;5,2;6,2;7,2;3,1;4,1;5,1;6,1;4,3;5,3;6,3;/4,4;7,1;1,1;",
		"1,1,l/2,7/1,3;1,2;2,2;3,2;4,3;5,4;6,4;6,3;4,4;3,3;2,3;4,6;4,7;5,9;6,8;6,7;6,6;7,8;7,10;8,8;9,8;9,9;9,6;10,6;6,1;1,6;2,6;3,6;3,7;1,7;/10,2;/1,8,t,1,4;10,4,t,8,10;/10,1,u;3,1,l;4,1,l;4,2,d;5,2,r;6,5,l;5,6,d;3,9,l;/4,9;3,9;2,9;1,9;1,10;2,10;3,10;4,10;5,10;6,10;10,10;10,9;10,8;10,7;10,3;9,3;8,3;7,3;7,4;7,5;7,6;7,7;1,4;2,4;3,4;3,5;2,5;1,5;/5,3;10,5;2,8;",
		"3,7,l/8,6/2,8;3,9;4,9;5,9;2,7;2,6;2,5;1,5;3,6;4,6;6,6;6,5;7,7;8,7;9,7;9,6;9,5;8,5;8,4;8,3;7,3;6,3;2,3;2,1;1,1;10,9;9,9;10,10;9,10;8,10;5,6;/5,4;/3,8,t,3,6;4,4,f,2,4;/7,8,r;5,3,u;5,5,d;3,3,d;3,1,u;/10,2;10,3;10,4;10,5;10,6;10,7;4,7;5,7;6,7;7,4;7,5;7,6;6,4;3,4;3,5;4,5;2,4;1,4;1,3;1,2;2,2;3,2;6,1;7,1;8,1;9,1;5,1;/2,9;4,1;9,2;",
		"1,1,u/3,1/2,3;3,3;4,3;5,3;3,4;3,5;7,3;8,3;9,3;10,3;6,6;6,7;6,8;//2,7,t,2,5;7,4,t,5,9;4,2,f,1,2;/2,1,r;2,2,r;1,4,l;1,5,d;4,6,l;4,8,u;5,8,u;7,6,u;8,6,u;9,6,u;10,6,u;6,3,d;5,2,d;/5,5;6,5;7,5;8,5;9,5;10,5;10,4;6,1;6,2;2,4;2,5;2,6;3,6;4,6;/5,1;6,3;5,6;",
		"10,2,u/2,8/8,3;8,4;8,5;7,5;1,5;3,5;4,5;5,5;6,5;1,7;1,6;8,6;7,8;3,10;1,8;//3,4,t,1,5;4,7,t,2,6;/2,1,r;9,3,d;10,3,d;/10,4;10,5;10,6;10,7;10,8;10,9;2,6;3,6;4,6;5,6;6,6;7,6;7,7;7,4;6,4;1,3;2,3;3,3;4,3;5,3;6,3;/7,3;2,5;2,10;",
		"2,5,u/8,6/2,6;3,6;3,4;2,4;7,3;2,3;2,2;9,1;10,9;1,8;2,9;1,9;1,10;2,10;//5,7,t,4,7;/3,5,l;6,6,d;1,5,l;8,2,d;2,1,l;//",
		"3,2,u/9,2/3,1;2,2;3,3;4,3;4,1;1,1;2,1;6,1;6,2;6,3;4,4;6,5;7,4;7,3;6,6;6,7;7,2;3,6;3,7;4,7;4,8;5,8;6,8;2,5;1,9;2,10;1,10;8,10;7,7;9,8;9,9;9,10;//5,2,f,1,3;5,4,f,3,5;5,6,f,5,7;/10,7,d;10,5,r;/4,6;4,5;3,5;3,4;3,9;4,9;5,9;6,9;7,9;8,3;8,2;8,1;9,1;10,1;10,2;10,3;9,3;7,5;7,6;8,6;9,6;10,6;4,2;/6,4;1,2;9,5;",
		"10,1,u/9,3/2,5;3,5;4,5;5,5;6,5;7,5;8,5;9,5;2,6;3,6;4,6;5,6;6,6;7,6;8,6;9,6;3,7;3,1;2,4;2,10;5,9;5,3;5,4;5,10;4,1;4,7;7,8;7,2;10,5;10,6;/10,7;//1,5,d;1,6,d;9,9,l;/1,4;1,3;1,2;6,2;5,2;4,2;8,4;9,4;10,4;10,3;10,2;9,1;8,1;7,1;6,1;5,1;6,3;6,4;7,4;/4,4;1,1;8,3;",
		"1,10,l/2,2/4,9;5,9;5,8;4,6;5,6;6,6;3,6;2,6;2,7;1,7;7,6;8,7;7,8;4,10;7,10;10,8;9,5;8,2;5,3;6,5;3,4;4,1;8,1;3,5;7,2;/2,10;3,10;/4,7,t,3,5;6,7,t,5,7;/6,9,u;3,8,l;2,8,l;1,8,l;1,9,d;2,9,d;3,9,d;3,7,u;/9,6;8,6;8,5;7,5;4,2;4,3;4,4;4,5;4,8;8,9;9,9;10,9;9,10;8,10;8,8;9,8;/10,10;7,9;3,2;",
		

	];
	this.playingSeed = 0;

	this.game = new Game(can, this);
	this.levelBuilder = new levelBuilder(can, this);

	this.playButton = new Button(this.can.width / 2, this.can.height / 2, 120, 40, "rgba(0, 0, 0, 0.5)", "jogar", "rgba(255, 255, 255, 0.5)", "20px arial");
	this.playSeedButton = new Button(this.can.width / 2, this.can.height / 2 + 60, 120, 40, "rgba(0, 0, 0, 0.5)", "Fazes", "rgba(255, 255, 255, 0.5)", "20px arial");
	this.makeLevelButton = new Button(this.can.width / 2, this.can.height / 2 + 120, 120, 40, "rgba(0, 0, 0, 0.5)", "contruir nível", "rgba(255, 255, 255, 0.5)", "20px arial");


	this.levelButtons = [];

	var x = 0;
	var y = 0;
	var width = 40;
	var height = 40;
	inRow = parseInt((can.width / width) / 2) + 1;
	var border = can.width - (inRow * width * 1.5 - width / 2);
	var id = 0;
	while (id < this.seeds.length) {
		x = 0;
		y++;
		for (var i = 0; i < inRow; i++) {
			this.levelButtons.push(new Button(x * width * 1.5 + width / 2 + border / 2, y * height * 1.5 + height / 2, width, height, "rgba(0, 0, 0, 0.5)", "" + id, "rgba(255, 255, 255, 0.5)", "20px arial"));
			id++;
			x++;
			if (id >= this.seeds.length) {
				break;
			}
		}
	}


	this.menuStates = {
		mainMenu: 0,
		levelBuilder: 1,
		game: 2,
		selectLevel: 3,

	}
	this.menuState = this.menuStates.mainMenu;

	this.toMainMenu = function() {
		this.menuState = this.menuStates.mainMenu;
	}

	this.toLevelBuilder = function() {
		this.menuState = this.menuStates.levelBuilder;
	}

	this.toGame = function() {
		this.menuState = this.menuStates.game;
	}

	this.toSelectLevel = function() {
		this.menuState = this.menuStates.selectLevel;
	}


	this.inMainMenu = function() {
		return this.menuState == this.menuStates.mainMenu;
	}

	this.inLevelBuilder = function() {
		return this.menuState == this.menuStates.levelBuilder;
	}

	this.inGame = function() {
		return this.menuState == this.menuStates.game;
	}

	this.inSelectLevel = function() {
		return this.menuState == this.menuStates.selectLevel;
	}

	this.run = function() {
		this.c.fillStyle = "#DDDDDD";
		this.c.fillRect(0, 0, this.can.width, this.can.height);
		if (this.inMainMenu()) {
			this.c.fillStyle = "rgba(0, 0, 0, 0.75)";
			this.c.font = "30px arial"
			this.c.fillText("Gravity Puzzle", can.width/2, can.height/3);

			this.playButton.show(this.c);
			this.playSeedButton.show(this.c);
			this.makeLevelButton.show(this.c);

		} else if (this.inSelectLevel()) {
			for (var i = 0; i < this.levelButtons.length; i++) {
				this.levelButtons[i].show(this.c);
			}
		} else if (this.inGame()) {
			this.game.run(this.c);
		} else if (this.inLevelBuilder()) {
			this.levelBuilder.run(this.c);
		}
	}

	this.handleInput = function(e) {
		var x = (e.clientX || e.targetTouches[0].clientX);
		var y = (e.clientY || e.targetTouches[0].clientY);

		if (this.inMainMenu()) {
			if (this.playButton.contains(x, y)) {
				this.toSelectLevel();
			} else if (this.makeLevelButton.contains(x, y)) {
				this.toLevelBuilder();
			} else if (this.playSeedButton.contains(x, y)) {
				var seed = prompt("Selecione a SEED");
				if (seed === undefined || seed === null || seed === "") {
					return;
				}
				this.game.playSeed(-1, seed);
				this.toGame();
			}


		} else if (this.inSelectLevel()) {
			for (var i = 0; i < this.levelButtons.length; i++) {
				if (this.levelButtons[i].contains(x, y)) {
					this.toGame();
					this.playingSeed = i;
					this.game.playSeed(i, this.seeds[i]);
					break;
				}
			}
		} else if (this.inGame()) {
			if (this.game.done) {
				this.playingSeed = (this.playingSeed + 1) % this.seeds.length;
				this.game.playSeed(this.playingSeed, this.seeds[this.playingSeed]);
			} else {
				this.game.handleInput(e);
			}
		} else if (this.inLevelBuilder()) {
			this.levelBuilder.handleInput(e);
		}
	}
}





function Button(middleX, middleY, width, height, color, text, textColor, font) {

	this.middleX = middleX;
	this.middleY = middleY;
	this.width = width;
	this.height = height;
	this.color = color;

	this.text = text;
	this.textColor = textColor;
	
	this.font = font;


	this.show = function(c) {
		c.fillStyle = this.color;
		c.fillRect(this.middleX - this.width / 2, this.middleY - this.height / 2, this.width, this.height);

		if (this.text !== undefined) {
			c.fillStyle = this.textColor;
			c.textAlign = "center";
			c.textBaseline = "middle";
			c.font = this.font;
			c.fillText(this.text, this.middleX, this.middleY);
		}
	}

	this.contains = function(x, y) {
		return (this.middleX - this.width / 2 < x && this.middleX + this.width / 2 > x && this.middleY - this.height / 2 < y && this.middleY + this.height / 2 > y);
	}
}






function SeedHandler() {

	this.defaultBlocksSeed = "0,0;0,1;0,2;0,3;0,4;0,5;0,6;0,7;0,8;0,9;0,10;0,11;1,0;2,0;3,0;4,0;5,0;6,0;7,0;8,0;9,0;10,;11,0;11,0;11,1;11,2;11,3;11,4;11,5;11,6;11,7;11,8;11,9;11,10;11,11;1,11;2,11;3,11;4,11;5,11;6,11;7,11;8,11;9,11;10,11;";

	this.getDefaultBlocks = function() {
		var blocks = [];

		var blockSeeds = this.defaultBlocksSeed.split(";");
		for (var i = 0; i < blockSeeds.length; i++) {
			var blockSeed = blockSeeds[i].split(",");
			blocks.push(new Block(parseFloat(blockSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(blockSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH, CELLWIDTH, CELLWIDTH));
		}

		return blocks;
	}

	this.extractSeed = function(seed) {
		var extracted = {
			player: null,
			goal: null,
			blocks: [],
			movables: [],
			pathconstrained: [],
			oneways: [],
			points: [],
			coins: []
		}


		var blockSeeds = this.defaultBlocksSeed.split(";");
		for (var i = 0; i < blockSeeds.length; i++) {
			var blockSeed = blockSeeds[i].split(",");
			extracted.blocks.push(new Block(parseFloat(blockSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(blockSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH, CELLWIDTH, CELLWIDTH));
		}
		
		//console.log(extracted);


		if (seed === undefined || seed === "") {
			return extracted;
		}

		/*
		order:
			player: null,
			goal: null,
			blocks: [],
			movables: [],
			pathconstrained: [],
			oneways: [],
			points: [],
			coins: []
		*/

		var subSeed = seed.split("/");

		var playerSeed = subSeed[0].split(",");
		extracted.player = new Player(parseFloat(playerSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(playerSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH, CELLWIDTH - 2, CELLWIDTH - 2, playerSeed[2]);

		var goalSeed = subSeed[1].split(",");
		extracted.goal = new Goal(parseFloat(goalSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(goalSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH, CELLWIDTH, CELLWIDTH);

		try {
			var blockSeeds = subSeed[2].split(";");
			for (var i = 0; i < blockSeeds.length; i++) {
				var blockSeed = blockSeeds[i].split(",");
				if (blockSeed[0].length == 0) {
					break;
				}
				extracted.blocks.push(new Block(parseFloat(blockSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(blockSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH, CELLWIDTH, CELLWIDTH));
			}
		} catch (Exception) {

		}

		try {
			var movablesSeeds = subSeed[3].split(";");
			for (var i = 0; i < movablesSeeds.length; i++) {
				var movableSeed = movablesSeeds[i].split(",");
				if (movableSeed[0].length == 0) {
					break;
				}
				extracted.movables.push(new MovableBlock(parseFloat(movableSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(movableSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH, CELLWIDTH - 2, CELLWIDTH - 2));
			}
		} catch (Exception) {

		}

		try {
			var pathconstrainedSeeds = subSeed[4].split(";");
			for (var i = 0; i < pathconstrainedSeeds.length; i++) {
				var pathconstrainedSeed = pathconstrainedSeeds[i].split(",");
				if (pathconstrainedSeed[0].length == 0) {
					break;
				}
				extracted.pathconstrained.push(new PathConstrainedBlock(parseFloat(pathconstrainedSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(pathconstrainedSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH, CELLWIDTH - 2, CELLWIDTH - 2, pathconstrainedSeed[2] == "t", parseFloat(pathconstrainedSeed[3] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(pathconstrainedSeed[4] - 0.5) * CELLWIDTH + CELLWIDTH));
			}
		} catch (Exception) {

		}

		try {
			var onewaySeeds = subSeed[5].split(";");
			for (var i = 0; i < onewaySeeds.length; i++) {
				var onewaySeed = onewaySeeds[i].split(",");
				if (onewaySeed[0].length == 0) {
					break;
				}
				extracted.oneways.push(new OneWayGate(parseFloat(onewaySeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(onewaySeed[1] - 0.5) * CELLWIDTH + CELLWIDTH, CELLWIDTH, CELLWIDTH, onewaySeed[2]));
			}
		} catch (Exception) {

		}

		try {
			var pointsSeeds = subSeed[6].split(";");
			for (var i = 0; i < pointsSeeds.length; i++) {
				var pointSeed = pointsSeeds[i].split(",");
				if (pointSeed[0].length == 0) {
					break;
				}
				extracted.points.push(new Point(parseFloat(pointSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(pointSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH));
			}
		} catch (Exception) {

		}

		try {
			var coinsSeed = subSeed[7].split(";");
			for (var i = 0; i < coinsSeed.length; i++) {
				var coinSeed = coinsSeed[i].split(",");
				if (coinSeed[0].length == 0) {
					break;
				}
				extracted.coins.push(new Coin(parseFloat(coinSeed[0] - 0.5) * CELLWIDTH + CELLWIDTH, parseFloat(coinSeed[1] - 0.5) * CELLWIDTH + CELLWIDTH));
			}
		} catch (Exception) {

		}



		return extracted
	}

	this.generateSeed = function(raw) {
		var seed = "";

		/*
		order:
			player: null,
			goal: null,
			blocks: [],
			movables: [],
			pathconstrained: [],
			oneways: [],
			points: [],
			coins: []
		*/

		seed += Math.round(raw.player.getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.player.getMiddleY() / CELLWIDTH -0.5) + "," + raw.player.lastGravity.going[0] + "/";

		seed += Math.round(raw.goal.getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.goal.getMiddleY() / CELLWIDTH -0.5) + "/";

		for (var i = 0; i < raw.blocks.length; i++) {
			if (i > 45) { //are not default blocks
				seed += Math.round(raw.blocks[i].getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.blocks[i].getMiddleY() / CELLWIDTH -0.5) + ";";
			}
		}
		seed += "/";

		for (var i = 0; i < raw.movables.length; i++) {
			seed += Math.round(raw.movables[i].getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.movables[i].getMiddleY() / CELLWIDTH -0.5) + ";";
		}
		seed += "/";

		for (var i = 0; i < raw.pathconstrained.length; i++) {
			if (raw.pathconstrained[i].isVertical()) {
				seed += Math.round(raw.pathconstrained[i].getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.pathconstrained[i].getMiddleY() / CELLWIDTH -0.5) + ",t," + Math.round(raw.pathconstrained[i].getConstrainedFrom() / CELLWIDTH -0.5) + "," + Math.round(raw.pathconstrained[i].getConstrainedTo() / CELLWIDTH -0.5) + ";";
			} else {
				seed += Math.round(raw.pathconstrained[i].getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.pathconstrained[i].getMiddleY() / CELLWIDTH -0.5) + ",f," + Math.round(raw.pathconstrained[i].getConstrainedFrom() / CELLWIDTH -0.5) + "," + Math.round(raw.pathconstrained[i].getConstrainedTo() / CELLWIDTH -0.5) + ";";
			}
		}
		seed += "/";

		for (var i = 0; i < raw.oneways.length; i++) {
			seed += Math.round(raw.oneways[i].getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.oneways[i].getMiddleY() / CELLWIDTH -0.5) + "," + raw.oneways[i].getBlockingDirection()[0] + ";";
		}
		seed += "/";

		for (var i = 0; i < raw.points.length; i++) {
			seed += Math.round(raw.points[i].getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.points[i].getMiddleY() / CELLWIDTH -0.5) + ";";
		}
		seed += "/";

		for (var i = 0; i < raw.coins.length; i++) {
			seed += Math.round(raw.coins[i].getMiddleX() / CELLWIDTH -0.5) + "," + Math.round(raw.coins[i].getMiddleY() / CELLWIDTH -0.5) + ";";
		}

		return seed;
	}

}








function levelBuilder(can, mainMenu) {
	this.can = can;
	this.mainMenu = mainMenu;

	this.seedHandler = new SeedHandler();

	this.player = new Player(1.5 * CELLWIDTH, 1.5 * CELLWIDTH, CELLWIDTH - 2, CELLWIDTH - 2);
	this.goal = new Goal(10.5 * CELLWIDTH, 10.5 * CELLWIDTH, CELLWIDTH - 2, CELLWIDTH - 2);
	this.blocks = this.seedHandler.getDefaultBlocks();
	this.movables = [];
	this.pathconstrained = [];
	this.oneways = [];
	this.points = [];
	this.coins = [];

	this.getSeedButton = new Button(3 * CELLWIDTH, 1.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(255, 255, 255, 0.5)", "obter sementes", "rgba(0, 0, 0, 0.5)", "14px arial");
	this.loadSeedButton = new Button(6 * CELLWIDTH, 1.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(255, 255, 255, 0.5)", "carregar semente", "rgba(0, 0, 0, 0.5)", "14px arial");

	this.placePlayerButton = new Button(3 * CELLWIDTH, 3.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "jogador(a)", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeGoalButton = new Button(6 * CELLWIDTH, 3.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "objetivo", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeBlockButton = new Button(9 * CELLWIDTH, 3.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "quadra", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeMovableButton = new Button(3 * CELLWIDTH, 5.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "móvel", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placePathconstrainedButton = new Button(6 * CELLWIDTH, 5.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "no caminho", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeOnewayButton = new Button(9 * CELLWIDTH, 5.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "mão única", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placePointButton = new Button(3 * CELLWIDTH, 7.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "ponto", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeCoinButton = new Button(6 * CELLWIDTH, 7.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "moeda", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeRotateButton = new Button(9 * CELLWIDTH, 7.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "rodar", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeEraseButton = new Button(3 * CELLWIDTH, 9.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "apagar", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeIncreaseconstrainButton = new Button(6 * CELLWIDTH, 9.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "+path", "rgba(255, 255, 255, 0.5)", "14px arial");
	this.placeDecreaseconstrainButton = new Button(9 * CELLWIDTH, 9.5 * CELLWIDTH, 2 * CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "-path", "rgba(255, 255, 255, 0.5)", "14px arial");

	this.backButton = new Button(CELLWIDTH / 2, CELLWIDTH / 2, CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "volta", "rgba(255, 255, 255, 0.5)", "13px arial");

	this.clearButton = new Button(11.5 * CELLWIDTH, CELLWIDTH / 2, CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "limpar", "rgba(255, 255, 255, 0.5)", "12px arial");

	this.editButton = new Button(CELLWIDTH / 2, 11.5 * CELLWIDTH, CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "editar", "rgba(255, 255, 255, 0.5)", "12px arial");

	this.placables = {
		player: 0,
		goal: 1,
		block: 2,
		movable: 3,
		pathconstrained: 4,
		increaseconstrain: 5,
		decreaseconstrain: 6,
		oneway: 7,
		point: 8,
		coin: 9,
		rotate: 10,
		erase: 11,
	}
	this.placing = this.placables.player;

	this.placingPlayer = function() {
		return this.placing == this.placables.player;
	}

	this.placingGoal = function() {
		return this.placing == this.placables.goal;
	}

	this.placingBlock = function() {
		return this.placing == this.placables.block;
	}

	this.placingMovable = function() {
		return this.placing == this.placables.movable;
	}

	this.placingPathconstrained = function() {
		return this.placing == this.placables.pathconstrained;
	}

	this.placingIncreaseconstrain = function() {
		return this.placing == this.placables.increaseconstrain;
	}

	this.placingDecreaseconstrain = function() {
		return this.placing == this.placables.decreaseconstrain;
	}

	this.placingOneway = function() {
		return this.placing == this.placables.oneway;
	}

	this.placingPoint = function() {
		return this.placing == this.placables.point;
	}

	this.placingCoin = function() {
		return this.placing == this.placables.coin;
	}

	this.placingRotate = function() {
		return this.placing == this.placables.rotate;
	}

	this.placingErase = function() {
		return this.placing == this.placables.erase;
	}


	this.toPlacingPlayer = function() {
		this.placing = this.placables.player;
	}

	this.toPlacingGoal = function() {
		this.placing = this.placables.goal;
	}

	this.toPlacingBlock = function() {
		this.placing = this.placables.block;
	}

	this.toPlacingMovable = function() {
		this.placing = this.placables.movable;
	}

	this.toPlacingPathconstrained = function() {
		this.placing = this.placables.pathconstrained;
	}

	this.toPlacingIncreaseconstrain = function() {
		this.placing = this.placables.increaseconstrain;
	}

	this.toPlacingDecreaseconstrain = function() {
		this.placing = this.placables.decreaseconstrain;
	}

	this.toPlacingOneway = function() {
		this.placing = this.placables.oneway;
	}

	this.toPlacingPoint = function() {
		this.placing = this.placables.point;
	}

	this.toPlacingCoin = function() {
		this.placing = this.placables.coin;
	}

	this.toPlacingRotate = function() {
		this.placing = this.placables.rotate;
	}

	this.toPlacingErase = function() {
		this.placing = this.placables.erase;
	}



	this.levelBuildModes = {
		build: 0,
		edit: 1
	}
	this.levelBuildMode = this.levelBuildModes.build;


	this.inBuild = function() {
		return this.levelBuildMode == this.levelBuildModes.build;
	}

	this.inEdit = function() {
		return this.levelBuildMode == this.levelBuildModes.edit;
	}



	this.toBuild = function() {
		this.levelBuildMode = this.levelBuildModes.build;
	}

	this.toEdit = function() {
		this.levelBuildMode = this.levelBuildModes.edit;
	}



	this.loadSeed = function(seed) {
		var extracted = this.seedHandler.extractSeed(seed);

		this.player = extracted.player;
		this.blocks = extracted.blocks;
		this.goal = extracted.goal;
		this.movables = extracted.movables;
		this.oneways = extracted.oneways;
		this.pathconstrained = extracted.pathconstrained;
		this.points = extracted.points;
		this.coins = extracted.coins;

	}

	this.getSeed = function() {
		var raw = {
			player: this.player,
			goal: this.goal,
			blocks: this.blocks,
			movables: this.movables,
			pathconstrained: this.pathconstrained,
			oneways: this.oneways,
			points: this.points,
			coins: this.coins
		}

		return this.seedHandler.generateSeed(raw);
	}

	this.run = function(c) {
		this.showAll(c);
	}

	this.showAll = function(c) {

		try {
			for (var i = 0; i < this.blocks.length; i++) {
				this.blocks[i].show(c);
			}
		} catch (Exception) {

		}

		try {
			for (var i = 0; i < this.oneways.length; i++) {
				this.oneways[i].show(c);
			}
		} catch (Exception) {

		}

		try {
			for (var i = 0; i < this.points.length; i++) {
				this.points[i].show(c);
			}
		} catch (Exception) {

		}

		try {
			for (var i = 0; i < this.coins.length; i++) {
				this.coins[i].show(c);
			}
		} catch (Exception) {

		}


		try {
			this.goal.show(c);
		} catch (Exception) {

		}

		try {
			for (var i = 0; i < this.movables.length; i++) {
				this.movables[i].show(c);
			}
		} catch (Exception) {

		}

		try {
			for (var i = 0; i < this.pathconstrained.length; i++) {
				this.pathconstrained[i].show(c);
			}
		} catch (Exception) {

		}

		try {
			this.player.show(c);
		} catch (Exception) {

		}

		if (this.inEdit()) {
			c.fillStyle = "rgba(0, 0, 0, 0.5)";
			c.fillRect(0, 0, can.width, can.height);


			this.getSeedButton.show(c);
			this.loadSeedButton.show(c);

			this.placePlayerButton.show(c);
			this.placeGoalButton.show(c);
			this.placeBlockButton.show(c);
			this.placeMovableButton.show(c);
			this.placePathconstrainedButton.show(c);
			this.placeOnewayButton.show(c);
			this.placePointButton.show(c);
			this.placeCoinButton.show(c);
			this.placeRotateButton.show(c);
			this.placeEraseButton.show(c);
			this.placeIncreaseconstrainButton.show(c);
			this.placeDecreaseconstrainButton.show(c);
		}

		this.backButton.show(c);

		this.clearButton.show(c);

		this.editButton.show(c);
	}

	this.handleInput = function(e) {
		var x = (e.clientX || e.targetTouches[0].clientX);
		var y = (e.clientY || e.targetTouches[0].clientY);



		if (this.inEdit()) {
			if (this.getSeedButton.contains(x, y)) { //buttons
				prompt("copie esta semente", this.getSeed());
			} else if (this.loadSeedButton.contains(x, y)) {
				seed = prompt("insira uma semente a ser editada");
				if (seed == undefined || seed == null || seed == "") {
					return;
				}
				this.loadSeed(seed);
				this.toBuild();
			} else if (this.placePlayerButton.contains(x, y)) {
				this.toPlacingPlayer();
				this.toBuild();
			} else if (this.placeGoalButton.contains(x, y)) {
				this.toPlacingGoal();
				this.toBuild();
			} else if (this.placeBlockButton.contains(x, y)) {
				this.toPlacingBlock();
				this.toBuild();
			} else if (this.placeMovableButton.contains(x, y)) {
				this.toPlacingMovable();
				this.toBuild();
			} else if (this.placePathconstrainedButton.contains(x, y)) {
				this.toPlacingPathconstrained();
				this.toBuild();
			} else if (this.placeOnewayButton.contains(x, y)) {
				this.toPlacingOneway();
				this.toBuild();
			} else if (this.placePointButton.contains(x, y)) {
				this.toPlacingPoint();
				this.toBuild();
			} else if (this.placeCoinButton.contains(x, y)) {
				this.toPlacingCoin();
				this.toBuild();
			} else if (this.placeRotateButton.contains(x, y)) {
				this.toPlacingRotate();
				this.toBuild();
			} else if (this.placeEraseButton.contains(x, y)) {
				this.toPlacingErase();
				this.toBuild();
			} else if (this.placeIncreaseconstrainButton.contains(x, y)) {
				this.toPlacingIncreaseconstrain();
				this.toBuild();
			} else if (this.placeDecreaseconstrainButton.contains(x, y)) {
				this.toPlacingDecreaseconstrain();
				this.toBuild();
			} else {
				this.toBuild();
			}
			return;
		} else {
			if (this.clearButton.contains(x, y)) {
				this.player = new Player(1.5 * CELLWIDTH, 1.5 * CELLWIDTH, CELLWIDTH - 2, CELLWIDTH - 2);
				this.goal = new Goal(10.5 * CELLWIDTH, 10.5 * CELLWIDTH, CELLWIDTH - 2, CELLWIDTH - 2);
				this.blocks = this.seedHandler.getDefaultBlocks();
				this.movables = [];
				this.pathconstrained = [];
				this.oneways = [];
				this.points = [];
				this.coins = [];
				return;
			} else if (this.backButton.contains(x, y)) {
				this.mainMenu.toMainMenu();
			} else if (this.editButton.contains(x, y)) {
				this.toEdit();
			}
		}

		x = Math.round((x - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2;
		y = Math.round((y - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2;

		if (x <= CELLWIDTH / 2 || x >= 11.5 * CELLWIDTH || y <= CELLWIDTH / 2 || y >= 11.5 * CELLWIDTH) {
			return;
		}

		/*if (!this.nothingAt(x, y)) {
			//alert("something in the way!");
			return;
		}*/

		if (this.placingPlayer() && this.nothingAt(x, y)) { //placables
			this.player.setMiddleX(x);
			this.player.setMiddleY(y);
		} else if (this.placingGoal() && this.nothingAt(x, y)) {
			this.goal.setMiddleX(x);
			this.goal.setMiddleY(y);
		} else if (this.placingBlock() && this.nothingAt(x, y)) {
			this.blocks.push(new Block(x, y, CELLWIDTH, CELLWIDTH));
		} else if (this.placingMovable() && this.nothingAt(x, y)) {
			this.movables.push(new MovableBlock(x, y, CELLWIDTH - 2, CELLWIDTH - 2));
		} else if (this.placingPathconstrained() && this.nothingAt(x, y)) {
			this.pathconstrained.push(new PathConstrainedBlock(x, y, CELLWIDTH - 2, CELLWIDTH - 2, true, Math.max(x - CELLWIDTH * 2, 1.5 * CELLWIDTH), Math.min(x + CELLWIDTH * 2, 10.5 * CELLWIDTH)));
		} else if (this.placingOneway() && this.nothingAt(x, y)) {
			this.oneways.push(new OneWayGate(x, y, CELLWIDTH, CELLWIDTH, "l"));
		} else if (this.placingPoint() && this.nothingAt(x, y)) {
			this.points.push(new Point(x, y));
		} else if (this.placingCoin() && this.nothingAt(x, y)) {
			this.coins.push(new Coin(x, y));
		} else if (this.placingRotate()) {
			if (Math.round(this.player.getMiddleX()) == Math.round(x) && Math.round(this.player.getMiddleY()) == Math.round(y)) {
				var current = this.player.lastGravity.going;
				if (current == "left") {
					this.player.lastGravity.going = "up";
				} else if (current == "up") {
					this.player.lastGravity.going = "right";
				} else if (current == "right") {
					this.player.lastGravity.going = "down";
				} else if (current == "down") {
					this.player.lastGravity.going = "left";
				}
				return;
			}
			for (var i = 0; i < this.pathconstrained.length; i++) {
				if (this.pathconstrained[i].getMiddleX() == x && this.pathconstrained[i].getMiddleY() == y) {
					if (this.pathconstrained[i].isVertical()) {
						this.pathconstrained[i].setVertical(false);
						this.pathconstrained[i].setConstrainedFrom(Math.max(this.pathconstrained[i].getMiddleY() - CELLWIDTH * 2, 1.5 * CELLWIDTH));
						this.pathconstrained[i].setConstrainedTo(Math.min(this.pathconstrained[i].getMiddleY() + CELLWIDTH * 2, 11.5 * CELLWIDTH));
					} else {
						this.pathconstrained[i].setVertical(true);
						this.pathconstrained[i].setConstrainedFrom(Math.max(this.pathconstrained[i].getMiddleX() - CELLWIDTH * 2, 1.5 * CELLWIDTH));
						this.pathconstrained[i].setConstrainedTo(Math.min(this.pathconstrained[i].getMiddleX() + CELLWIDTH * 2, 11.5 * CELLWIDTH));
					}
					return;
				}
			}
			for (var i = 0; i < this.oneways.length; i++) {
				if (this.oneways[i].getMiddleX() == x && this.oneways[i].getMiddleY() == y) {
					var current = this.oneways[i].getBlockingDirection();
					if (current == "left") {
						this.oneways[i].setBlockingDirection("up");
					} else if (current == "up") {
						this.oneways[i].setBlockingDirection("right");
					} else if (current == "right") {
						this.oneways[i].setBlockingDirection("down");
					} else if (current == "down") {
						this.oneways[i].setBlockingDirection("left");
					}
					return;
				}
			}
		} else if (this.placingErase()) {
			for (var i = 0; i < this.blocks.length; i++) {
				if (this.blocks[i].getMiddleX() == x && this.blocks[i].getMiddleY() == y) {
					this.blocks.splice(i, 1);
					return;
				}
			}
			for (var i = 0; i < this.movables.length; i++) {
				if (this.movables[i].getMiddleX() == x && this.movables[i].getMiddleY() == y) {
					this.movables.splice(i, 1);
					return;
				}
			}
			for (var i = 0; i < this.pathconstrained.length; i++) {
				if (this.pathconstrained[i].getMiddleX() == x && this.pathconstrained[i].getMiddleY() == y) {
					this.pathconstrained.splice(i, 1);
					return;
				}
			}
			for (var i = 0; i < this.oneways.length; i++) {
				if (this.oneways[i].getMiddleX() == x && this.oneways[i].getMiddleY() == y) {
					this.oneways.splice(i, 1);
					return;
				}
			}
			for (var i = 0; i < this.points.length; i++) {
				if (this.points[i].getMiddleX() == x && this.points[i].getMiddleY() == y) {
					this.points.splice(i, 1);
					return;
				}
			}
			for (var i = 0; i < this.coins.length; i++) {
				if (this.coins[i].getMiddleX() == x && this.coins[i].getMiddleY() == y) {
					this.coins.splice(i, 1);
					return;
				}
			}
		} else if (this.placingIncreaseconstrain()) {
			for (var i = 0; i < this.pathconstrained.length; i++) {
				//if (this.pathconstrained[i].getMiddleX() == x && this.pathconstrained[i].getMiddleY() == y) {
				if (this.pathconstrained[i].isVertical()) {
					if (this.pathconstrained[i].getMiddleY() == y) {
						if (this.pathconstrained[i].getConstrainedFrom() == x) {
							this.pathconstrained[i].setConstrainedFrom(Math.max(this.pathconstrained[i].getConstrainedFrom() - CELLWIDTH, 1.5 * CELLWIDTH));
							return;
						} else if (this.pathconstrained[i].getConstrainedTo() == x) {
							this.pathconstrained[i].setConstrainedTo(Math.min(this.pathconstrained[i].getConstrainedTo() + CELLWIDTH, 11.5 * CELLWIDTH));
							return;
						}
					}
				} else {
					if (this.pathconstrained[i].getMiddleX() == x) {
						if (this.pathconstrained[i].getConstrainedFrom() == y) {
							this.pathconstrained[i].setConstrainedFrom(Math.max(this.pathconstrained[i].getConstrainedFrom() - CELLWIDTH, 1.5 * CELLWIDTH));
							return;
						} else if (this.pathconstrained[i].getConstrainedTo() == y) {
							this.pathconstrained[i].setConstrainedTo(Math.min(this.pathconstrained[i].getConstrainedTo() + CELLWIDTH, 11.5 * CELLWIDTH));
							return;
						}
					}
				}

				//}
			}
		} else if (this.placingDecreaseconstrain()) {
			for (var i = 0; i < this.pathconstrained.length; i++) {
				//if (this.pathconstrained[i].getMiddleX() == x && this.pathconstrained[i].getMiddleY() == y) {
				if (this.pathconstrained[i].isVertical()) {
					if (this.pathconstrained[i].getMiddleY() == y) {
						if (this.pathconstrained[i].getConstrainedFrom() == x) {
							this.pathconstrained[i].setConstrainedFrom(Math.max(Math.min(this.pathconstrained[i].getConstrainedFrom() + CELLWIDTH, this.pathconstrained[i].getMiddleX()), 1.5 * CELLWIDTH));
							return;
						} else if (this.pathconstrained[i].getConstrainedTo() == x) {
							this.pathconstrained[i].setConstrainedTo(Math.min(Math.max(this.pathconstrained[i].getConstrainedTo() - CELLWIDTH, this.pathconstrained[i].getMiddleX()), 11.5 * CELLWIDTH));
							return;
						}
					}
				} else {
					if (this.pathconstrained[i].getMiddleX() == x) {
						if (this.pathconstrained[i].getConstrainedFrom() == y) {
							this.pathconstrained[i].setConstrainedFrom(Math.max(Math.min(this.pathconstrained[i].getConstrainedFrom() + CELLWIDTH, this.pathconstrained[i].getMiddleY()), 1.5 * CELLWIDTH));
							return;
						} else if (this.pathconstrained[i].getConstrainedTo() == y) {
							this.pathconstrained[i].setConstrainedTo(Math.min(Math.max(this.pathconstrained[i].getConstrainedTo() - CELLWIDTH, this.pathconstrained[i].getMiddleY()), 11.5 * CELLWIDTH));
							return;
						}
					}
				}
			}
		}
	}

	this.nothingAt = function(x, y) {
		if (Math.round(this.player.getMiddleX()) == Math.round(x) && Math.round(this.player.getMiddleY()) == Math.round(y)) {
			return false;
		}

		if (Math.round(this.goal.getMiddleX()) == Math.round(x) && Math.round(this.goal.getMiddleY()) == Math.round(y)) {
			return false;
		}

		for (var i = 0; i < this.blocks.length; i++) {
			if (Math.round(this.blocks[i].getMiddleX()) == Math.round(x) && Math.round(this.blocks[i].getMiddleY()) == Math.round(y)) {
				return false;
			}
		}

		for (var i = 0; i < this.movables.length; i++) {
			if (Math.round(this.movables[i].getMiddleX()) == Math.round(x) && Math.round(this.movables[i].getMiddleY()) == Math.round(y)) {
				return false;
			}
		}

		for (var i = 0; i < this.pathconstrained.length; i++) {
			if (Math.round(this.pathconstrained[i].getMiddleX()) == Math.round(x) && Math.round(this.pathconstrained[i].getMiddleY()) == Math.round(y)) {
				return false;
			}
		}

		for (var i = 0; i < this.oneways.length; i++) {
			if (Math.round(this.oneways[i].getMiddleX()) == Math.round(x) && Math.round(this.oneways[i].getMiddleY()) == Math.round(y)) {
				return false;
			}
		}

		for (var i = 0; i < this.points.length; i++) {
			if (Math.round(this.points[i].getMiddleX()) == Math.round(x) && Math.round(this.points[i].getMiddleY()) == Math.round(y)) {
				return false;
			}
		}

		for (var i = 0; i < this.coins.length; i++) {
			if (Math.round(this.coins[i].getMiddleX()) == Math.round(x) && Math.round(this.coins[i].getMiddleY()) == Math.round(y)) {
				return false;
			}
		}

		return true;
	}
}








function Game(can, mainMenu) {
	this.can = can;
	this.mainMenu = mainMenu;

	this.seedHandler = new SeedHandler();

	this.player = null;
	this.goal = null;
	this.blocks = [];
	this.movables = [];
	this.pathconstrained = [];
	this.oneways = [];
	this.points = [];
	this.coins = [];

	//this.toLeftButton = new Button(50, 420, 98, 118, "rgba(0, 0, 0, 0.5)", "left", "rgba(255, 255, 255, 0.5)", "30px arial");
	//this.toUpButton = new Button(180, 390, 158, 58, "rgba(0, 0, 0, 0.5)", "up", "rgba(255, 255, 255, 0.5)", "30px arial");
	//this.toRightButton = new Button(310, 420, 98, 118, "rgba(0, 0, 0, 0.5)", "right", "rgba(255, 255, 255, 0.5)", "30px arial");
	//this.toDownButton = new Button(180, 450, 158, 58, "rgba(0, 0, 0, 0.5)", "down", "rgba(255, 255, 255, 0.5)", "30px arial");

	this.backButton = new Button(CELLWIDTH / 2, CELLWIDTH / 2, CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "voltar", "rgba(255, 255, 255, 0.5)", "13px arial");

	this.resetButton = new Button(11.5 * CELLWIDTH, CELLWIDTH / 2, CELLWIDTH, CELLWIDTH, "rgba(0, 0, 0, 0.5)", "resetar", "rgba(255, 255, 255, 0.5)", "12px arial");

	this.done = false;

	this.playingSeed = 0;
	this.seed;

	this.gravity = {
		x: 0,
		y: 1,
		going: "down",
		up: "#00FFFF",
		down: "#FF0000",
		left: "#00FF00",
		right: "#0000FF",
	}

	this.score = 0;
	this.time = 0;

	this.prepareGravityChange = function() {
		this.player.setMiddleX(Math.round((this.player.getMiddleX() - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2);
		this.player.setMiddleY(Math.round((this.player.getMiddleY() - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2);
		this.player.setMoving(true);

		for (var i = 0; i < this.movables.length; i++) {
			this.movables[i].setMiddleX(Math.round((this.movables[i].getMiddleX() - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2);
			this.movables[i].setMiddleY(Math.round((this.movables[i].getMiddleY() - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2);
			this.movables[i].setMoving(true);
		}

		for (var i = 0; i < this.pathconstrained.length; i++) {
			this.pathconstrained[i].setMiddleX(Math.round((this.pathconstrained[i].getMiddleX() - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2);
			this.pathconstrained[i].setMiddleY(Math.round((this.pathconstrained[i].getMiddleY() - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2);
			this.pathconstrained[i].setMoving(true);
		}

		this.player.setXSpeed(0);
		this.player.setYSpeed(0);
	}

	this.noneMoving = function() {
		var moving = false;
		for (var i = 0; i < this.movables.length; i++) {
			moving = moving || this.movables[i].isMoving();
		}

		for (var i = 0; i < this.pathconstrained.length; i++) {
			moving = moving || this.pathconstrained[i].isMoving();
		}

		return (!this.player.isMoving() && !moving)
	}

	this.toLeftGravity = function() {
		if (!this.noneMoving()) {
			return;
		}

		this.prepareGravityChange();

		this.gravity.x = -2;
		this.gravity.y = 0;
		this.gravity.going = "left";
	}

	this.toTopGravity = function() {
		if (!this.noneMoving()) {
			return;
		}

		this.prepareGravityChange();

		this.gravity.x = 0;
		this.gravity.y = -2;
		this.gravity.going = "up";
	}

	this.toRightGravity = function() {
		if (!this.noneMoving()) {
			return;
		}

		this.prepareGravityChange();

		this.gravity.x = 2;
		this.gravity.y = 0;
		this.gravity.going = "right";
	}

	this.toBottomGravity = function() {
		if (!this.noneMoving()) {
			return;
		}

		this.prepareGravityChange();

		this.gravity.x = 0;
		this.gravity.y = 2;
		this.gravity.going = "down";
	}


	this.playSeed = function(seedId, seed) {
		this.playingSeed = seedId;
		this.seed = seed;
		var extracted = this.seedHandler.extractSeed(seed);

		this.player = extracted.player;
		this.blocks = extracted.blocks;
		this.goal = extracted.goal;
		this.movables = extracted.movables;
		this.oneways = extracted.oneways;
		this.pathconstrained = extracted.pathconstrained;
		this.points = extracted.points;
		this.coins = extracted.coins;

		this.gravity = this.player.lastGravity;

		this.score = 0;
		this.time = 0;
	}


	this.run = function(c) {
		this.updateAll();
		this.showAll(c);
	}

	this.showAll = function(c) {
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].show(c);
		}
		for (var i = 0; i < this.oneways.length; i++) {
			this.oneways[i].show(c);
		}
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].show(c);
		}
		for (var i = 0; i < this.coins.length; i++) {
			this.coins[i].show(c);
		}
		for (var i = 0; i < this.pathconstrained.length; i++) {
			this.pathconstrained[i].show(c);
		}
		this.goal.show(c);
		for (var i = 0; i < this.movables.length; i++) {
			this.movables[i].show(c);
		}
		this.player.show(c);

		/*
				this.toLeftButton.show(c);
				this.toUpButton.show(c);
				this.toRightButton.show(c);
				this.toDownButton.show(c);
		*/
		if (this.done) {
			c.fillStyle = "rgba(0, 0, 0, 0.5)";
			c.fillRect(0, 0, can.width, can.height);

			c.fillStyle = "rgba(255, 255, 255, 0.5)";
			c.font = "20px arial";
			c.fillText("tap to continue", can.width / 2, can.height / 2);
		}

		this.backButton.show(c);

		this.resetButton.show(c);

		c.fillStyle = "rgba(0, 0, 0, 0.75)";
		c.fillText("nível: " + this.playingSeed, can.width/4, CELLWIDTH/2);

		c.fillText("Ponto: " + this.score, can.width/2, CELLWIDTH/2);

		c.fillText("tempo: " + (this.time / 60).toFixed(2), can.width/4*3, CELLWIDTH/2);
	}

	this.updateAll = function() {
		this.player.applyGravity(this.gravity);
		this.player.updateOnBodys(this.blocks.concat(this.movables).concat(this.pathconstrained));
		this.player.updateOnOneways(this.oneways);
		this.player.update();

		for (var i = 0; i < this.movables.length; i++) {
			this.movables[i].applyGravity(this.gravity);
			this.movables[i].updateOnBodys(this.blocks.concat([this.player]).concat(this.movables).concat(this.pathconstrained));
			this.movables[i].updateOnOneways(this.oneways);
			this.movables[i].update();
		}

		for (var i = 0; i < this.pathconstrained.length; i++) {
			this.pathconstrained[i].applyGravity(this.gravity);
			this.pathconstrained[i].updateOnBodys(this.blocks.concat([this.player]).concat(this.movables));
			this.pathconstrained[i].updateOnOneways(this.oneways);
			this.pathconstrained[i].update();
		}

		for (var i = this.points.length - 1; i >= 0; i--) {
			if (this.player.touchingCollectable(this.points[i])) {
				this.points.splice(i, 1);
				this.score += 5;
			}
		}

		for (var i = this.coins.length - 1; i >= 0; i--) {
			if (this.player.touchingCollectable(this.coins[i])) {
				this.coins.splice(i, 1);
				this.score += 25;
			}
		}

		if (this.player.touchingGoal(this.goal)) {
			this.done = true;
		} else {
			this.time++;
			this.done = false;
		}
	}

	this.handleInput = function(e) {
		var x = (e.clientX || e.targetTouches[0].clientX);
		var y = (e.clientY || e.targetTouches[0].clientY);

		/*if (this.toLeftButton.contains(x, y)) {
			this.toLeftGravity();
		} else if (this.toUpButton.contains(x, y)) {
			this.toTopGravity();
		} else if (this.toRightButton.contains(x, y)) {
			this.toRightGravity();
		} else if (this.toDownButton.contains(x, y)) {
			this.toBottomGravity();
		} else */
		if (this.backButton.contains(x, y)) {
			this.mainMenu.toMainMenu();
		} else if (this.resetButton.contains(x, y)) {
			this.playSeed(this.playingSeed, this.seed);
		}

	}
}






function Player(middleX, middleY, width, height, going) {
	this.middleX = middleX;
	this.middleY = middleY;
	this.width = width;
	this.height = height;

	this.xSpeed = 0;
	this.ySpeed = 0;

	this.moving = true;

	if (going == "l") {
		this.lastGravity = {
			x: -1,
			y: 0,
			going: "left",
			up: "#00FFFF",
			down: "#FF0000",
			left: "#00FF00",
			right: "#0000FF",
		}
	} else if (going == "u") {
		this.lastGravity = {
			x: 0,
			y: -1,
			going: "up",
			up: "#00FFFF",
			down: "#FF0000",
			left: "#00FF00",
			right: "#0000FF",
		}
	} else if (going == "d") {
		this.lastGravity = {
			x: 0,
			y: 1,
			going: "down",
			up: "#00FFFF",
			down: "#FF0000",
			left: "#00FF00",
			right: "#0000FF",
		}
	} else {
		this.lastGravity = {
			x: 1,
			y: 0,
			going: "right",
			up: "#00FFFF",
			down: "#FF0000",
			left: "#00FF00",
			right: "#0000FF",
		}
	}

	this.isMoving = function() {
		return this.moving;
	}

	this.getMiddleX = function() {
		return this.middleX;
	}

	this.getMiddleY = function() {
		return this.middleY;
	}

	this.getWidth = function() {
		return this.width;
	}

	this.getHeight = function() {
		return this.height;
	}

	this.getXSpeed = function() {
		return this.xSpeed;
	}

	this.getYSpeed = function() {
		return this.ySpeed;
	}


	this.setMoving = function(bool) {
		this.moving = bool;
	}

	this.setMiddleX = function(middleX) {
		this.middleX = middleX;
	}

	this.setMiddleY = function(middleY) {
		this.middleY = middleY;
	}

	this.setXSpeed = function(xSpeed) {
		this.xSpeed = xSpeed;
	}

	this.setYSpeed = function(ySpeed) {
		this.ySpeed = ySpeed;
	}


	this.show = function(c) {
		c.fillStyle = "#999999";
		c.fillRect(this.middleX - this.width / 2, this.middleY - this.height / 2, this.width, this.height);

		if (this.lastGravity.going == "down") { //down
			c.fillStyle = this.lastGravity.down;
			c.beginPath();
			c.moveTo(this.middleX, this.middleY + this.height / 2);
			c.lineTo(this.middleX - this.width / 2, this.middleY);
			c.lineTo(this.middleX - this.width / 5, this.middleY);
			c.lineTo(this.middleX - this.width / 5, this.middleY - this.height / 2);
			c.lineTo(this.middleX + this.width / 5, this.middleY - this.height / 2);
			c.lineTo(this.middleX + this.width / 5, this.middleY);
			c.lineTo(this.middleX + this.width / 2, this.middleY);
			c.lineTo(this.middleX, this.middleY + this.height / 2);
			c.fill();
			c.stroke();
		} else if (this.lastGravity.going == "up") { //up
			c.fillStyle = this.lastGravity.up;
			c.beginPath();
			c.moveTo(this.middleX, this.middleY - this.height / 2);
			c.lineTo(this.middleX - this.width / 2, this.middleY);
			c.lineTo(this.middleX - this.width / 5, this.middleY);
			c.lineTo(this.middleX - this.width / 5, this.middleY + this.height / 2);
			c.lineTo(this.middleX + this.width / 5, this.middleY + this.height / 2);
			c.lineTo(this.middleX + this.width / 5, this.middleY);
			c.lineTo(this.middleX + this.width / 2, this.middleY);
			c.lineTo(this.middleX, this.middleY - this.height / 2);
			c.fill();
			c.stroke();
		} else if (this.lastGravity.going == "right") { //right
			c.fillStyle = this.lastGravity.right;
			c.beginPath();
			c.moveTo(this.middleX + this.width / 2, this.middleY);
			c.lineTo(this.middleX, this.middleY - this.height / 2);
			c.lineTo(this.middleX, this.middleY - this.height / 5);
			c.lineTo(this.middleX - this.width / 2, this.middleY - this.height / 5);
			c.lineTo(this.middleX - this.width / 2, this.middleY + this.height / 5);
			c.lineTo(this.middleX, this.middleY + this.height / 5);
			c.lineTo(this.middleX, this.middleY + this.height / 2);
			c.lineTo(this.middleX + this.width / 2, this.middleY);
			c.fill();
			c.stroke();
		} else if (this.lastGravity.going == "left") { //left
			c.fillStyle = this.lastGravity.left;
			c.beginPath();
			c.moveTo(this.middleX - this.width / 2, this.middleY);
			c.lineTo(this.middleX, this.middleY - this.height / 2);
			c.lineTo(this.middleX, this.middleY - this.height / 5);
			c.lineTo(this.middleX + this.width / 2, this.middleY - this.height / 5);
			c.lineTo(this.middleX + this.width / 2, this.middleY + this.height / 5);
			c.lineTo(this.middleX, this.middleY + this.height / 5);
			c.lineTo(this.middleX, this.middleY + this.height / 2);
			c.lineTo(this.middleX - this.width / 2, this.middleY);
			c.fill();
			c.stroke();
		}
	}

	this.applyGravity = function(gravity) {
		if (this.moving) {
			this.xSpeed += gravity.x;
			this.ySpeed += gravity.y;
		} else {
			this.middleX = Math.round((this.middleX - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2;
			this.middleY = Math.round((this.middleY - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2;
		}

		var maxSpeed = CELLWIDTH / 3;
		if (this.xSpeed < -maxSpeed) {
			this.xSpeed = -maxSpeed;
		} else if (this.xSpeed > maxSpeed) {
			this.xSpeed = maxSpeed;
		}

		if (this.ySpeed < -maxSpeed) {
			this.ySpeed = -maxSpeed;
		} else if (this.ySpeed > maxSpeed) {
			this.ySpeed = maxSpeed;
		}

		this.lastGravity = gravity;
	}

	this.updateOnBodys = function(bodys) {
		if (!this.moving) {
			return;
		}
		for (var i = 0; i < bodys.length; i++) {
			if (!bodys[i].isMoving() && this.squaresInsideEachOther(bodys[i].getMiddleX(), bodys[i].getMiddleY(), bodys[i].getWidth(), bodys[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
				this.xSpeed = 0;
				this.ySpeed = 0;
				this.moving = false;

				do {
					if (this.lastGravity.going == "down") { //down
						this.middleY -= 1;
					} else if (this.lastGravity.going == "up") { //up
						this.middleY += 1;
					} else if (this.lastGravity.going == "right") { //right
						this.middleX -= 1;
					} else { //left
						this.middleX += 1;
					}

				} while (this.squaresInsideEachOther(bodys[i].getMiddleX(), bodys[i].getMiddleY(), bodys[i].getWidth(), bodys[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

				if (this.lastGravity.going == "down") { //down
					this.middleY += 1;
				} else if (this.lastGravity.going == "up") { //up
					this.middleY -= 1;
				} else if (this.lastGravity.going == "right") { //right
					this.middleX += 1;
				} else { //left
					this.middleX -= 1;
				}

				return;
			}
		}
	}

	this.updateOnOneways = function(oneways) {
		for (var i = 0; i < oneways.length; i++) {
			if (oneways[i].getBlockingDirection() == this.lastGravity.going) {

				if (this.lastGravity.going == "down") { //down
					if (oneways[i].getMiddleY() <= this.middleY) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleY -= 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleY += 1;
						return;
					}
				} else if (this.lastGravity.going == "up") { //up
					if (oneways[i].getMiddleY() >= this.middleY) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleY += 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleY -= 1;
						return;
					}
				} else if (this.lastGravity.going == "right") { //right
					if (oneways[i].getMiddleX() <= this.middleX) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleX -= 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleX += 1;
						return;
					}
				} else { //left
					if (oneways[i].getMiddleX() >= this.middleX) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleX += 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleX -= 1;
						return;
					}
				}
			}
		}
	}

	this.update = function() {
		if (!this.moving) {
			return;
		}

		this.middleX += this.xSpeed;
		this.middleY += this.ySpeed;
	}

	this.touchingGoal = function(goal) {
		if (this.squaresInsideEachOther(goal.getMiddleX(), goal.getMiddleY(), goal.getWidth(), goal.getHeight(), this.middleX, this.middleY, this.width, this.height)) {
			this.middleX = goal.getMiddleX();
			this.middleY = goal.getMiddleY();
			this.xSpeed = 0;
			this.ySpeed = 0;
			this.moving = false;
			return true;
		}
		return false;
	}

	this.touchingCollectable = function(collectable) { //coin / point
		return this.pointInSquare(collectable.getMiddleX(), collectable.getMiddleY(), this.middleX, this.middleY, this.width, this.height);
	}

	this.squaresInsideEachOther = function(middleX1, middleY1, width1, height1, middleX2, middleY2, width2, height2) {
		return (
			this.pointInSquare(middleX1 - width1 / 2, middleY1 - height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 - width1 / 2, middleY1 + height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 + width1 / 2, middleY1 - height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 + width1 / 2, middleY1 + height1 / 2, middleX2, middleY2, width2, height2) ||

			this.pointInSquare(middleX2 - width2 / 2, middleY2 - height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 - width2 / 2, middleY2 + height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 + width2 / 2, middleY2 - height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 + width2 / 2, middleY2 + height2 / 2, middleX1, middleY1, width1, height1)
		);
	}

	this.pointInSquare = function(x, y, middleX, middleY, width, height) {
		return (middleX - width / 2 <= x && middleX + width / 2 >= x && middleY - height / 2 <= y && middleY + height / 2 >= y);
	}
}








function Block(middleX, middleY, width, height) {
	this.middleX = middleX;
	this.middleY = middleY;
	this.width = width;
	this.height = height;

	this.isMoving = function() {
		return false;
	}

	this.getMiddleX = function() {
		return this.middleX;
	}

	this.getMiddleY = function() {
		return this.middleY;
	}

	this.getWidth = function() {
		return this.width;
	}

	this.getHeight = function() {
		return this.height;
	}

	this.getXSpeed = function() {
		return 0;
	}

	this.getYSpeed = function() {
		return 0;
	}


	this.setMoving = function(bool) {

	}

	this.setMiddleX = function(middleX) {
		this.middleX = middleX;
	}

	this.setMiddleY = function(middleY) {
		this.middleY = middleY;
	}

	this.setXSpeed = function(xSpeed) {

	}

	this.setYSpeed = function(ySpeed) {

	}

	this.show = function(c) {
		c.fillStyle = "#999999";
		c.fillRect(this.middleX - this.width / 2 + 1, this.middleY - this.height / 2 + 1, this.width - 2, this.height - 2);
	}

}







function MovableBlock(middleX, middleY, width, height) {
	this.middleX = middleX;
	this.middleY = middleY;
	this.width = width;
	this.height = height;

	this.xSpeed = 0;
	this.ySpeed = 0;

	this.moving = true;

	this.lastGravity = {
		x: 0,
		y: 1,
		up: "#00FFFF",
		down: "#FF0000",
		left: "#00FF00",
		right: "#0000FF",
	}


	this.isMoving = function() {
		return this.moving;
	}

	this.getMiddleX = function() {
		return this.middleX;
	}

	this.getMiddleY = function() {
		return this.middleY;
	}

	this.getWidth = function() {
		return this.width;
	}

	this.getHeight = function() {
		return this.height;
	}

	this.getXSpeed = function() {
		return this.xSpeed;
	}

	this.getYSpeed = function() {
		return this.ySpeed;
	}


	this.setMoving = function(bool) {
		this.moving = bool;
	}

	this.setMiddleX = function(middleX) {
		this.middleX = middleX;
	}

	this.setMiddleY = function(middleY) {
		this.middleY = middleY;
	}

	this.setXSpeed = function(xSpeed) {
		this.xSpeed = xSpeed;
	}

	this.setYSpeed = function(ySpeed) {
		this.ySpeed = ySpeed;
	}


	this.show = function(c, gravity) {
		c.fillStyle = "#999999";
		c.fillRect(this.middleX - this.width / 2, this.middleY - this.height / 2, this.width, this.height);

		c.fillStyle = "#323851";
		c.beginPath();
		c.arc(this.middleX, this.middleY, this.width / 3, 0, 2 * Math.PI);
		c.fill();
		c.stroke();
	}

	this.applyGravity = function(gravity) {
		if (this.moving) {
			this.xSpeed += gravity.x;
			this.ySpeed += gravity.y;
		} else {
			this.middleX = Math.round((this.middleX - CELLWIDTH/2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH/2;
			this.middleY = Math.round((this.middleY - CELLWIDTH/2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH/2;
		}

		var maxSpeed = CELLWIDTH/3;
		if (this.xSpeed < -maxSpeed) {
			this.xSpeed = -maxSpeed;
		} else if (this.xSpeed > maxSpeed) {
			this.xSpeed = maxSpeed;
		}

		if (this.ySpeed < -maxSpeed) {
			this.ySpeed = -maxSpeed;
		} else if (this.ySpeed > maxSpeed) {
			this.ySpeed = maxSpeed;
		}

		this.lastGravity = gravity;
	}

	this.updateOnBodys = function(bodys) {
		if (!this.moving) {
			return;
		}
		for (var i = 0; i < bodys.length; i++) {
			if (!bodys[i].isMoving() && this.squaresInsideEachOther(bodys[i].getMiddleX(), bodys[i].getMiddleY(), bodys[i].getWidth(), bodys[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
				this.xSpeed = 0;
				this.ySpeed = 0;
				this.moving = false;

				do {
					if (this.lastGravity.going == "down") { //down
						this.middleY -= 1;
					} else if (this.lastGravity.going == "up") { //up
						this.middleY += 1;
					} else if (this.lastGravity.going == "right") { //right
						this.middleX -= 1;
					} else { //left
						this.middleX += 1;
					}

				} while (this.squaresInsideEachOther(bodys[i].getMiddleX(), bodys[i].getMiddleY(), bodys[i].getWidth(), bodys[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

				if (this.lastGravity.going == "down") { //down
					this.middleY += 1;
				} else if (this.lastGravity.going == "up") { //up
					this.middleY -= 1;
				} else if (this.lastGravity.going == "right") { //right
					this.middleX += 1;
				} else { //left
					this.middleX -= 1;
				}

				return;
			}
		}
	}

	this.updateOnOneways = function(oneways) {
		for (var i = 0; i < oneways.length; i++) {
			if (oneways[i].getBlockingDirection() == this.lastGravity.going) {

				if (this.lastGravity.going == "down") { //down
					if(oneways[i].getMiddleY() <= this.middleY){
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleY -= 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleY += 1;
						return;
					}
				} else if (this.lastGravity.going == "up") { //up
					if (oneways[i].getMiddleY() >= this.middleY) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleY += 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleY -= 1;
						return;
					}
				} else if (this.lastGravity.going == "right") { //right
					if (oneways[i].getMiddleX() <= this.middleX) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleX -= 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleX += 1;
						return;
					}
				} else { //left
					if (oneways[i].getMiddleX() >= this.middleX) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleX += 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleX -= 1;
						return;
					}
				}
			}
		}
	}

	this.update = function() {
		if (!this.moving) {
			return;
		}

		this.middleX += this.xSpeed;
		this.middleY += this.ySpeed;
	}

	this.squaresInsideEachOther = function(middleX1, middleY1, width1, height1, middleX2, middleY2, width2, height2) {
		return (
			this.pointInSquare(middleX1 - width1 / 2, middleY1 - height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 - width1 / 2, middleY1 + height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 + width1 / 2, middleY1 - height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 + width1 / 2, middleY1 + height1 / 2, middleX2, middleY2, width2, height2) ||

			this.pointInSquare(middleX2 - width2 / 2, middleY2 - height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 - width2 / 2, middleY2 + height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 + width2 / 2, middleY2 - height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 + width2 / 2, middleY2 + height2 / 2, middleX1, middleY1, width1, height1)
		);
	}

	this.pointInSquare = function(x, y, middleX, middleY, width, height) {
		return (middleX - width / 2 <= x && middleX + width / 2 >= x && middleY - height / 2 <= y && middleY + height / 2 >= y);
	}
}








function PathConstrainedBlock(middleX, middleY, width, height, vertical, constrainedFrom, constrainedTo) {
	this.middleX = middleX;
	this.middleY = middleY;
	this.width = width;
	this.height = height;

	this.xSpeed = 0;
	this.ySpeed = 0;

	this.moving = true;

	this.vertical = vertical; //boolean
	this.constrainedFrom = Math.round((constrainedFrom - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2;
	this.constrainedTo = Math.round((constrainedTo - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2;

	this.lastGravity = {
		x: 0,
		y: 1,
		up: "#00FFFF",
		down: "#FF0000",
		left: "#00FF00",
		right: "#0000FF",
	}


	this.isMoving = function() {
		return this.moving;
	}

	this.getMiddleX = function() {
		return this.middleX;
	}

	this.getMiddleY = function() {
		return this.middleY;
	}

	this.getWidth = function() {
		return this.width;
	}

	this.getHeight = function() {
		return this.height;
	}

	this.getXSpeed = function() {
		return this.xSpeed;
	}

	this.getYSpeed = function() {
		return this.ySpeed;
	}

	this.isVertical = function() {
		return this.vertical;
	}

	this.isHorizontal = function() {
		return !this.vertical;
	}

	this.getConstrainedFrom = function() {
		return this.constrainedFrom;
	}

	this.getConstrainedTo = function() {
		return this.constrainedTo;
	}


	this.setMoving = function(bool) {
		this.moving = bool;
	}

	this.setMiddleX = function(middleX) {
		this.middleX = middleX;
	}

	this.setMiddleY = function(middleY) {
		this.middleY = middleY;
	}

	this.setXSpeed = function(xSpeed) {
		this.xSpeed = xSpeed;
	}

	this.setYSpeed = function(ySpeed) {
		this.ySpeed = ySpeed;
	}

	this.setVertical = function(bool) {
		this.vertical = bool;
	}

	this.setConstrainedFrom = function(from) {
		this.constrainedFrom = from;
	}

	this.setConstrainedTo = function(to) {
		this.constrainedTo = to;
	}


	this.show = function(c, gravity) {

		if (this.vertical) {
			c.beginPath();
			c.moveTo(this.constrainedFrom, this.middleY);
			c.lineTo(this.constrainedTo, this.middleY);
			c.stroke();

			c.fillStyle = "#727891";
			c.beginPath();
			c.arc(this.constrainedFrom, this.middleY, 3, 0, 2 * Math.PI);
			c.fill();
			c.stroke();

			c.fillStyle = "#727891";
			c.beginPath();
			c.arc(this.constrainedTo, this.middleY, 3, 0, 2 * Math.PI);
			c.fill();
			c.stroke();
		} else {
			c.beginPath();
			c.moveTo(this.middleX, this.constrainedFrom);
			c.lineTo(this.middleX, this.constrainedTo);
			c.stroke();

			c.fillStyle = "#727891";
			c.beginPath();
			c.arc(this.middleX, this.constrainedFrom, 3, 0, 2 * Math.PI);
			c.fill();
			c.stroke();

			c.fillStyle = "#727891";
			c.beginPath();
			c.arc(this.middleX, this.constrainedTo, 3, 0, 2 * Math.PI);
			c.fill();
			c.stroke();
		}

		c.fillStyle = "#999999";
		c.fillRect(this.middleX - this.width / 2, this.middleY - this.height / 2, this.width, this.height);

		c.fillStyle = "#727891";
		c.beginPath();
		c.arc(this.middleX, this.middleY, this.width / 3, 0, 2 * Math.PI);
		c.fill();
		c.stroke();
	}

	this.applyGravity = function(gravity) {
		if (this.vertical) {
			if (gravity.going == "up" || gravity.going == "down") {
				this.moving = false;
			}
		} else {
			if (gravity.going == "left" || gravity.going == "right") {
				this.moving = false;
			}
		}

		if (this.moving) {
			if (this.vertical) {
				this.xSpeed += gravity.x;
				if (this.middleX < this.constrainedFrom) {
					this.middleX = this.constrainedFrom;
					this.moving = false;
					this.xSpeed = 0;
				} else if (this.middleX > this.constrainedTo) {
					this.middleX = this.constrainedTo;
					this.moving = false;
					this.xSpeed = 0;
				}
			} else {
				this.ySpeed += gravity.y;
				if (this.middleY < this.constrainedFrom) {
					this.middleY = this.constrainedFrom;
					this.moving = false;
					this.ySpeed = 0;
				} else if (this.middleY > this.constrainedTo) {
					this.middleY = this.constrainedTo;
					this.moving = false;
					this.ySpeed = 0;
				}
			}
		} else {
			this.middleX = Math.round((this.middleX - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2;
			this.middleY = Math.round((this.middleY - CELLWIDTH / 2) / CELLWIDTH) * CELLWIDTH + CELLWIDTH / 2;
		}

		var maxSpeed = CELLWIDTH/3;
		if (this.xSpeed < -maxSpeed) {
			this.xSpeed = -maxSpeed;
		} else if (this.xSpeed > maxSpeed) {
			this.xSpeed = maxSpeed;
		}

		if (this.ySpeed < -maxSpeed) {
			this.ySpeed = -maxSpeed;
		} else if (this.ySpeed > maxSpeed) {
			this.ySpeed = maxSpeed;
		}

		this.lastGravity = gravity;
	}

	this.updateOnBodys = function(bodys) {
		if (!this.moving) {
			return;
		}
		for (var i = 0; i < bodys.length; i++) {
			if (!bodys[i].isMoving() && this.squaresInsideEachOther(bodys[i].getMiddleX(), bodys[i].getMiddleY(), bodys[i].getWidth(), bodys[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
				this.xSpeed = 0;
				this.ySpeed = 0;
				this.moving = false;

				do {
					if (this.lastGravity.going == "down") { //down
						this.middleY -= 1;
					} else if (this.lastGravity.going == "up") { //up
						this.middleY += 1;
					} else if (this.lastGravity.going == "right") { //right
						this.middleX -= 1;
					} else { //left
						this.middleX += 1;
					}

				} while (this.squaresInsideEachOther(bodys[i].getMiddleX(), bodys[i].getMiddleY(), bodys[i].getWidth(), bodys[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

				if (this.lastGravity.going == "down") { //down
					this.middleY += 1;
				} else if (this.lastGravity.going == "up") { //up
					this.middleY -= 1;
				} else if (this.lastGravity.going == "right") { //right
					this.middleX += 1;
				} else { //left
					this.middleX -= 1;
				}

				return;
			}
		}
	}

	this.updateOnOneways = function(oneways) {
		for (var i = 0; i < oneways.length; i++) {
			if (oneways[i].getBlockingDirection() == this.lastGravity.going) {

				if (this.lastGravity.going == "down" && !this.vertical) { //down
					if (oneways[i].getMiddleY() <= this.middleY) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleY -= 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleY += 1;
						return;
					}
				} else if (this.lastGravity.going == "up" && !this.vertical) { //up
					if (oneways[i].getMiddleY() >= this.middleY) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleY += 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleY -= 1;
						return;
					}
				} else if (this.lastGravity.going == "right" && this.vertical) { //right
					if (oneways[i].getMiddleX() <= this.middleX) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleX -= 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleX += 1;
						return;
					}
				} else if (this.vertical) { //left
					if (oneways[i].getMiddleX() >= this.middleX) {
						continue;
					}
					if (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height)) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						this.moving = false;

						do {
							this.middleX += 1;
						} while (this.squaresInsideEachOther(oneways[i].getMiddleX(), oneways[i].getMiddleY(), oneways[i].getWidth(), oneways[i].getHeight(), this.middleX, this.middleY, this.width, this.height));

						this.middleX -= 1;
						return;
					}
				}
			}
		}
	}

	this.update = function() {
		if (!this.moving) {
			return;
		}

		this.middleX += this.xSpeed;
		this.middleY += this.ySpeed;
	}

	this.squaresInsideEachOther = function(middleX1, middleY1, width1, height1, middleX2, middleY2, width2, height2) {
		return (
			this.pointInSquare(middleX1 - width1 / 2, middleY1 - height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 - width1 / 2, middleY1 + height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 + width1 / 2, middleY1 - height1 / 2, middleX2, middleY2, width2, height2) ||
			this.pointInSquare(middleX1 + width1 / 2, middleY1 + height1 / 2, middleX2, middleY2, width2, height2) ||

			this.pointInSquare(middleX2 - width2 / 2, middleY2 - height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 - width2 / 2, middleY2 + height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 + width2 / 2, middleY2 - height2 / 2, middleX1, middleY1, width1, height1) ||
			this.pointInSquare(middleX2 + width2 / 2, middleY2 + height2 / 2, middleX1, middleY1, width1, height1)
		);
	}

	this.pointInSquare = function(x, y, middleX, middleY, width, height) {
		return (middleX - width / 2 <= x && middleX + width / 2 >= x && middleY - height / 2 <= y && middleY + height / 2 >= y);
	}
}








function OneWayGate(middleX, middleY, width, height, blockingDirection) {
	this.middleX = middleX;
	this.middleY = middleY;
	this.width = width;
	this.height = height;

	if (blockingDirection == "l") {
		this.blockingDirection = "left";
	} else if (blockingDirection == "u") {
		this.blockingDirection = "up";
	} else if (blockingDirection == "d") {
		this.blockingDirection = "down";
	} else {
		this.blockingDirection = "right";
	}

	this.isMoving = function() {
		return false;
	}

	this.getMiddleX = function() {
		return this.middleX;
	}

	this.getMiddleY = function() {
		return this.middleY;
	}

	this.getWidth = function() {
		return this.width;
	}

	this.getHeight = function() {
		return this.height;
	}

	this.getXSpeed = function() {
		return 0;
	}

	this.getYSpeed = function() {
		return 0;
	}

	this.getBlockingDirection = function() {
		return this.blockingDirection;
	}


	this.setMoving = function(bool) {

	}

	this.setMiddleX = function(middleX) {
		this.middleX = middleX;
	}

	this.setMiddleY = function(middleY) {
		this.middleY = middleY;
	}

	this.setXSpeed = function(xSpeed) {

	}

	this.setYSpeed = function(ySpeed) {

	}

	this.setBlockingDirection = function(blockingDirection) {
		this.blockingDirection = blockingDirection;
	}


	this.show = function(c) {
		if (this.blockingDirection == "left") {
			c.beginPath();  //wall
			c.moveTo(this.middleX + this.width / 2, this.middleY - this.height / 2);
			c.lineTo(this.middleX + this.width / 2, this.middleY + this.height / 2);
			c.stroke();

			c.beginPath();  //arrow
			c.moveTo(this.middleX + this.width / 3, this.middleY);
			c.lineTo(this.middleX + this.width / 6, this.middleY + this.height / 6);
			c.stroke();

			c.beginPath();
			c.moveTo(this.middleX + this.width / 3, this.middleY);
			c.lineTo(this.middleX + this.width / 6, this.middleY - this.height / 6);
			c.stroke();

			c.beginPath();
			c.moveTo(this.middleX + this.width / 3, this.middleY);
			c.lineTo(this.middleX - this.width / 3, this.middleY);
			c.stroke();
		} else if (this.blockingDirection == "up") {
			c.beginPath();  //wall
			c.moveTo(this.middleX - this.width / 2, this.middleY + this.height / 2);
			c.lineTo(this.middleX + this.width / 2, this.middleY + this.height / 2);
			c.stroke();
			
			c.beginPath();  //arrow
			c.moveTo(this.middleX, this.middleY + this.height/3);
			c.lineTo(this.middleX + this.width / 6, this.middleY + this.height / 6);
			c.stroke();

			c.beginPath();
			c.moveTo(this.middleX, this.middleY + this.height/3);
			c.lineTo(this.middleX - this.width / 6, this.middleY + this.height / 6);
			c.stroke();

			c.beginPath();
			c.moveTo(this.middleX, this.middleY + this.height/3);
			c.lineTo(this.middleX, this.middleY - this.height/3);
			c.stroke();
		} else if (this.blockingDirection == "down") {
			c.beginPath();  //wall
			c.moveTo(this.middleX - this.width / 2, this.middleY - this.height / 2);
			c.lineTo(this.middleX + this.width / 2, this.middleY - this.height / 2);
			c.stroke();
			
			c.beginPath();  //arrow
			c.moveTo(this.middleX, this.middleY - this.height/3);
			c.lineTo(this.middleX + this.width / 6, this.middleY - this.height / 6);
			c.stroke();

			c.beginPath();
			c.moveTo(this.middleX, this.middleY - this.height/3);
			c.lineTo(this.middleX - this.width / 6, this.middleY - this.height / 6);
			c.stroke();

			c.beginPath();
			c.moveTo(this.middleX, this.middleY - this.height/3);
			c.lineTo(this.middleX, this.middleY + this.height/3);
			c.stroke();
		} else {
			c.beginPath();  //wall
			c.moveTo(this.middleX - this.width / 2, this.middleY - this.height / 2);
			c.lineTo(this.middleX - this.width / 2, this.middleY + this.height / 2);
			c.stroke();
			
			c.beginPath();  //arrow
			c.moveTo(this.middleX - this.width / 3, this.middleY);
			c.lineTo(this.middleX - this.width / 6, this.middleY + this.height / 6);
			c.stroke();

			c.beginPath();
			c.moveTo(this.middleX - this.width / 3, this.middleY);
			c.lineTo(this.middleX - this.width / 6, this.middleY - this.height / 6);
			c.stroke();

			c.beginPath();
			c.moveTo(this.middleX - this.width / 3, this.middleY);
			c.lineTo(this.middleX + this.width / 3, this.middleY);
			c.stroke();
		}

	}

}








function Goal(middleX, middleY, width, height) {
	this.middleX = middleX;
	this.middleY = middleY;
	this.width = width;
	this.height = height;

	this.isMoving = function() {
		return false;
	}

	this.getMiddleX = function() {
		return this.middleX;
	}

	this.getMiddleY = function() {
		return this.middleY;
	}

	this.getWidth = function() {
		return this.width;
	}

	this.getHeight = function() {
		return this.height;
	}

	this.getXSpeed = function() {
		return 0;
	}

	this.getYSpeed = function() {
		return 0;
	}


	this.setMoving = function(bool) {

	}

	this.setMiddleX = function(middleX) {
		this.middleX = middleX;
	}

	this.setMiddleY = function(middleY) {
		this.middleY = middleY;
	}

	this.setXSpeed = function(xSpeed) {

	}

	this.setYSpeed = function(ySpeed) {

	}

	this.show = function(c) {
		c.fillStyle = "#004250";
		c.beginPath();
		c.moveTo(this.middleX - this.width / 2 - 3, this.middleY);
		c.lineTo(this.middleX, this.middleY - this.height / 2 - 3);
		c.lineTo(this.middleX + this.width / 2 + 3, this.middleY);
		c.lineTo(this.middleX, this.middleY + this.height / 2 + 3);
		c.lineTo(this.middleX - this.width / 2 - 3, this.middleY);
		c.fill();
		c.stroke();
	}

}







function Coin(middleX, middleY) {
	this.middleX = middleX;
	this.middleY = middleY;

	this.radius = 10;
	
	this.getMiddleX = function() {
		return this.middleX;
	}

	this.getMiddleY = function() {
		return this.middleY;
	}

	this.show = function(c) {
		c.fillStyle = "#FED500";
		c.beginPath();
		c.arc(this.middleX, this.middleY, this.radius, 0, 2 * Math.PI);
		c.fill();
	}
}







function Point(middleX, middleY) {
	this.middleX = middleX;
	this.middleY = middleY;

	this.radius = 2;
	
	this.getMiddleX = function() {
		return this.middleX;
	}

	this.getMiddleY = function() {
		return this.middleY;
	}

	this.show = function(c) {
		c.fillStyle = "#00BFBF";
		c.beginPath();
		c.arc(this.middleX, this.middleY, this.radius, 0, 2 * Math.PI);
		c.fill();
	}
}







