module.exports =  function(grunt) {
	grunt.initConfig({

		cssmin:{
			target:{
				files:[{
					expand:true,
					cwd:"public/css/",
					src:["*.css", "!*.min.css"],
					dest:"public/css/",
					ext:".min.css"
				}]
			}
		},

		uglify:{
			option:{
				manage: false,
				mangle: false,
			},
			my_target:{
				files:{
					"public/js/script.min.js":["public/js/script.js"]
				}
			}
		},

		jshint:{
			files:["*.js", "public/js/script.js"],
			options:{
				globals:{
					jQuery: true
				}
			}
		},

		watch:{
			cssmin:{
				files:["public/css/style.css"],
				tasks:["cssmin"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("mincss", ["cssmin"]);
	grunt.registerTask("minjs", ["uglify"]);
	grunt.registerTask("jslint", ["jshint"]);
	grunt.registerTask("gruntwatch", ["watch"]);
};
