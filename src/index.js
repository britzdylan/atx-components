#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

// Get the directory name in a ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
yargs(hideBin(process.argv))
  .command(
    'add',
    'Adds components to your project folder',
    (yargs) => {
      return yargs.option('args', {
        alias: 'a',
        type: 'array',
        description: 'List of specific components to add',
        choices: availableStubs,
      });
    },
    (argv) => {
      const { args } = argv;
      runCommand(args);
    }
  )
  .help().argv;

function runCommand(args) {
  console.log('Running command with params:', args);

  const stubDirectory = path.join(__dirname, 'stubs');

  // Determine which stubs to copy
  const stubsToCopy = args && args.length > 0 ? args : availableStubs;

  stubsToCopy.forEach((stub) => {
    const source = path.join(stubDirectory, `${stub}.tsx`);
    const destination = path.join(
      process.cwd(),
      'UI/components/primitives',
      `${stub}.tsx`
    );

    fs.copy(source, destination)
      .then(() => console.log(`Copied ${stub} to ${destination}`))
      .catch((err) => console.error(`Error copying ${stub}:`, err));
  });

  fs.copy(
    path.join(stubDirectory, `index.ts`),
    path.join(process.cwd(), 'UI/components', `index.ts`)
  )
    .then(() => console.log(`Copied index to destination`))
    .catch((err) => console.error(`Error copying index`, err));

  fs.copy(
    path.join(stubDirectory, `default.tsx`),
    path.join(process.cwd(), 'UI/layouts', `default.tsx`)
  )
    .then(() => console.log(`Copied layout to destination`))
    .catch((err) => console.error(`Error copying layout`, err));

  fs.copy(
    path.join(stubDirectory, `types.ts`),
    path.join(process.cwd(), 'UI/lib', `types.ts`)
  )
    .then(() => console.log(`Copied types to destination`))
    .catch((err) => console.error(`Error copying types`, err));

  fs.copy(
    path.join(stubDirectory, `utils.ts`),
    path.join(process.cwd(), 'UI/lib', `utils.ts`)
  )
    .then(() => console.log(`Copied utils to destination`))
    .catch((err) => console.error(`Error copying utils`, err));

  fs.copy(
    path.join(stubDirectory, `home.tsx`),
    path.join(process.cwd(), 'UI/pages', `home.tsx`)
  )
    .then(() => console.log(`Copied home to destination`))
    .catch((err) => console.error(`Error copying home`, err));
}
