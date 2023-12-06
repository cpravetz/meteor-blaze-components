Package.describe({
  name: 'seakaytee:blaze-components',
  summary: "Reusable components for Blaze",
  version: '0.23.0',
  git: 'https://github.com/peerlibrary/meteor-blaze-components.git'
});

// Based on meteor/packages/templating/package.js.
Package.registerBuildPlugin({
  name: "compileBlazeComponentsTemplatesBatch",
  use: [
    'caching-html-compiler',
    'ecmascript',
    'templating-tools',
    'spacebars-compiler',
    'html-tools'
  ],
  sources: [
    'patch-compiling.js',
    'compile-templates.js'
  ]
});

Package.onUse(function (api) {
   api.versionsFrom(['METEOR@1.8.1','2.3']);

  // Core dependencies.
  api.use([
    'blaze',
    'coffeescript',
    'babel-runtime',
    'underscore',
    'tracker',
    'reactive-var',
    'ejson',
    'spacebars',
    'jquery'
  ]);

  // If templating package is among dependencies, we want it to be loaded before
  // us to not override our augmented functions. But we cannot make a real dependency
  // because of a plugin conflict (both us and templating are registering a *.html plugin).
  api.use([
    'templating'
  ], {weak: true});

  api.imply([
    'meteor',
    'blaze',
    'spacebars'
  ]);

  api.use('isobuild:compiler-plugin@1.0.0');

  // Internal dependencies.
  api.use([
    'seakaytee:base-component'
  ]);

  // 3rd party dependencies.
  api.use([
    'peerlibrary:assert@0.3.0',
    'peerlibrary:reactive-field@0.6.0',
    'peerlibrary:computed-field@0.10.0',
    'peerlibrary:data-lookup@0.3.0'
  ]);

  api.export('Template');
  api.export('BlazeComponent');
  // TODO: Move to a separate package. Possibly one with debugOnly set to true.
  api.export('BlazeComponentDebug');

  api.addFiles([
    'template.coffee',
    'compatibility/templating.js',
    'compatibility/dynamic.html',
    'compatibility/dynamic.js',
    'compatibility/lookup.js',
    'compatibility/attrs.js',
    'compatibility/materializer.js',
    'lib.coffee',
    'debug.coffee'
  ]);

  api.addFiles([
    'client.coffee'
  ], 'client');

  api.addFiles([
    'server.coffee'
  ], 'server');
});

Package.onTest(function (api) {
   //api.VersionsFrom('METEOR@1.8.1');

  // Core dependencies.
  api.use([
    'coffeescript',
    'jquery',
    'reactive-var',
    'underscore',
    'tracker',
    'ejson',
    'random'
  ]);

  // Internal dependencies.
  api.use([
    'peerlibrary:blaze-components'
  ]);

  // 3rd party dependencies.
  api.use([
    'peerlibrary:classy-test@0.4.0',
    'peerlibrary:reactive-field@0.6.0',
    'peerlibrary:assert@0.3.0'
  ]);

  api.addFiles([
    'tests/tests.html',
    'tests/tests.coffee',
    'tests/tests.js',
    'tests/tests.es2015.js',
    'tests/tests.css'
   ]);
});
