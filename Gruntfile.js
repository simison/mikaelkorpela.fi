module.exports = function(grunt) {

  var // HTML templates
      templates = {
          'build/index.html':                   'src/views/index.html',
          'build/partials/me.html':             'src/views/partials/me.html',
          'build/partials/cv.html':             'src/views/partials/cv.html',
          'build/partials/blog.html':           'src/views/partials/blog.html',
          'build/partials/portfolio.html':      'src/views/partials/portfolio.html',
          'build/partials/portfolio-card.html': 'src/views/partials/portfolio-card.html',
          'build/partials/volunteering.html':   'src/views/partials/volunteering.html',
      };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    templates: templates,
    watch: {
      js: {
        files: [
          'src/js/*',
          'src/js/controllers/*',
          'src/js/directives/*',
          'Gruntfile.js',
        ],
        tasks: [
          'concat'
          //'uglify'
        ]
      },
      less: {
        files: [
          'src/less/*'
        ],
        tasks: [
          'less:dev'
        ]
      },
      html: {
        files: [
          'src/views/*',
          'src/views/partials/*',
        ],
        tasks: [
          'preprocess:dev'
        ]
      },
      files: {
        files: [
          'src/img/*',
          'src/portfolio/*',
          'src/audio/*',
          'src/font/*',
          'src/favicon.ico',
          'src/.htaccess',
          'src/robots.txt',
        ],
        tasks: [
          'copy'
        ]
      }
    },
    preprocess : {
      options: {
        context : {
          NAME: 'Mikael Korpela',
          AUTHOR: '<%= pkg.author %>',
          VERSION: '<%= pkg.version %>',
          CACHEBUSTER: '<%= grunt.template.today("mdhMs") %>',
          DESCRIPTION: '<%= pkg.description %>',
          OG_IMG: 'assets/img/mikael-korpela-avatar.jpg',
          HOMEPAGE: '<%= pkg.homepage %>',
          GIT: '<%= pkg.repository.url %>',
          BUGS: '<%= pkg.bugs.url %>',
          FB_APP_ID: '105522896143570',
          FB_ADMINS: '600923739',
          LANG: 'en',
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


      app : {
        src: [
          'src/vendor/jquery/jquery.js',
          'src/vendor/angular/angular.js',
          'src/vendor/angular-animate/angular-animate.js',
          'src/vendor/angular-sanitize/angular-sanitize.js',
          'src/vendor/angular-route/angular-route.js',
          'src/vendor/angular-deckgrid/angular-deckgrid.js',
          'src/vendor/flexslider/jquery.flexslider.js',
          'src/vendor/angular-flexslider/angular-flexslider.js',
          'src/vendor/angular-ui-utils/modules/keypress/keypress.js',
          'src/js/app.js',
          'src/js/configs.js',
          'src/js/controllers/*',
          'src/js/directives/*',
        ],
        dest: 'build/assets/js/app.js'
      },
      ie : {
        src: [
          'src/vendor/html5shiv/dist/html5shiv.js',
        ],
        dest: 'build/assets/js/ie.js'
      }
    },
    uglify: {
      options: {
        mangle: false, // Angular doesn't like mangling...
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      app: {
        files: {
          'build/assets/js/app.min.js': ['build/assets/js/app.js']
        }
      },
      ie: {
        files: {
          'build/assets/js/ie.min.js': ['build/assets/js/ie.js']
        }
      }
    },
    copy: {
      main: {
        files: [
            {
                expand: true,
                flatten: true,
                src: ['src/portfolio/*'],
                dest: 'build/assets/portfolio/',
                filter: 'isFile'
            },
            {
                expand: true,
                flatten: true,
                src: ['src/font/*'],
                dest: 'build/assets/font/',
                filter: 'isFile'
            },
            {
                expand: true,
                flatten: true,
                src: ['src/audio/*'],
                dest: 'build/assets/audio/',
                filter: 'isFile'
            },
            {
                expand: true,
                flatten: true,
                src: ['src/img/*'],
                dest: 'build/assets/img/',
                filter: 'isFile'
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
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html':                 'build/index.html',
          'build/partials/me.html':           'build/partials/me.html',
          'build/partials/cv.html':           'build/partials/cv.html',
          'build/partials/blog.html':         'build/partials/blog.html',
          'build/partials/portfolio.html':    'build/partials/portfolio.html',
          'build/partials/volunteering.html': 'build/partials/volunteering.html',
        }
      }
    },
    fontello: {
      dist: {
        options: {
            config  : 'src/fontello-config.json',
            zip     : 'src/vendor/',
            fonts   : 'build/assets/font',
            styles  : 'src/vendor/fontello-css/',
            scss    : false,
            force   : true
        }
      }
    },
    htmlSnapshot: {
      all: {
        options: {
          snapshotPath: 'build/snapshots/',
          sitePath: 'http://dev.mikaelkorpela.fi/',//<%= pkg.homepage %>
          fileNamePrefix: '_',
          msWaitForPages: 1000,
          sanitize: function(requestUri) {
            return requestUri.replace(/\//g, '').replace(/#!\//g, '');
          },
          urls: [
            '/',
            '/blog',
            '/cv',
            '/portfolio',
            '/volunteering',
          ]
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-html-snapshot');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-fontello');


  grunt.registerTask('prod', [
                       'preprocess:prod',
                       'less:prod',
                       'concat',
                       'uglify',
                       'htmlmin',
                       'htmlSnapshot'
                     ]);

  grunt.registerTask('dev', [
                       'preprocess:dev',
                       'less:dev',
                       'concat',
                       'watch'
                     ]);

  grunt.registerTask('build', [
                       'fontello',
                       'preprocess:prod',
                       'less:prod',
                       'concat',
                       'uglify',
                       'copy',
                       'htmlmin',
                       'htmlSnapshot'
                     ]);

    // Default task
    grunt.registerTask('default', 'build');

};
