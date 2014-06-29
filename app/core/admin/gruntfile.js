module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initCofig({
        sass: {
            admin: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'static/dist/css/admin.css': 'sass/admin.scss'
                }
            }
        },
        jshint: {
            beforeConcat: ['gruntfile.js', 'js/**/*.js'],
            afterConcat: ['static/js/**/*.js']
        },
        concat: {
            src: ['js/bootstrapper.js', 'js/admin/**/*.js', 'js/startup.js'],
            dest: 'dist/admin.js',
        },
        jasmine: {
            admin: {
              src: 'js/**/*.js',
              options: {
                specs: 'spec/**/*Spec.js',
                helpers: 'spec/**/*Helper.js'
              }
            }
        },
        watch: {
            scripts: {
                files: ['js/**/*.js', 'sass/**/*.scss'],
                tasks: [],
                options: {
                  spawn: false,
                  livereload: true,
                  delay: 200
                }
            }
        }
    });

    grunt.registerTask('default', ['sass', 'jshint:beforeConcat', 'jasmine', 'concat', 'jshint:afterConcat']);
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('build', ['sass', 'concat']);


};