var canvas = document.querySelector('canvas');
var context =  canvas.getContext('2d');
var centerX = canvas.width/2;
var centerY = canvas.height/2;
var t = 0;

var orbContainer = [];
console.log(orbContainer);

orbContainer.splice(0, orbContainer.length);

function Orb(radius,color){
	this.radius = radius;
	this.color = color;
	orbContainer.push(this);
}

Orb.prototype.setAsAbsoluteObject = function(x,y){
	this.x = x;
	this.y = y;
};

Orb.prototype.setAsSatelite = function(orbMother, orbit){
	this.orbMother = orbMother;
	this.orbit = orbit;

	this.v = 0; //linear speed
	this.startPosition = 0;
};

Orb.prototype.setLinearSpeed = function(v){
	this.v = v;
};

Orb.prototype.shiftStartPosition = function(x){
	this.startPosition = x/180*Math.PI;
};

Orb.prototype.makeCirculationMotion = function(t){
	this.x = this.orbit * Math.sin(this.v / this.orbit * t + this.startPosition) + this.orbMother.x;
	this.y = this.orbit * Math.cos(this.v / this.orbit * t + this.startPosition) + this.orbMother.y;
};

Orb.prototype.draw = function(){
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	context.strokeStyle = this.color;
	context.fillStyle = this.color;
	context.fill();
	context.stroke();
};

var sun = new Orb(15, "yellow");
sun.setAsAbsoluteObject(centerX,centerY);

var mercury = new Orb(2, "grey");
mercury.setAsSatelite(sun,22);
mercury.shiftStartPosition(200);
mercury.setLinearSpeed(0.4);

var venus = new Orb(3, "brown");
venus.setAsSatelite(sun, 30);
venus.shiftStartPosition(200);
venus.setLinearSpeed(0.3);

var earth = new Orb(4,"blue");
earth.setAsSatelite(sun, 50);
earth.shiftStartPosition(140);
earth.setLinearSpeed(0.35);

var moon = new Orb(2,"grey");
moon.setAsSatelite(earth, 9);
moon.shiftStartPosition(0);
moon.setLinearSpeed(0.2);

var mars = new Orb(3,"red");
mars.setAsSatelite(sun, 72);
mars.shiftStartPosition(20);
mars.setLinearSpeed(0.4);

var marsMoon1 = new Orb(1,"grey");
mars.setAsSatelite(mars, 8);
mars.shiftStartPosition(20);
mars.setLinearSpeed(0.2);

var marsMoon2 = new Orb(1,"grey");
mars.setAsSatelite(mars, 11);
mars.shiftStartPosition(65);
mars.setLinearSpeed(0.25);

for(var i = 0; i < 20; ++i){
	var tempOrb = new Orb(1, "white");
	tempOrb.setAsSatelite(sun, 97);
	tempOrb.shiftStartPosition(Math.sqrt(i * 1000));
	tempOrb.setLinearSpeed(0.5);
}

var jupiter = new Orb(7, "orange");
jupiter.setAsSatelite(sun, 120);
jupiter.shiftStartPosition(-45);
jupiter.setLinearSpeed(0.4);

var jupiterMoon1 = new Orb(1, "blue");
jupiterMoon1.setAsSatelite(jupiter, 10);
jupiterMoon1.shiftStartPosition(-45);
jupiterMoon1.setLinearSpeed(0.2);

var jupiterMoon2 = new Orb(1, "blue");
jupiterMoon2.setAsSatelite(jupiter, 13);
jupiterMoon2.shiftStartPosition(110);
jupiterMoon2.setLinearSpeed(0.3);

var jupiterMoon3 = new Orb(1, "white");
jupiterMoon2.setAsSatelite(jupiter, 18);
jupiterMoon2.shiftStartPosition(30);
jupiterMoon2.setLinearSpeed(0.4);

var saturn = new Orb(7, "yellow");
saturn.setAsSatelite(sun, 150);
saturn.shiftStartPosition(70);
saturn.setLinearSpeed(0.5);

for(var i = 0; i<6; ++i){
    var tempMoon = new Orb(1, "red");
    tempMoon.setAsSatelite(saturn, 7);
    tempMoon.shiftStartPosition(i*60);
    tempMoon.setLinearSpeed(0.2);
}

var uran = new Orb(5, "blue");
uran.setAsSatelite(sun, 200);
uran.shiftStartPosition(-45);
uran.setLinearSpeed(0.6);

var uranMoon1 = new Orb(1, "blue");
uranMoon1.setAsSatelite(uran, 10);
uranMoon1.shiftStartPosition(150);
uranMoon1.setLinearSpeed(0.5);

var uranMoon2 = new Orb(1, "yellow");
uranMoon2.setAsSatelite(uran, 17);
uranMoon2.shiftStartPosition(0);
uranMoon2.setLinearSpeed(0.5);

var uranMoon3 = new Orb(1, "yellow");
uranMoon3.setAsSatelite(uran, 17);
uranMoon3.shiftStartPosition(180);
uranMoon3.setLinearSpeed(0.5);

var neptun = new Orb(4, "lightblue");
uran.setAsSatelite(sun, 250);
uran.shiftStartPosition(90);
uran.setLinearSpeed(0.5);

var plutonCenter = new Orb(0);
plutonCenter.setAsSatelite(sun, 300);
plutonCenter.shiftStartPosition(-45);
plutonCenter.setLinearSpeed(0.5);

var pluton1 = new Orb(1, "white");
pluton1.setAsSatelite(plutonCenter, 3);
pluton1.shiftStartPosition(0);
pluton1.setLinearSpeed(0.2);

var pluton2 = new Orb(1, "white");
pluton2.setAsSatelite(plutonCenter, 3);
pluton2.shiftStartPosition(180);
pluton2.setLinearSpeed(0.2);




window.requestAnimationFrame(start);

function start(){
	context.clearRect(0,0,canvas.width,canvas.height);
	orbContainer.map(function(orb){
		if(orb.hasOwnProperty('orbMother')){
			orb.makeCirculationMotion(t);
		}
		orb.draw();
	});
	++t;
	window.requestAnimationFrame(start);
}