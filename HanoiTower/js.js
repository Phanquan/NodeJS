class Disk {
	constructor(nameDisks, diameter) {
		this.name = nameDisks
		this.diameter = diameter
	}
}

class Tower {
	constructor(nameTowers, arrDisk) {
		this.name = nameTowers
		this.arrDisk = arrDisk
	}

}

class GameEngine {
	constructor() {
		this.data = []
		this.count = 0
		this.steps = {}
	}
	move(n, a, b, c) {
		if (n > 0) {
			this.move(n - 1, a, c, b)
			console.log(`Move disk ${n} from ${a.name} to ${c.name}`)
				//push the disk and fromTower,toTower objects into the data.
				this.steps.diskToPick = diskArr[n - 1]
				this.steps.fromTower = a
				this.steps.toTower = c
			this.data.push(this.steps)
			this.count++;
			this.move(n - 1, b, a, c)
		}
		return this.data
	}
}

//function to draw the disks
const drawTowerAndDiskAndAnimation = () => {
	//the p of object d3 svg
	let p = {
		svgWidth: 1200,
		svgHieght: 400,
		diskHeight: 50,
		disNearestTower: 400,
		disFurthestTower: 800,
		animationDelay: 3000,
		animationDuration: 1000
	}

	// draw the parent svg
	let svg = d3.select('.container')
		.append('svg')
		.attr('width', p.svgWidth)
		.attr('height', p.svgHieght)

	//draw the disks with the length of disks array
	for (var j = 1; j <= n; j++) {
		svg.append('rect')
			.attr('x', (n - j) * p.diskHeight / 2 + p.diskHeight * 2)
			.attr('y', j * p.diskHeight + 2 * p.diskHeight)
			.attr('width', j * p.diskHeight)
			.attr('height', p.diskHeight)
			.attr('class', 'color disk' + j)

		//set the co-ordinate (x,y) and the height for the object disks
		diskArr[j - 1].x_ = 0
		diskArr[j - 1].y_ = j * p.diskHeight
		diskArr[j - 1].height = j * p.diskHeight
	}

	//set random colors for the disks
	d3.selectAll('.color').style('fill', function() {
		return `hsl( ${Math.random() * 360}  ,100%,50%)`
	});

	//get the distance between towers
	let get_distance = (dis1, dis2) => {
		switch (true) {
			case (dis1 === "towerA" && dis2 === "towerB") || (dis1 === "towerB" && dis2 === "towerC"):
				return p.disNearestTower
			case (dis1 === "towerB" && dis2 === "towerA") || (dis1 === "towerC" && dis2 === "towerB"):
				return -p.disNearestTower
			case (dis1 === "towerA" && dis2 === "towerC"):
				return p.disFurthestTower
			default:
				return -p.disFurthestTower
		}
	}

	//update the disks array in tower after being moved
	let update_disk = (disk, t1, t2) => {
		t1.arrDisk.shift()
		t2.arrDisk.unshift(disk)
	}

	//animate the disks
	for (var i = 0; i < data.length; i++) {
		let x = get_distance(data[i].fromTower.name, data[i].toTower.name) // x = distence between the fromTower and the toTower
		let begin_x = data[i].diskToPick.x_ //get the x_ of object disk (data[i][0])
		let begin_y = data[i].diskToPick.y_ //get the y_ of object disk (data[i][0])
		let countDisks = data[i].toTower.arrDisk.length // get the number of disks in the toTower (data[i][2])
		let new_x = begin_x + x //set the new x_ (destination) for the disk
		let new_y = n * p.diskHeight - (countDisks * p.diskHeight) - begin_y //set the new y_ for the disk
		let height = -data[i].diskToPick.height //set the direction to move the disk,minus for up,plus for down

		//update the current disks on each towers
		update_disk(data[i].diskToPick, data[i].fromTower, data[i].toTower)

		//the actual animation
		d3.selectAll('.' + data[i].diskToPick.name)
			.transition()
			.delay(i * p.animationDelay)
			.duration(p.animationDuration)
			.attr('transform', 'translate(' + begin_x + ',' + height + ')')
			.transition()
			.attr('transform', 'translate(' + new_x + ',' + height + ')')
			.transition()
			.attr('transform', 'translate(' + new_x + ',' + new_y + ')')

		//update the x ordinate of the disks after being moved
		data[i].diskToPick.x_ += x
	}
}


//create the array of disks with the n disks
const n = 4
let diskArr = []
for (var i = 1; i <= n; i++) {
	diskArr.push(new Disk('disk' + i, i))
}

//create the array of towers
let towerArr = [
	new Tower('towerA', diskArr),
	new Tower('towerB', []),
	new Tower('towerC', [])
]

//main event
let game = new GameEngine()
let data = game.move(n, towerArr[0], towerArr[1], towerArr[2])
console.log(`${game.count} moves`)
console.log(data)

//draw the disks
drawTowerAndDiskAndAnimation()