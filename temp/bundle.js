import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { v4 as uuidv4 } from 'uuid';

const packageJson = readFileSync('package.json', 'utf8');
const version = JSON.parse(packageJson).version;

const bundleId = uuidv4();
execSync(`cd dist && zip -r ./${bundleId}.zip ./*`);

writeFileSync(
  'dist/version.json',
  JSON.stringify({
    version,
    url: `https://exif-frame.yuru.cam/${bundleId}.zip`,
  })
);
