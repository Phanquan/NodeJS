const fs = require('fs')
const path = require('path')
const prog = require('caporal')

prog
    .version('1.0.0')
    .command('Permute','Command to Permute the input Array')
    .option('--p <array>','the input array,example : 1,2,3',prog.LIST)
    .action(function (args,options) {
        // console.log(options.p)
        const permutator = (inputArr) => {
            let result = []
            const permute = (arr, m = []) => {
                if (arr.length === 0) {
                    result.push(m)
                } else {
                    for (let i = 0; i < arr.length; i++) {
                        let curr = arr.slice()
                        let next = curr.splice(i, 1)
                        permute(curr.slice(), m.concat(next))
                    }
                }
            }

            permute(inputArr)

            return result

        }
        console.log(permutator(options.p))
    })

prog.parse(process.argv);