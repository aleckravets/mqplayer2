module.exports = {
    entry: {
        app: 'src/app/main.ts',
        // vendor: 'src/vendor.ts'
    },
    output: {
        filename: '[name].js'
    }
    ,
    loaders: [
        {
            test: /\.ts$/,
            loaders: 'ts'
        }
    ]
};