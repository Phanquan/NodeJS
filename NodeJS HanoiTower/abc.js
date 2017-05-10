

class Disk{
    constructor(index,diameter){
        this._index = index;
        this._diameter = diameter;
    }
}

class Tower{
    constructor(name){
        this._name = name;
        this._disks = [];
    }


}

class GameEngine{
    constructor(){
        this.count = 0;
        this.str ='';
    }

    move(n, a, b, c) {
        if (n > 0) {
            this.move(n - 1, a, c, b);
            console.log('Move disk ' + n + ' from ' + a + ' to ' + c );
            this.move(n - 1, b, a, c);
            this.count++
        }

    }


}
let datasetOfDisks = [
    new Disk('0',40,20),
    new Disk('1',40,15),
    new Disk('2',40,10)

];

let datasetOfTower = [
    new Tower('TowerA'),
    new Tower('TowerB'),
    new Tower('TowerC')
];


let game = new GameEngine();
game.move(datasetOfDisks.length, datasetOfTower[0]._name, datasetOfTower[1]._name, datasetOfTower[2]._name);
console.log(game.count+' moves')








