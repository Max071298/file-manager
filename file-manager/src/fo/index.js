import fs from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';

const readFile = async (pathToFile) => {
  try {
    const content = fs.createReadStream(pathToFile, {
      encoding: 'utf-8',
    });

    await pipeline(content, process.stdout, { end: false });
    console.log('pipeline succeeded');
  } catch {
    console.error('Operation failed');
  }
};

const addFile = (fileName) => {
  try {
    fs.writeFile(fileName, '', (e) => {
      if (e) console.error('Operation failed');
    });
    console.log(`File ${fileName} created`);
  } catch {
    console.error('Operation failed');
  }
};

const makeDir = (dirName) => {
  fs.mkdir(dirName, { recursive: true }, (e) => {
    if (e) console.error('Operation failed');
  });

  console.log(`Directory ${dirName} created`);
};

const renameFile = (pathToFile, newName) => {
  fs.rename(pathToFile, newName, (e) => {
    if (e) console.error('Operation failed');
  });
};

const deleteFile = (pathToFile) => {
  fs.unlink(pathToFile, (e) => {
    if (e) console.error('Operation failed');
  });
};

const copyFile = (pathToFile, pathToNewDir) => {
  const fileName = path.basename(pathToFile);

  const readStream = fs.createReadStream(pathToFile);
  const writeStream = fs.createWriteStream(path.join(pathToNewDir, fileName));

  readStream.pipe(writeStream);

  readStream.on('end', () => {
    console.log('File copied successfully!');
  });

  readStream.on('error', () => {
    console.error('Operation failed');
  });

  writeStream.on('error', () => {
    console.error('Operation failed');
  });
};

const moveFile = async (pathToFile, pathToNewDir) => {
  await copyFile(pathToFile, pathToNewDir);
  await deleteFile(pathToFile);
};

export default {
  readFile,
  addFile,
  makeDir,
  renameFile,
  deleteFile,
  copyFile,
  moveFile,
};
