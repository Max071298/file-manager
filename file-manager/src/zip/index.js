import fs from 'fs';
import utils from '../utils/index.js';
import path from 'path';
import zlib from 'zlib';

const zipFile = async (pathToFile, pathToDestination) => {
  if (
    (await utils.isFile(pathToFile)) &&
    (await utils.isDirectory(pathToDestination))
  ) {
    const fileName = path.basename(pathToFile) + '.br';
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(
      path.join(pathToDestination, fileName)
    );

    const brotli = zlib.createBrotliCompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    readStream.on('error', () => {
      console.error('Operation failed');
    });

    writeStream.on('error', () => {
      console.error('Operation failed');
    });

    stream.on('finish', () => {
      console.log('File successfully compressed');
    });
    stream.on('error', () => {
      console.log('Operation failed');
    });
  } else {
    console.error('Invalid input');
  }
};

const unZipFile = async (pathToFile, pathToDestination) => {
  if (
    (await utils.isFile(pathToFile)) &&
    (await utils.isDirectory(pathToDestination))
  ) {
    let fileName = path.basename(pathToFile).split('.');
    fileName = fileName.slice(0, fileName.length - 1).join('.');

    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(
      path.join(pathToDestination, fileName)
    );

    const brotli = zlib.createBrotliDecompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);

    readStream.on('error', () => {
      console.error('Operation failed');
    });

    writeStream.on('error', () => {
      console.error('Operation failed');
    });

    stream.on('finish', () => {
      console.log('File successfully decompressed');
    });
    stream.on('error', () => {
      console.log('Operation failed');
    });
  } else {
    console.error('Invalid input');
  }
};

export default { zipFile, unZipFile };
