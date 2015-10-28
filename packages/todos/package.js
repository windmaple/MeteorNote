Package.describe({
  name: 'todos',
  version: '0.0.1',
  summary: 'Todo collection'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'aldeed:collection2@2.5.0']);
  api.addFiles('todos.js');
  api.export('Todos');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('todos');
  api.addFiles('todos-tests.js');
});