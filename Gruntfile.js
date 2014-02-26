module.exports = function(grunt) {

  var // HTML templates
      templates = {
          'build/index.html':               'src/views/index.html',
          'build/partials/home.html':       'src/views/partials/home.html',
          'build/partials/me.html':         'src/views/partials/me.html',
          'build/partials/cv.html':         'src/views/partials/cv.html',
          'build/partials/portfolio.html':  'src/views/partials/portfolio.html',
      };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    templates: templates,
    watch: {
      files: [
        'src/less/*',
        'src/js/*',
        'src/js/controllers/*',
        'src/views/*',
        'src/views/partials/*',
        'GruntFile.js',
      ],
      tasks: [
        'preprocess:dev',
        'less:dev',
        'concat',
      ]
    },
    preprocess : {
      options: {
        context : {
          NAME: '<%= pkg.name %>',
          AUTHOR: '<%= pkg.author %>',
          VERSION: '<%= pkg.version %>',
          CACHEBUSTER: '<%= grunt.template.today("mdhMs") %>',
          DESCRIPTION: '<%= pkg.description %>',
          OG_IMG: 'assets/img/mikael_korpela_avatar.jpg',
          HOMEPAGE: '<%= pkg.homepage %>',
          GIT: '<%= pkg.repository.url %>',
          BUGS: '<%= pkg.bugs.url %>',
        }
      },
      prod : {
        options: {
          context : {
            ENV : 'prod',
          }
        },
        files : templates
      },
      dev : {
        options: {
          context : {
            ENV : 'dev',
          }
        },
        files : templates
      }
    },
    less: {
      dev: {
        options: {
          paths: ['build/assets/css']
        },
        files: {
          'build/assets/css/app.css': 'src/less/app.less'
        }
      },
      prod: {
        options: {
          paths: ['build/assets/css'],
          cleancss: true
        },
        files: {
          'build/assets/css/app.min.css': 'src/less/app.less'
        }
      }
    },
    concat: {
      dist : {
        src: [
          'src/vendor/jquery/jquery.js',
          'src/vendor/angular/angular.js',
          'src/vendor/angular-animate/angular-animate.js',
          'src/vendor/angular-route/angular-route.js',
          'src/js/app.js',
          'src/js/configs.js',
          'src/js/controllers/me.js',
          'src/js/controllers/cv.js',
          'src/js/controllers/portfolio.js',
        ],
        dest: 'build/assets/js/app.js'
      }
    },
    uglify: {
      options: {
        mangle: false, // Angular doesn't like mangling...
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/assets/js/app.js',
        dest: 'build/assets/js/app.min.js'
      }
    },
    copy: {
      main: {
        files: [
            {
                src: 'src/img/mikael_korpela_avatar.jpg',
                dest: 'build/assets/img/mikael_korpela_avatar.jpg'
            },
            {
                src: 'src/img/albanian-mountains.jpg',
                dest: 'build/assets/img/albanian-mountains.jpg'
            },
            {
                src: 'src/.htaccess',
                dest: 'build/.htaccess'
            },
            {
                src: 'src/robots.txt',
                dest: 'build/robots.txt'
            },
            {
                src: 'src/favicon.ico',
                dest: 'build/favicon.ico'
            }

        ]
      },
    },


  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-preprocess');


  grunt.registerTask('prod', [
                       'preprocess:prod',
                       'less:prod',
                       'concat',
                       'uglify'
                     ]);

  grunt.registerTask('dev', [
                       'preprocess:dev',
                       'less:dev',
                       'concat',
                       'watch'
                     ]);

  grunt.registerTask('build', [
                       'preprocess:prod',
                       'less:prod',
                       'concat',
                       'uglify',
                       'copy'
                     ]);

    // Default task
    grunt.registerTask('default', 'build');

};
