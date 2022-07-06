import fs from 'fs';
import { test, expect } from '@jest/globals';
import processFile from './files';

test('File was sucessfully parsed', () => {
  const data = JSON.parse(fs.readFileSync('./src/mock.json', 'utf-8'))
  expect(processFile('./src/mock.json', (r) => r)).toStrictEqual(data);
});
