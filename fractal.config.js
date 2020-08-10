'use strict';

const path = require('path');
const uiLibRoot = __dirname + '/';
const fractal = (module.exports = require('@frctl/fractal').create());
const twigAdapter = require('@frctl/twig')({});

/*
 * PROJECT VARS
 */
fractal.set('project.title', 'Design Patterns');
fractal.set('project.version', 'v1.0');
fractal.set('project.repository', 'https://github.com/CNETContentSolutions/Pattern-Library/');
fractal.set('project.author', 'Valerie Mardorf');

/*
 * COMPONENT SETTINGS
 */
fractal.components.engine(twigAdapter);
fractal.components.set('default.preview', '@preview-list');
fractal.components.set('default.collator', function (markup, item) {
  return `<div class="col"><span ><!-- Start: @${item.handle} -->\n${markup}\n</span></div>\n`;
});
fractal.components.set('default.collated', true);
fractal.components.set('default.display', {'min-width': '290px'});
fractal.components.set('default.status', 'wip');
fractal.components.set('ext', '.twig');
fractal.components.set('label', 'Library');
fractal.components.set('path', uiLibRoot + '/src/components');
fractal.components.set('statuses', {
  prototype: {
    label: 'Stage',
    description: 'Do not implement',
    color: '#cc2222'
  },
  wip: {
    label: 'WIP',
    description: 'Work in progress. Implement with caution',
    color: '#ff7700'
  },
  ready: {
    label: 'Ready',
    description: 'Ready to implement',
    color: '#449922'
  },
  exported: {
    label: 'Released',
    description: 'Used in live projects',
    color: '#2244bb'
  }
});

/*
 * DOCS SETTINGS
 */
fractal.docs.set('path', uiLibRoot + '/src/pages');
fractal.docs.set('statuses', {
  draft: {
    label: 'Draft',
    description: 'This documentation is not complete',
    color: '#888899'
  },
  published: {
    label: 'Published',
    description: 'Documentation complete',
    color: 'rebeccapurple'
  }
});

/*
 * BUILD SETTINGS
 */
fractal.web.set('static.path', uiLibRoot + '/src/public');
fractal.web.set('builder.dest', uiLibRoot + '/docs');

/*
 * THEME SETTINGS
 */
const subTheme = require('@frctl/mandelbrot')({
  favicon: '/favicon.ico',
  nav: ['search', 'components', 'docs'],
  panels: ['info', 'notes', 'html', 'resources', 'context'],
  styles: ['/themes/base.css', '/themes/default.css'],
  static: { mount: 'themes'}
});

fractal.web.theme(subTheme);
