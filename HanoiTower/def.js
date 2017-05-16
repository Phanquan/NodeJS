class Disk {

	constructor(nameDisks, diameter, x, y, height) {
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
			console.log(`Move disk ${n} from ${a.name} to ${c.name}`)
			this.data.push([diskArrInTower[n - 1], a, c])
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

const n = diskArr.length

let diskArrInTower = diskArr

let towerArr = [
	new Tower('towerA', diskArrInTower).tower(),
	new Tower('towerB', []).tower(),
	new Tower('towerC', []).tower()
]

let game = new GameEngine()


function drawTowerAndDisk() {

	let svg = d3.select('.container')
		.append('svg')
		.attr('width', 1800)
		.attr('height', 500)


	for (var j = 1; j <= diskArr.length; j++) {
		svg.append('rect')
			.attr('x', (diskArr.length - j) * 25 + 100)
			.attr('y', j * 50 + 100)
			.attr('width', j * 50)
			.attr('height', 50)
			.attr('class', 'color disk' + j)

		diskArr[j - 1].x_ = 0
		diskArr[j - 1].y_ = j * 50
		diskArr[j - 1].height = j * 50 + 70
	}

	d3.selectAll('.color').style('fill', function() {
		return `hsl( ${Math.random() * 360}  ,100%,50%)`;
	});

	console.log(diskArr)
}

drawTowerAndDisk()



let data = game.move(diskArrInTower.length, towerArr[0], towerArr[1], towerArr[2])
console.log(`${game.count} moves`)

console.log(data)



let get_distance = (dis1, dis2) => {
	if ((dis1 === "towerA" && dis2 === "towerB") || (dis1 === "towerB" && dis2 === "towerC")) {
		return 400;
	} else if ((dis1 === "towerB" && dis2 === "towerA") || (dis1 === "towerC" && dis2 === "towerB"))
		return -400;
	else if ((dis1 === "towerA" && dis2 === "towerC")) {
		return 800;
	} else return -800;
}


let update_disk = (name, t1, t2) => {
	t1.arrDisk.shift();
	t2.arrDisk.unshift(name);
}


for (var i = 0; i < data.length; i++) {
	let x = get_distance(data[i][1].name, data[i][2].name)
	let begin_y = data[i][0].y_
	let begin_x = data[i][0].x_
	let count_disk = data[i][2].arrDisk.length
	let new_y = n * 50 - (count_disk * 50) - begin_y
	let hoz = begin_x + x
	let height = -data[i][0].height
	update_disk(data[i][0], data[i][1], data[i][2])
	d3.selectAll('.' + data[i][0].nameDisks)
		.transition()
		.delay(i * 3000)
		.duration(1000)
		.attr("transform", 'translate(' + begin_x + ',' + height + ')')
		.transition()
		.attr("transform", 'translate(' + hoz + ',' + height + ')')
		.transition()
		.attr('transform', 'translate(' + hoz + ',' + new_y + ')')

	data[i][0].x_ += x
}