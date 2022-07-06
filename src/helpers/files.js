import fs from 'fs';

export default function processFile(fileName, operation) {
  const json = fs.readFileSync(fileName, 'utf-8');
  console.log(typeof json);
  const data = JSON.parse(json);

  return data.map((record) => {
    return operation(record);
  });
}
