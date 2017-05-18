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
		this.x_ = x_
		this.y_ = y_
		this.height = height
	}
}

class Tower {
	constructor(nameTowers, arrDisk) {
		this.name = nameTowers
		this.arrDisk = arrDisk
	}
	drawTower(svgInput, attrX1, attrY1, attrX2, attrY2) {
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
		this.distenceBetweenTowers = 0
		this.begin_x_ = 0
		this.begin_y = 0
		this.countDisks = 0
		this.new_x = 0
		this.new_y = 0
		this.pickUpHeight = 0

	}
	move(n, a, b, c) {
		if (n > 0) {
			this.move(n - 1, a, c, b)
			console.log(`Move disk ${n} from ${a.name} to ${c.name}`);

			//push the the step object with disk,fromTower,toTower properties into the data.
			this.step = {
				diskToPick: diskArr[n - 1],
				fromTower: a,
				toTower: c
			}
			this.data.push(this.step)

			this.count++;
			this.move(n - 1, b, a, c)
		}
		return this.data
	}

	//get the distance between towers
	get_distance(tower1, tower2) {
		switch (true) {
			case (tower1 === 'tower1' && tower2 === 'tower2') || (tower1 === 'tower2' && tower2 === 'tower3'):
				return p.disNearestTower
			case (tower1 === 'tower2' && tower2 === 'tower1') || (tower1 === 'tower3' && tower2 === 'tower2'):
				return -p.disNearestTower
			case (tower1 === 'tower1' && tower2 === 'tower3'):
				return p.disFurthestTower
			default:
				return -p.disFurthestTower
		}
	}

	//update the disks array in tower after being moved
	update_disk(disk, t1, t2) {
		t1.arrDisk.shift()
		t2.arrDisk.unshift(disk)
	}

	//animation method
	animateDisk(diskLength,diskHeight,animationDelay,animationDuration) {
		for (var i = 0; i < data.length; i++) {
			this.distenceBetweenTowers = this.get_distance(data[i].fromTower.name, data[i].toTower.name) // x = distence between the fromTower and the toTower
			this.begin_x = data[i].diskToPick.x_ //get the x_ of object disk 
			this.begin_y = data[i].diskToPick.y_ //get the y_ of object disk 
			this.countDisks = data[i].toTower.arrDisk.length // get the number of disks in the toTower 
			this.new_x = this.begin_x + this.distenceBetweenTowers //set the new x_ (destination) for the disk
			this.new_y = diskLength * diskHeight - (this.countDisks * diskHeight) - this.begin_y //set the new y_ for the disk
			this.pickUpHeight = -data[i].diskToPick.height //set the direction to move the disk,minus for up,plus for down

			//update the current disks on each towers
			this.update_disk(data[i].diskToPick, data[i].fromTower, data[i].toTower)

			//the actual animation
			d3.selectAll('.' + data[i].diskToPick.name)
				.transition()
				.delay(i * animationDelay)
				.duration(animationDuration)
				.attr('transform', 'translate(' + this.begin_x + ',' + this.pickUpHeight + ')')
				.transition()
				.attr('transform', 'translate(' + this.new_x + ',' + this.pickUpHeight + ')')
				.transition()
				.attr('transform', 'translate(' + this.new_x + ',' + this.new_y + ')')

			//update the x ordinate of the disks after being moved
			data[i].diskToPick.x_ += this.distenceBetweenTowers
		}
	}
}

//the p of object d3 svg
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


//create the array of towers and it's length
const m = 3
let towerArr = []
for (var j = 1; j <= m; j++) {
	//define new 3 towers
	if (j - 1 === 0) {
		towerArr.push(new Tower('tower' + j, diskArr))
	} else {
		towerArr.push(new Tower('tower' + j, []))
	}

	//draw those towers
	towerArr[j - 1].drawTower(
		svg, //svg argument
		p.towerBuffer + (n * p.diskHeight) / 2, //attr x1
		120, //attr x2
		p.towerBuffer + (n * p.diskHeight) / 2, //attr y1
		n * p.diskHeight + 150 //attr y2
	)
	p.towerBuffer += 400
}

//set random colors for the disks
d3.selectAll('.color').style('fill', function() {
	return `hsl( ${Math.random() * 360}  ,100%,50%)`
});

//main event
let game = new GameEngine()
let data = game.move(n, towerArr[0], towerArr[1], towerArr[2])
console.log(`${game.count} moves`)
console.log(data)

// start animation
game.animateDisk(n,p.diskHeight,p.animationDelay,p.animationDuration)



