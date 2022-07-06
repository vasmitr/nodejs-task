import fs from 'fs';

export default function processFile(fileName) {
  const json = fs.readFileSync(fileName, 'utf-8');
  const data = JSON.parse(json);

  return data;
}
