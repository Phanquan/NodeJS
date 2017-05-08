# NodeJS  
## Caporal  
Using Caporal to get the input number to draw diamonds.  
## Help  
Type this to get informations:  
```
node javascript-file-that-you-want-to-compile.js --help
```
Type this to run the program:  
```
node drawDiamond.js DrawMe *your-input-number-of-diamonds-to-draw* *your-input-height-of-those-diamonds*
```
Example:  
```
node drawDiamond.js DrawMe 6 7
```
Result  
```
   *     *     *     *     *     *   
  * *   * *   * *   * *   * *   * *  
 *   * *   * *   * *   * *   * *   * 
*     *     *     *     *     *     *
 *   * *   * *   * *   * *   * *   * 
  * *   * *   * *   * *   * *   * *  
   *     *     *     *     *     *   

```

## Draw Diamonds
* The Program contains 2 loops that draw the diamonds:
    >Loop for-i to draw them Horizontally  
    >Loop for-j to draw them Vertically  
* Used 'process.stdout.write()' instead of 'console.log()':  
    >'console.log(something)' = 'process.stdout.write(something + "\n")' so that we can write '*' without the newline being created.  
    >Beware that using process.stdout.write() will disrupt the 'for' loops and completely diffrent from using str += 'somwthing'.Check it yourself.
