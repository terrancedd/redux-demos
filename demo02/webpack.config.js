module.exports={
	entry:'./src/index.js',
	output:{
		filename:'bundle.js'
	},

	module:{
	  loaders:[
	  	{
		test:/\.js[x]?$/,
		exclude: /node_modules/,
		loader:'babel-loader?presets=[]=latest&presets[]=react&plugins[]=transform-object-rest-spread&plugins[]=transform-es2015-modules-commonjs',
	  	},
	  ]
    }
};