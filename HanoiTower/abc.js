class Disk {

	constructor(diameter) {
		this.diameter = diameter
	}

	disk() {
		return this.diameter
	}
}


class Tower {
	constructor(nameTowers, arrDisk) {
		this.name = nameTowers
		this.arrDisk = arrDisk
	}

	tower() {
		return {
			name: this.name,
			arrDisk: this.arrDisk
		}
	}


}


class GameEngine {
	constructor() {
		this.data = []
		this.count = 0
	}

	takeDisk(a, c) {

	}

	move(n, a, b, c) {
		if (n > 0) {
			this.move(n - 1, a, c, b)
			console.log(`Move disk ${n} from ${a.name} to ${c.name}`)
			console.log(a.arrDisk)
			console.log(b.arrDisk)
			console.log(c.arrDisk)
			let x = a.arrDisk.pop()
			c.arrDisk.push(x)
			console.log(a.arrDisk)
			console.log(b.arrDisk)
			console.log(c.arrDisk)
			console.log()

			this.count++
				this.move(n - 1, b, a, c)
		}
	}
}



let diskArr = [
	// new Disk(4),
	new Disk(3),
	new Disk(2),
	new Disk(1)
]

let diskArrInTower = diskArr

let towerArr = [
	new Tower('towerA', diskArrInTower),
	new Tower('towerB', []),
	new Tower('towerC', [])
]
let game = new GameEngine()


let w = $('.container').width()
let h = $('.container').height()
let biggest_d = w / 4;
let m = biggest_d + biggest_d / 2;
let unit = biggest_d / towerArr.length
let towerHeight = towerArr.length * 40


let svg = d3.select('.container')
	.append('svg')
	.attr('width', w)
	.attr('height', h)


function drawTowerAndDisk() {


	for (var j = 1; j <= towerArr.length; j++) {
		svg.append('rect')
			.attr('x', j * m + (biggest_d / 2) - 10)
			.attr('y', 40)
			.attr('width', 10)
			.attr('height', (diskArr.length + 1) * 40)
			.attr('fill', 'teal')
			.attr('class', 'tower')
	}

	for (var j = 1; j <= diskArr.length; j++) {
		svg.append('rect')
			.attr('x', (diskArr.length - j) * (unit / 2))
			.attr('y', (j + 1) * 40)
			.attr('width', j * unit)
			.attr('height', 40)
			.attr('class', 'disks')
	}

	d3.selectAll(".disks").style("fill", function() {
		return "hsl(" + Math.random() * 360 + ",100%,50%)";
	});
}

drawTowerAndDisk()


// game.move(diskArrInTower.length, towerArr[0], towerArr[1], towerArr[2])
// console.log(`${game.count} moves`)