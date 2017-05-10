/**
 * Created by phanquan on 5/8/17.
 */
let count=0;
function move(n, a, b, c) {
    if (n > 0) {
        move(n-1, a, c, b);
        console.log("Move disk " + n +  " from " + a + " to " + c);
        move(n-1, b, a, c);
        count++
    }
}
move(3, "A", "B", "C");
console.log('Number of Move: ' + count)