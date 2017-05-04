const prog = require('caporal');
prog
    .version('1.0.0')
    .command('order pizza')
    .option('--number <num>', 'Number of pizza', prog.INT, 1)
    .option('--kind <kind>', 'Kind of pizza', /^margherita|hawaiian$/)
    .option('--discount <amount>', 'Discount offer', prog.FLOAT)
    .option('--add-ingredients <ingredients>','abc', prog.ARRAY)
    .action(function(args, options) {
        // options.kind = 'margherita'
        console.log(typeof (options.number))
        console.log(typeof (options.addIngredients))
        console.log(typeof (options.discount))
    });

prog.parse(process.argv);