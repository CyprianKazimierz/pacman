//Seleccionem l'etiqueta canvas
const canvas = document.querySelector('canvas');
//
const punts = document.querySelector('#punts');
//
const vides = document.querySelector('#vides');
//li donem la propietat 2d
const c = canvas.getContext('2d');

// seleccionem tota l'amplade de la finestra
canvas.width = 1400;
//selecionem tota l'alçada de la finestra
canvas.height = 840;

//creem una propietat per el mapa
// class = es una plantilla per crear objectes
class Boundary {
	static width = 40;
	static height = 40;
	//constructor = es un metode especial per crear i inicialitzar objectes creats a partir d'una classe,
	//amb el this.x = x podem despres fer var  hola = new x("adeu"); i en el this.x = x li hem posat adeu.
	constructor({ position, image }) {
		this.position = position;
		this.width = 40;
		this.height = 40;
		this.image = image;
	}
	draw() {
		c.drawImage(this.image, this.position.x, this.position.y);
	}
}
var comprovar = false;
var boundaries = [];
const keys = {
	w: { pressed: false },
	s: { pressed: false },
	d: { pressed: false },
	a: { pressed: false },
};
let lastkey = '';
let puntuacio = 0;
let oportunitats = 3;
let map = [
	['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',   '2'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.', '.', '.',  '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.', '.', 'p',   '|'],
	['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', 'b', '.', '[', '7', ']', '.', 'b', '.',   '|'],
	['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', 'p', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
	['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.',  '|'],
	['|', '.', '.', '.', '.', '^', '.', '.', '.', '.',  '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.',  '.', '.', '.', '^', '.', '.', '.', '.', '|'],
	['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.',  'b', '.', '[', '+', ']', '.', 'b', '.', 'b', '.', '[', '+', ']', '.', 'b', '.',  'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
	['|', '.', '.', '.', '.', '_', '.', '.', '.', '.',  '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.',  '.', '.', '.', '_', '.', '.', '.', '.', '|'],
	['|', '.', '[', ']', '.', '.', '.', '[', ']', '.',  '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.',  '[', ']', '.', '.', '.', '[', ']', '.',  '|'],
	['|', '.', '.', '.', '.', '^', '.', '.', '.', '.',  '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.',  '.', '.', '.', '^', '.', '.', '.', '.','|'],
	['|', '.', 'b', '.', '[', '+', ']', '.', 'b', 'p',  'b', '.', '[', '+', ']', '.', 'b', '.', 'b', '.', '[', '+', ']', '.', 'b', 'p',  'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
	['|', '.', '.', '.', '.', '_', '.', '.', '.', '.',  '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.',  '.', '.', '.', '_', '.', '.', '.', '.', '|'],
	['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.',  '|'],
	['|', '.', '.', '.', '.', '^', '.', '.', '.', '.',  '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.',  '.', '.', '.', '^', '.', '.', '.', '.', '|'],
	['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.',  'b', '.', '[', '+', ']', '.', 'b', '.', 'b', '.', '[', '+', ']', '.', 'b', '.',  'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
	['|', '.', '.', '.', '.', '_', '.', '.', '.', '.',  '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.',  '.', '.', '.', '_', '.', '.', '.', '.', '|'],
	['|', '.', '[', ']', '.', '.', '.', '[', ']', '.',  '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.',  '[', ']', '.', '.', '.', '[', ']', '.',  '|'],
	['|', '.', '.', '.', '.', '^', '.', '.', '.', '.',  '.', '.', '.', '^', '.', '.', '.', 'p', '.', '.', '.', '^', '.', '.', '.', '.',  '.', '.', '.', '^', '.', '.', '.', '.','|'],
	['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.',  'b', '.', '[', '5', ']', '.', 'b', '.', 'b', '.', '[', '5', ']', '.', 'b', '.',  'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
	['|', 'p', '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.', '.', '.',  '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.', '.', 'p',   '|'],
	['4', '-', '-', '-', '-', '-', '-', '-', '-', '-',  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',  '-', '-', '-', '-', '-', '-', '-', '-', '3'],
];
let Finalround = [
	['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',   '2'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.', '.', '.',  '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '[', ']', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '[', ']', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '[', ']', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', 'p', '[', ']', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',   '|'],
	['4', '-', '-', '-', '-', '-', '-', '-', '-', '-',  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',  '-', '-', '-', '-', '-', '-', '-', '-', '3'],
];
function crearImatges(src) {
	const image = new Image();
	image.src = src;
	return image;
}
class player {
	constructor({ position, velocity }) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 15;
		this.radians = 0.75;
		this.boca = 0.032;
		this.rotacio = 0;
		this.timeMovingInDirection = 0;
        this.maxTimeMovingInDirection = 60; // Suposem que canviarà a una altra direcció després de 60 quadres (frames)
        // ...
	}
	draw() {
		c.save();
		c.translate(this.position.x, this.position.y);
		c.rotate(this.rotacio);
		c.translate(-this.position.x, -this.position.y);
		
		//beginPath = permet dibuixar i crear dibuixos per separat, perque sino ho feria tot junt.
		c.beginPath();
		//l'arc s'utilitza amb el canvas i permet descriure com es dibuixara ( posicio centre, radio, angel inicial, direccio...)
		c.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians);
		c.lineTo(this.position.x, this.position.y)
		c.fillStyle = 'yellow';
		c.fill();
		c.closePath();
		c.restore();
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if(this.radians < 0 || this.radians > .75) this.boca = -this.boca
		this.radians += this.boca
		//millorar alhora de girar amb velocitat
		
		if (this.velocity.x !== 0 || this.velocity.y !== 0) {
            this.timeMovingInDirection++;
        } else {
            this.timeMovingInDirection = 0;
        }
	}
}
class Fantasma {
	static speed = 1;
	constructor({ position, velocity, color = 'red' }) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 15;
		this.color = color;
		this.colisioAnterior = [];
		this.speed = 1;
		this.scared = false;
	}
	draw() {
		//beginPath = permet dibuixar i crear dibuixos per separat, perque sino ho feria tot junt.
		c.beginPath();
		//l'arc s'utilitza amb el canvas i permet descriure com es dibuixara ( posicio centre, radio, angel inicial, direccio...)
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = this.scared ? 'blue' : this.color;
		c.fill();
		c.closePath();
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if (this.position.x < 0 || this.position.x > canvas.width || this.position.y < 0 || this.position.y > canvas.height) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = -this.velocity.y;
		}
	}
	
	
}
class Pellet {
	constructor({ position }) {
		this.position = position;
		this.radius = 3;
	}
	draw() {
		//beginPath = permet dibuixar i crear dibuixos per separat, perque sino ho feria tot junt.
		c.beginPath();
		//l'arc s'utilitza amb el canvas i permet descriure com es dibuixara ( posicio centre, radio, angel inicial, direccio...)
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = 'white';
		c.fill();
		c.closePath();
	}
}
class SuperPoder {
	constructor({ position }) {
		this.position = position;
		this.radius = 8;
	}
	draw() {
		//beginPath = permet dibuixar i crear dibuixos per separat, perque sino ho feria tot junt.
		c.beginPath();
		//l'arc s'utilitza amb el canvas i permet descriure com es dibuixara ( posicio centre, radio, angel inicial, direccio...)
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = 'white';
		c.fill();
		c.closePath();
	}
}
const pellets = [];
const superpoder = [];
const fantasma = [
		new Fantasma({
			position: {
				x: Boundary.width * 9 + Boundary.width / 2,
				y: Boundary.height * 3 + Boundary.height / 2,
			},
			velocity: {
				x: Fantasma.speed,
				y: 0,
			},
			
		}),
	
	new Fantasma({
		position: {
			x: Boundary.width * 9 + Boundary.width / 2,
			y: Boundary.height * 13 + Boundary.height / 2,
		},
		velocity: {
			x: Fantasma.speed,
			y: 0,
		},
		color: 'pink',
	}),
	new Fantasma({
		position: {
			x: Boundary.width * 25 + Boundary.width / 2,
			y: Boundary.height * 3 + Boundary.height / 2,
		},
		velocity: {
			x: Fantasma.speed,
			y: 0,
		},
		color: 'orange',
	}),
	new Fantasma({
		position: {
			x: Boundary.width * 32 + Boundary.width / 2,
			y: Boundary.height * 13 + Boundary.height / 2,
		},
		velocity: {
			x: Fantasma.speed,
			y: 0,
		},
		color: 'yellow',
	}),
	new Fantasma({
		position: {
			x: Boundary.width * 17 + Boundary.width / 2,
			y: Boundary.height * 13 + Boundary.height / 2,
		},
		velocity: {
			x: Fantasma.speed,
			y: 0,
		},
		color: 'green',
	}),
];
const Player = new player({
	position: {
		x: Boundary.width + Boundary.width / 2,
		y: Boundary.height + Boundary.height / 2,
	},
	velocity: {
		x: 0,
		y: 0,
	},
});
function tornarAnimacio() {
	requestAnimationFrame(animation);
	
    // Restableix només la posició i velocitat del jugador i dels fantasmes
    Player.position.x = Boundary.width + Boundary.width / 2;
    Player.position.y = Boundary.height + Boundary.height / 2;
    Player.velocity.x = 0;
    Player.velocity.y = 0;
	//vermell
    fantasma[0].position.x = Boundary.width * 9 + Boundary.width / 2;
    fantasma[0].position.y = Boundary.height * 3 + Boundary.height / 2;
	//rosa
    fantasma[1].position.x = Boundary.width * 9 + Boundary.width / 2;
    fantasma[1].position.y = Boundary.height * 13 + Boundary.height / 2;
	//taronja
	fantasma[2].position.x = Boundary.width * 25 + Boundary.width / 2;
    fantasma[2].position.y = Boundary.height * 3 + Boundary.height / 2;
	//groc
	fantasma[3].position.x = Boundary.width * 32 + Boundary.width / 2;
    fantasma[3].position.y = Boundary.height * 13 + Boundary.height / 2;
	//verd
	fantasma[4].position.x = Boundary.width * 17 + Boundary.width / 2;
    fantasma[4].position.y = Boundary.height * 13 + Boundary.height / 2;
	setTimeout(function(){fantasmes.velocity.x=2;
		fantasmes.velocity.y=2;},1000)
	
	colision();
}
function animacioFinal(){
	setTimeout(function(){requestAnimationFrame(animation)},2000);
	
	
    // Restableix només la posició i velocitat del jugador i dels fantasmes
    Player.position.x = Boundary.width + Boundary.width / 2;
    Player.position.y = Boundary.height + Boundary.height / 2;
    Player.velocity.x = 0;
    Player.velocity.y = 0;
	//vermell
    fantasma[0].position.x = Boundary.width * 7 + Boundary.width / 2;
    fantasma[0].position.y = Boundary.height * 3 + Boundary.height / 2;
	//rosa
    fantasma[1].position.x = Boundary.width * 11 + Boundary.width / 2;
    fantasma[1].position.y = Boundary.height * 10 + Boundary.height / 2;
	//taronja
	fantasma[2].position.x = Boundary.width * 25 + Boundary.width / 2;
    fantasma[2].position.y = Boundary.height * 6 + Boundary.height / 2;
	//groc
	fantasma[3].position.x = Boundary.width * 31 + Boundary.width / 2;
    fantasma[3].position.y = Boundary.height * 15 + Boundary.height / 2;
	//verd
	fantasma[4].position.x = Boundary.width * 3 + Boundary.width / 2;
    fantasma[4].position.y = Boundary.height * 18 + Boundary.height / 2;
	setTimeout(function(){fantasmes.velocity.x=2;
		fantasmames.velocity.y=2;},1000)
	
	colision();
}


//
console.log(comprovar)
if(comprovar == false){
	dibuixarMapa();
}
function dibuixarMapa(){
	//boundaries = [];
	console.log(boundaries)
	map.forEach((row, column) => {
		row.forEach((symbol, amplada) => {
			switch (symbol) {
				case '-':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/pipeHorizontal.png'),
						}),
					);
					break;
				case '|':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/pipeVertical.png'),
						}),
					);
					break;
				case '1':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/pipeCorner1.png'),
						}),
					);
					break;
				case '2':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/pipeCorner2.png'),
						}),
					);
					break;
				case '3':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/pipeCorner3.png'),
						}),
					);
					break;
				case '4':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/pipeCorner4.png'),
						}),
					);
					break;
				case 'b':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/block.png'),
						}),
					);
					break;
				case '[':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/capLeft.png'),
						}),
					);
					break;
				case ']':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/capRight.png'),
						}),
					);
					break;
				case '_':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/capBottom.png'),
						}),
					);
					break;
				case '^':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/capTop.png'),
						}),
					);
					break;
				case '+':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/pipeCross.png'),
						}),
					);
					break;
				case '5':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							color: 'blue',
							image: crearImatges('./img/pipeConnectorTop.png'),
						}),
					);
					break;
				case '6':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							color: 'blue',
							image: crearImatges('./img/pipeConnectorRight.png'),
						}),
					);
					break;
				case '7':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							color: 'blue',
							image: crearImatges('./img/pipeConnectorBottom.png'),
						}),
					);
					break;
				case '8':
					boundaries.push(
						new Boundary({
							position: {
								x: Boundary.width * amplada,
								y: Boundary.height * column,
							},
							image: crearImatges('./img/pipeConnectorLeft.png'),
						}),
					);
					break;
				case '.':
					pellets.push(
						new Pellet({
							position: {
								x: amplada * Boundary.width + Boundary.width / 2,
								y: column * Boundary.height + Boundary.height / 2,
							},
						}),
					);
					break;
				case 'p':
					superpoder.push(
						new SuperPoder({
							position: {
								x: amplada * Boundary.width + Boundary.width / 2,
								y: column * Boundary.height + Boundary.height / 2,
							},
						}),
					);
					break;
			}
		});
	});
}

function colision({ circle, rectangle }) {
	const padding = Boundary.width / 2 - circle.radius - 1;
	return (
		circle.position.y - circle.radius + circle.velocity.y <=
            rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.radius + circle.velocity.x >=
            rectangle.position.x - padding &&
        circle.position.y + circle.radius + circle.velocity.y >=
            rectangle.position.y - padding &&
        circle.position.x - circle.radius + circle.velocity.x <=
            rectangle.position.x + rectangle.width + padding
	);
	const additionalPadding = 3; 
    padding += additionalPadding; 
}
// forEach() = recorre tot els elements dun array i executa una funcio per cada element. (no es reutilitzable)
let animacioId;
function animation() {
	animacioId = requestAnimationFrame(animation);
	c.clearRect(0, 0, canvas.width, canvas.height);

	if (keys.w.pressed && lastkey == 'w') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				colision({
					circle: {
						...Player,
						velocity: {
							x: 0,
							y: -2,
						},
					},
					rectangle: boundary,
				})
			) {
				Player.velocity.y = 0;
				break;
			} else {
				Player.velocity.y = -2;
			}
		}
	} else if (keys.a.pressed && lastkey == 'a') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				colision({
					circle: {
						...Player,
						velocity: {
							x: -2,
							y: 0,
						},
					},
					rectangle: boundary,
				})
			) {
				Player.velocity.x = 0;
				break;
			} else {
				Player.velocity.x = -2;
			}
		}
	} else if (keys.s.pressed && lastkey == 's') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				colision({
					circle: {
						...Player,
						velocity: {
							x: 0,
							y: 2,
						},
					},
					rectangle: boundary,
				})
			) {
				Player.velocity.y = 0;
				break;
			} else {
				Player.velocity.y = 2;
			}
		}
	} else if (keys.d.pressed && lastkey == 'd') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				colision({
					circle: {
						...Player,
						velocity: {
							x: 2,
							y: 0,
						},
					},
					rectangle: boundary,
				})
			) {
				Player.velocity.x = 0;
				break;
			} else {
				Player.velocity.x = 2;
			}
		}
	}
	//colisio jugador fantasmes
	for (let i = fantasma.length - 1; 0 <= i; i--) {
		const fantasmes = fantasma[i];
		if (
			Math.hypot(
				fantasmes.position.x - Player.position.x,
				fantasmes.position.y - Player.position.y,
			) <
			fantasmes.radius + Player.radius 
		) {
			if(fantasmes.scared){
				fantasma.splice(i,1);
			} else{
				
				cancelAnimationFrame(animacioId);
				oportunitats--;
				vides.innerHTML = oportunitats;
				isFrozen = true;
       
				if (oportunitats > 0) {
					setTimeout(function(){tornarAnimacio()},3000)
					
					
				} else {
					cancelAnimationFrame(animacioId);
					document.getElementById('gameover').innerHTML = 'GAME OVER';
					clearInterval(timer);
				}
			}
			break;
		}
	}
	//superpoder pacman
	for (let i = superpoder.length - 1; 0 <= i; i--) {
		const SuperPoder = superpoder[i];
		SuperPoder.draw();
		//jugador colisiona amb el superpoder
		if (
			Math.hypot(
				SuperPoder.position.x - Player.position.x,
				SuperPoder.position.y - Player.position.y,
			) <
			SuperPoder.radius + Player.radius
		){
			superpoder.splice(i, 1);
			puntuacio += 30;
			punts.innerHTML = puntuacio;
			fantasma.forEach(fantasmes =>{
				fantasmes.scared = true;
				
				setTimeout(()=> {
					fantasmes.scared = false;
					
				},25000)

			})
		}
	}
	// pilotes
	for (let i = pellets.length - 1; 0 <= i; i--) {
		const pellet = pellets[i];
		pellet.draw();

		if (
			Math.hypot(
				pellet.position.x - Player.position.x,
				pellet.position.y - Player.position.y,
			) <
			pellet.radius + Player.radius
		) {
			pellets.splice(i, 1);
			puntuacio += 10;
			punts.innerHTML = puntuacio;
		}
	}

	boundaries.forEach(boundary => {
		boundary.draw();
		if (colision({ circle: Player, rectangle: boundary })) {
			Player.velocity.x = 0;
			Player.velocity.y = 0;
		}
	});
	//guannyar mentjant'to tot
	if (pellets.length === 0 && superpoder.length === 0) {
		if (comprovar) {
			setTimeout(function(){cancelAnimationFrame(animacioId)},50)
			document.getElementById('gameover').innerHTML = 'DEFINITIVAMENT HAS GUANYAT';
			setTimeout(function(){document.querySelector("#gameover").innerHTML= "Ets un Crack!";},3000)
			clearInterval(timer);
		} else {
			comprovar = true;
			document.querySelector("#gameover").innerHTML= "Creus que has gaunyat?";
			setTimeout(function(){document.querySelector("#gameover").innerHTML= "";},3000)    
			c.clearRect(0, 0, canvas.width, canvas.height);
			setTimeout(function(){cancelAnimationFrame(animacioId)},50)
			
			boundaries= [];
			map = Finalround;
			dibuixarMapa();
			animacioFinal();
		}
	}else if (fantasma.length === 0){	

		function crearfantasmes(){
		if (fantasma.length < 5) {
			const colors = ['green', 'red', 'orange', 'yellow', 'pink'];
			for (let i = 0; i < 1; i++) {
				const fantasmanou = new Fantasma({
					position: {
						x: Boundary.width * 17 + Boundary.width / 2,
						y: Boundary.height * 13 + Boundary.height / 2,
					},
					velocity: {
						x: Fantasma.speed,
						y: 0,
					},
					color: colors[0],
				});
				const fantasmanou2 = 
				new Fantasma({
					position: {
						x: Boundary.width * 25 + Boundary.width / 2,
						y: Boundary.height * 3 + Boundary.height / 2,
					},
					velocity: {
						x: Fantasma.speed,
						y: 0,
					},
					color: colors[1],
				});
			
			const fantasmanou3 = 
				new Fantasma({
					position: {
						x: Boundary.width * 32 + Boundary.width / 2,
						y: Boundary.height * 13 + Boundary.height / 2,
					},
					velocity: {
						x: Fantasma.speed,
						y: 0,
					},
					color: colors[2],
				});
				const fantasmanou4 = 
				new Fantasma({
					position: {
						x: Boundary.width * 13 + Boundary.width / 2,
						y: Boundary.height * 14 + Boundary.height / 2,
					},
					velocity: {
						x: Fantasma.speed,
						y: 0,
					},
					color: colors[3],
				});
				
				const fantasmanou5 = 
				new Fantasma({
					position: {
						x: Boundary.width * 9 + Boundary.width / 2,
						y: Boundary.height * 13 + Boundary.height / 2,
					},
					velocity: {
						x: Fantasma.speed,
						y: 0,
					},
					color: colors[4],
				});
				fantasma.push(fantasmanou,fantasmanou2,fantasmanou3,fantasmanou4,fantasmanou5);
			}
			colision();
		}	}
		crearfantasmes();

	}

	Player.update();
	fantasma.forEach(fantasmes => {
		fantasmes.update();

		
		
		const collisions = [];
		boundaries.forEach(boundary => {
			if (
				!collisions.includes('right') &&
				colision({
					circle: {
						...fantasmes,
						velocity: {
							x: fantasmes.speed,
							y: 0,
						},
					},
					rectangle: boundary,
				})
			) {
				collisions.push('right');
			}
			if (
				!collisions.includes('left') &&
				colision({
					circle: {
						...fantasmes,
						velocity: {
							x: -fantasmes.speed,
							y: 0,
						},
					},
					rectangle: boundary,
				})
			) {
				collisions.push('left');
			}
			if (
				!collisions.includes('up') &&
				colision({
					circle: {
						...fantasmes,
						velocity: {
							x: 0,
							y: -fantasmes.speed,
						},
					},
					rectangle: boundary,
				})
			) {
				collisions.push('up');
			}
			if (
				!collisions.includes('down') &&
				colision({
					circle: {
						...fantasmes,
						velocity: {
							x: 0,
							y: fantasmes.speed,
						},
					},
					rectangle: boundary,
				})
			) {
				collisions.push('down');
			}
		});
		if (collisions.length > fantasmes.colisioAnterior.length)
			fantasmes.colisioAnterior = collisions;

		if (
			JSON.stringify(collisions) !== JSON.stringify(fantasmes.colisioAnterior)
		) {
			if (fantasmes.velocity.x > 0) {
				fantasmes.colisioAnterior.push('right');
			} else if (fantasmes.velocity.x < 0) {
				fantasmes.colisioAnterior.push('left');
			} else if (fantasmes.velocity.y < 0) {
				fantasmes.colisioAnterior.push('up');
			} else if (fantasmes.velocity.y > 0) {
				fantasmes.colisioAnterior.push('down');
			}
			const direccio = fantasmes.colisioAnterior.filter(collision => {
				return !collisions.includes(collision);
			});
			
			const movimentFantasma =
				direccio[Math.floor(Math.random() * direccio.length)];

			switch (movimentFantasma) {
				case 'down':
					fantasmes.velocity.y = fantasmes.speed;
					fantasmes.velocity.x = 0;
					break;
				case 'up':
					fantasmes.velocity.y = -fantasmes.speed;
					fantasmes.velocity.x = 0;
					break;
				case 'right':
					fantasmes.velocity.y = 0;
					fantasmes.velocity.x = fantasmes.speed;
					break;
				case 'left':
					fantasmes.velocity.y = 0;
					fantasmes.velocity.x = -fantasmes.speed;
					break;
			}
			fantasmes.colisioAnterior = [];
		}
	});
	//rotació del jugador
	if(Player.velocity.x > 0) Player.rotacio = 0
	else if(Player.velocity.x < 0) Player.rotacio = Math.PI
	else if(Player.velocity.y < 0) Player.rotacio = Math.PI * 1.5
	else if(Player.velocity.y > 0) Player.rotacio = Math.PI / 2
}
animation();

//Afegim moviment al jugador w,s,a,d
addEventListener('keydown', ({ key }) => {
	switch (key) {
		case 'w':
			keys.w.pressed = true;
			lastkey = 'w';
			Player.velocity.y -= 0.3
			break;
		case 's':
			
			keys.s.pressed = true;
			lastkey = 's';
			Player.velocity.y += 0.3
			break;
		case 'a':
			keys.a.pressed = true;
			lastkey = 'a';
			break;
		case 'd':
			keys.d.pressed = true;
			lastkey = 'd';
			break;
	}
});
addEventListener('keyup', ({ key }) => {
	switch (key) {
		case 'w':
			keys.w.pressed = false;
			break;
		case 's':
			keys.s.pressed = false;
			break;
		case 'a':
			keys.a.pressed = false;
			break;
		case 'd':
			keys.d.pressed = false;
			break;
	}
});
// extres
function resetejar(){
	document.querySelector("button").addEventListener("click", function(){
		window.location.reload();
	});
}
let timer;
let time = 0;

function startTimer() {
    timer = setInterval(updateDisplay, 1000);
}

function updateDisplay() {
    time++;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    document.getElementById("display").textContent =
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
}
