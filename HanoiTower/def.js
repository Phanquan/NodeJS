"use strict";

class Disk {
	constructor(nameDisks, d) {
		this.name = nameDisks
		this.diameter = d

		//set the co-ordinate (x,y) and the height for the object disks
	}
	drawDisk(svgInput, attrX, attrY, attrWidth, attrHeight, attrClass, x_, y_, height) {
		svgInput.append('rect')
			.attr('x', attrX)
			.attr('y', attrY)
			.attr('width', attrWidth)
			.attr('height', attrHeight)
			.attr('class', attrClass)
		this.x_ = x_ //current ordinate x of disk
		this.y_ = y_ //current ordinate of y
		this.height = height //height actually shows how we pick up(minus) or down(plus) the disk
	}
}

class Tower {
	constructor(nameTowers, arrDisk) {
		this.name = nameTowers
		this.arrDisk = arrDisk
	}
	drawTower(svgInput, attrX1, attrY1, attrX2, attrY2) {
		//insert the following towers(lines) as the first-children of svg
		svgInput.insert('line', ':first-child')
			.attr('x1', attrX1)
			.attr('y1', attrY1)
			.attr('x2', attrX2)
			.attr('y2', attrY2)
			.attr('stroke-width', 10)
			.attr('stroke', 'black');
	}
}

class GameEngine {
	constructor() {
		this.count = 0 //to count the moves
		this.data = [] //main data
		this.step = {} //steps which describe the movement of the disks
	}

	//The Hanoi Towers algorithm
	move(n, a, b, c) {
		if (n > 0) {
			this.move(n - 1, a, c, b)
			console.log(`Move disk ${n} from ${a.name} to ${c.name}`);
			//push the the step object with disk,fromTower,toTower properties into the data.
			this.step = {
				diskToPick: diskArr[n - 1], //current disk
				fromTower: a, //fromTower
				toTower: c //toTower
			}
			this.data.push(this.step) //push the step
			this.count++; //cout the count
			this.move(n - 1, b, a, c)
		}
		return this.data //the data returned includes all the steps needed to complete the game
	}

	//get the distance between towers
	get_distance(tower1, tower2) {
		switch (true) {
			case (tower1 === 'tower1' && tower2 === 'tower2') || (tower1 === 'tower2' && tower2 === 'tower3'):
				return p.disNearestTower //return the distance between t1->t2 and t2->t3
			case (tower1 === 'tower2' && tower2 === 'tower1') || (tower1 === 'tower3' && tower2 === 'tower2'):
				return -p.disNearestTower //same as above,minus means the disks move backward
			case (tower1 === 'tower1' && tower2 === 'tower3'):
				return p.disFurthestTower //return the distance between t1->t3
			default:
				return -p.disFurthestTower //same as above,t3->t1,minus means the disks move backward
		}
	}

	//update the disks array in tower after the disks were moved
	update_disk(disk, t1, t2) {
		t1.arrDisk.pop() //pop the disk out of the fromTower
		t2.arrDisk.push(disk) //push the disk being moved into the toTower
	}

	//animation method
	animateDisk(diskLength, diskHeight, animationDelay, animationDuration) {
		for (var i = 0; i < this.data.length; i++) {
			//define new properties for  class GameEngine
			//distence between the fromTower and the toTower
			this.distenceBetweenTowers = this.get_distance(this.data[i].fromTower.name, this.data[i].toTower.name)
			this.begin_x = this.data[i].diskToPick.x_ //get the x_ of disk aka the starting x
			this.begin_y = this.data[i].diskToPick.y_ //get the y_ of disk aka the starting y
			this.countDisks = this.data[i].toTower.arrDisk.length // get the number of disks in the toTower 
			this.new_x = this.begin_x + this.distenceBetweenTowers //set the new x_ (destination) for the disk
			this.new_y = diskLength * diskHeight - (this.countDisks * diskHeight) - this.begin_y //set the new y_ for the disk
			this.pickUpHeight = -this.data[i].diskToPick.height //set the direction to move the disk,minus for up,plus for down

			//update the current disks on each towers
			this.update_disk(this.data[i].diskToPick, this.data[i].fromTower, this.data[i].toTower)

			//the actual animation
			d3.selectAll('.' + this.data[i].diskToPick.name)
				.transition()
				.delay(i * animationDelay)
				.duration(animationDuration)
				.attr('transform', 'translate(' + this.begin_x + ',' + this.pickUpHeight + ')')
				.transition()
				.attr('transform', 'translate(' + this.new_x + ',' + this.pickUpHeight + ')')
				.transition()
				.attr('transform', 'translate(' + this.new_x + ',' + this.new_y + ')')

			//update the x ordinate of the disks after being moved
			this.data[i].diskToPick.x_ += this.distenceBetweenTowers
		}
	}
}

//the p(properties) of object d3 svg
const p = {
		svgWidth: 1200,
		svgHieght: 600,
		diskHeight: 50,
		disNearestTower: 400,
		disFurthestTower: 800,
		towerBuffer: 100,
		animationDelay: 3000,
		animationDuration: 1000
	}
	// draw the parent svg
const svg = d3.select('.container')
	.append('svg')
	.attr('width', p.svgWidth)
	.attr('height', p.svgHieght)



//create the array of disks with the n disks
const n = 4
let diskArr = []


//create the array of towers and it's length
const m = 3
let towerArr = []

//button onclick event to draw

for (var j = 1; j <= n; j++) {
	//define a new Disk
	diskArr.push(new Disk('disk' + j, j))

	//draw the disk that was just defined
	diskArr[j - 1].drawDisk(
		svg, //svg argument
		(n - j) * p.diskHeight / 2 + p.diskHeight * 2, //.attr('x',
		j * p.diskHeight + 2 * p.diskHeight, //attr('y',
		j * p.diskHeight, //.attr('width',
		p.diskHeight, //.attr('height',
		'color disk' + j, //.attr('class',
		0, //diskArr[j - 1].x_
		j * p.diskHeight, //diskArr[j - 1].y_
		j * p.diskHeight + p.diskHeight //diskArr[j - 1].height 
	)
}
for (var j = 1; j <= m; j++) {
	//define new 3 towers
	if (j - 1 === 0) {
		towerArr.push(new Tower('tower' + j, diskArr)) // push the array of disks into the first tower
	} else {
		towerArr.push(new Tower('tower' + j, [])) //the rest towers dont have any disks 
	}

	//draw those towers
	towerArr[j - 1].drawTower(
		svg, //svg argument
		p.towerBuffer + (n * p.diskHeight) / 2, //attr x1
		120, //attr x2
		p.towerBuffer + (n * p.diskHeight) / 2, //attr y1
		n * p.diskHeight + 150 //attr y2
	)
	p.towerBuffer += 400 //increase the bufferzone between towers
}

//set random colors for the disks
d3.selectAll('.color').style('fill', function() {
	return `hsl( ${Math.random() * 360}  ,100%,50%)`
});



//button onlick event to move
//main event
let game = new GameEngine()
let data = game.move(n, towerArr[0], towerArr[1], towerArr[2])
console.log(`${game.count} moves`)
console.log(data)
	// start animation
game.animateDisk(n, p.diskHeight, p.animationDelay, p.animationDuration)