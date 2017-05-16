class Disk {

	constructor(nameDisks, diameter, x, y) {
		this.nameDisks = nameDisks
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

	move(n, a, b, c) {
		if (n > 0) {
			this.move(n - 1, a, c, b)
			console.log(`Move disk ${n} from ${a} to ${c}`)
			this.data.push([diskArrInTower[n - 1].nameDisks, a, c])
			this.count++;
			this.move(n - 1, b, a, c)
		}
		return this.data
	}
}



let diskArr = [
	new Disk('disk1', 1),
	new Disk('disk2', 2),
	new Disk('disk3', 3),
	new Disk('disk4', 4),
	// new Disk('disk3', 5),
	// new Disk('disk4', 6)
]

let diskArrInTower = diskArr

let towerArr = [
	new Tower('towerA', diskArrInTower).tower(),
	new Tower('towerB', []).tower(),
	new Tower('towerC', []).tower()
]
let game = new GameEngine()


let w = $('.container').width()
let h = $('.container').height()
let biggest_d = w / 4;
let m = biggest_d + biggest_d / 2;
let unitPerFloor = biggest_d / diskArr.length
let towerHeight = towerArr.length * 40


let svg = d3.select('.container')
	.append('svg')
	.attr('width', w)
	.attr('height', h)


function drawTowerAndDisk() {


	for (var j = 1; j <= towerArr.length; j++) {
		svg.append('rect')
			.attr('x', (j - 1) * m + biggest_d / 2 - 5)
			.attr('y', 40)
			.attr('width', 10)
			.attr('height', (diskArr.length + 1) * 40)
			.attr('fill', 'teal')
			.attr('class', 'tower')
	}

	for (var j = 1; j <= diskArr.length; j++) {
		svg.append('rect')
			.attr('x', (diskArr.length - j) * (unitPerFloor / 2))
			.attr('y', (j + 1) * 40)
			.attr('width', j * unitPerFloor)
			.attr('height', 40)
			.attr('class', 'color disk' + j)
	}

	d3.selectAll('.color').style('fill', function() {
		return `hsl( ${Math.random() * 360}  ,100%,50%)`;
	});
}

drawTowerAndDisk()



let data = game.move(diskArrInTower.length, towerArr[0].name, towerArr[1].name, towerArr[2].name)
console.log(`${game.count} moves`)

console.log(data)

for (var i = 0; i < data.length; i++) {

}


d3.selectAll('.disk1')
	.transition()
	.delay(2000)
	.duration(1000)
	.attr('y', 0)
	.transition()
	.attr('x', 600)
	.transition()
	.attr('y', 200)