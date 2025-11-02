import crypto from 'crypto';
import fs, { stat } from 'fs';
import { stdout } from 'process';

const calculateHash = (pathToFile) => {
  fs.stat(pathToFile, (e, stats) => {
    if (e) console.error('Operation failed');
    if (!stats.isFile()) {
      console.error('Operation failed');
    } else {
      try {
        const hash = crypto.createHash('sha256');

        const input = fs.createReadStream(pathToFile);

        input.pipe(hash).setEncoding('hex').pipe(stdout);
      } catch {
        console.error('Operation failed');
      }
    }
  });
};

export default { calculateHash };
