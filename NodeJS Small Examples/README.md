# NodeJS
## What are those things ?
NodeJS files using Caporal for help generation, colored output, verbosity control, custom logger, coercion and casting, typos suggestions, and auto-complete for bash/zsh/fish,etc...

## Help
Type this
```
node javascript-file-that-you-want-to-compile.js --help
```
## Current NodeJS exercises:
* **Recursive Listing Tree**  
    > File: RecursiveListingTree.js  
    > Usage:  
    >```
    >node RecursiveListingTree.js ListMe *your-path-here*
    >```  
    > Result:
    >```
    >*your-path-here* : /Users/bluevn/Desktop/abc
    >├── .DS_Store
    >├── a-2.js
    >├── a.html
    >└── folder-1
    >   ├── .DS_Store
    >   ├── folder-2-a
    >   |   ├── .DS_Store
    >   |   ├── a.html
    >   |   └── b.html
    >   ├── folder-2-b
    >   |   ├── .DS_Store
    >   |   ├── b.css
    >   |   ├── b.html
    >   |   └── b.js
    >   └── folder-2-c
    >       └── folder-2-c-a
    >           └── c.html
    >```
    
* **Permutation Array**  
    > File: PermutationArray.js    
    > Usage:  
    >```
    >node PermutationArray.js Permute --p *your-array-that-was-joinned-by-','*
    >```  
    > Example:  
    >```
    >node PermutationArray.js Permute --p 1,2,3
    >```
    > Result:  
    >```
    > [ [ '1', '2', '3' ],
    >   [ '1', '3', '2' ],
    >   [ '2', '1', '3' ],
    >   [ '2', '3', '1' ],
    >   [ '3', '1', '2' ],
    >   [ '3', '2', '1' ] ]
    >```
* **Drawing Diamonds**  
    > File: drawDiamond.js  
    > Usage:  
    >```
    >node drawDiamond.js DrawMe *your-idea-number-of-diamonds* *your-idea-height-of-diamond*
    >```
    > Example:
    >```
    >node drawDiamond.js DrawMe 5 13
    >```
    > Result:  
    >      *           *           *           *           *      
    >     * *         * *         * *         * *         * *     
    >    *   *       *   *       *   *       *   *       *   *    
    >   *     *     *     *     *     *     *     *     *     *   
    >  *       *   *       *   *       *   *       *   *       *  
    > *         * *         * *         * *         * *         * 
    >*           *           *           *           *           *
    > *         * *         * *         * *         * *         * 
    >  *       *   *       *   *       *   *       *   *       *  
    >   *     *     *     *     *     *     *     *     *     *   
    >    *   *       *   *       *   *       *   *       *   *    
    >     * *         * *         * *         * *         * *     
    >      *           *           *           *           *      
