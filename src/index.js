#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const fs = require('fs-extra');

// Load available stubs from comments (manually added here for demo purposes)
const availableStubs = [
  'accordion',
  'avatar',
  'alert',
  'alert-dialog',
  'badge',
  'breadcrumbs',
  'button',
  'card',
  'checkbox',
  'collapsible',
  'dialog',
  'drawer',
  'dropdown',
  'hover-card',
  'icon',
  'input',
  'label',
  'menubar',
  'navigation-menu',
  'pagination',
  'popover',
  'progress',
  'radio-group',
  'select',
  'sheet',
  'switch',
  'table',
  'tabs',
  'text-area',
];

// Define your command and options
yargs
  .command(
    'add [targetPath]',
    'Adds components to your project folder',
    (yargs) => {
      return yargs
        .positional('targetPath', {
          describe:
            'Path to the location where you would like to add the files to',
          type: 'string',
          default: '.',
        })
        .option('args', {
          alias: 'a',
          type: 'array',
          description: 'List of specific components to add',
          choices: availableStubs,
        });
    },
    (argv) => {
      const { targetPath, args } = argv;
      runCommand(targetPath, args);
    }
  )
  .help().argv;

// The function to run your command
function runCommand(targetPath, args) {
  console.log('Running command with params:', targetPath, args);

  const stubDirectory = path.join(__dirname, '..', 'stubs');

  // Determine which stubs to copy
  const stubsToCopy = args && args.length > 0 ? args : availableStubs;

  stubsToCopy.forEach((stub) => {
    const source = path.join(stubDirectory, `${stub}.js`);
    const destination = path.join(process.cwd(), targetPath, `${stub}.js`);

    fs.copy(source, destination)
      .then(() => console.log(`Copied ${stub} to ${destination}`))
      .catch((err) => console.error(`Error copying ${stub}:`, err));
  });
}
