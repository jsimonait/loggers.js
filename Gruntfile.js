'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
     pkg: grunt.file.readJSON('package.json'),
     banner: '/*! Loggers.js - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n'+
         '* @author: jsimonait <jsimonait@gmail.com> */ \n',
    // Task configuration.
    clean: {
      src: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/loggers.js'],
        dest: 'dist/loggers.js'
      },
    },
    uglify: {
      options: {
         banner: '<%= banner %>',
      },
      my_target: {
        files: {
          'dist/loggers.min.js': ['src/loggers.js']
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['clean', 'concat', 'uglify']);

};
