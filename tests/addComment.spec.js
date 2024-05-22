import { test } from '@japa/runner';
import path from 'path';
import fs from 'fs-extra';
import { execa } from 'execa';
import { fileURLToPath } from 'url';

// Use import.meta.url to determine the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility function to clean up copied files after tests
async function cleanup(directory, files) {
  for (const file of files) {
    const filePath = path.join(directory, `${file}.tsx`);
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
    }
  }
}

test.group('CLI Tool - Add Command', (group) => {
  const outputDir = path.join(__dirname, 'output');
  const stubs = ['accordion', 'button', 'card'];

  // Clean up before and after each test
  group.each.setup(async () => {
    await fs.ensureDir(outputDir);
  });

  group.each.teardown(async () => {
    await cleanup(outputDir, stubs);
  });

  test('should copy all stubs by default', async ({ assert }) => {
    await execa('npx', ['atx-components', 'add', outputDir]);

    for (const stub of stubs) {
      const filePath = path.join(outputDir, `${stub}.tsx`);
      assert.isTrue(
        await fs.pathExists(filePath),
        `File ${stub}.tsx should exist`
      );
    }
  });

  test('should copy specified stubs only', async ({ assert }) => {
    await execa('npx', [
      'atx-components',
      'add',
      outputDir,
      '--args',
      'accordion',
      'button',
    ]);

    const expectedFiles = ['accordion', 'button'];
    const unexpectedFiles = ['card'];

    for (const file of expectedFiles) {
      const filePath = path.join(outputDir, `${file}.tsx`);
      assert.isTrue(
        await fs.pathExists(filePath),
        `File ${file}.tsx should exist`
      );
    }

    for (const file of unexpectedFiles) {
      const filePath = path.join(outputDir, `${file}.tsx`);
      assert.isFalse(
        await fs.pathExists(filePath),
        `File ${file}.tsx should not exist`
      );
    }
  });
});
