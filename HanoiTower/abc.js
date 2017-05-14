class Tower {

	constructor(id,diskNum, name, arrDisk, towerOrdinate) {
		this.id = id
		this.name = name
		this.arrDisk = arrDisk
		this.towerOrdinate = towerOrdinate
	}
}
class Disk {
	constructor(id,towerNum, name, diskOrdinate) {
		this.id = id
		this.name = name
		this.diskOrdinate = diskOrdinate
	}
}

class Engine {
	constructor() {
			this.count = 0
		}
		moveDisks(){

		}
}


let datasetOfDisk = [
	new Disk('d0',0, 'disk1', [30, 300]),
	new Disk('d1',1, 'disk2', [30, 200]),
	new Disk('d2',2, 'disk3', [30, 100])
]

let datasetOfTower = [
	new Tower('t1',0, 'towerA', datasetOfDisk, [150, 500]),
	new Tower('t1',1, 'towerB', [], [100, 500]),
	new Tower('t1',2, 'towerC', [], [50, 500])
]

// let engine = new Engine()


// console.log(`${engine.count} moves`)

const h = 500;
const w = 1000;
const barSpace = 10;

// const svg =
// 	d3.select('body')
// 	.append('svg')
// 	.attr('width', w)
// 	.attr('height', h)

const divWarp =
	d3.select('body')
		// .append('div')
		// .attr('class','container')
		// .style('width',1000)
		// .style('height',750)

// let towerRender = svg.selectAll('tower')
// 	.data(datasetOfTower)
// 	.enter()
// 	.append('rect')
// 	.attr('class', 'tower')
// 	.attr('x', function(d, i) {
// 		// console.log(d.towerOrdinate[1])
// 		return i * (w / datasetOfTower.length)
// 	})
// 	.attr('y', function(d) {
// 		// console.log(d.towerOrdinate[1])
// 		return h - d.towerOrdinate[1]
// 	})
// 	.attr('width', w / datasetOfTower.length - barSpace)
// 	.attr('height', function(d) {
// 		return d.towerOrdinate[1]
// 	})
// 	.attr('fill', 'pink')
// 	.exit().remove()

// let diskRender = svg.selectAll('disk')
// 	.data(datasetOfDisk)
// 	.enter()
// 	.append('rect')
// 	.attr('class', 'disks')
// 	.attr('x', function(d, i) {
// 		// console.log(d.diskOrdinate)
// 		// return d.diskOrdinate[1]
// 		return 0
// 	})
// 	.attr('y', function(d, i) {
// 		// console.log(d)
// 		return h - (i + 1) * d.diskOrdinate[0]
// 	})
// 	.attr('width', function(d) {
// 		return d.diskOrdinate[1]
// 	})
// 	.attr('height', function(d) {
// 		return d.diskOrdinate[0]
// 	})
// 	.attr('fill', 'yellow')
	

// 	diskRender
// 	.transition()
// 	.delay(1000)
// 		.attr('y',function (d,i) {
// 			console.log(i)
// 			return 0
// 		})


// let towerRender = divWarp
// 	.selectAll('div')
// 	.data(datasetOfTower)
// 	.enter()
// 		.append('div')
// 		.attr('class','tower')
// 		.attr('x',function (d) {
// 			console.log(d)
// 		})
// 	.exit()
	
let diskRender = 	d3.select('body')
	.select('div')
	.selectAll('div')	
	.data(datasetOfTower.arrDisk)
	.enter()
	// .enter()
	// 	.append('div')
	// 	.attr('class','disk')





function move(n, a, b, c) {
	if (n > 0) {
		move(n - 1, a, c, b)
		console.log(`Move disk ${n} from ${a.name} to ${c.name}`)



		move(n - 1, b, a, c)
	}
}

function animation() {

}

move(datasetOfDisk.length, datasetOfTower[0], datasetOfTower[1], datasetOfTower[2])