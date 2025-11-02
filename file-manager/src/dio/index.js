import fs from 'fs';

const makeDir = (dirName) => {
  fs.mkdir(dirName, { recursive: true }, (e) => {
    if (e) console.error('Operation failed');
  });

  console.log(`Directory ${dirName} created`);
};

export default { makeDir };
