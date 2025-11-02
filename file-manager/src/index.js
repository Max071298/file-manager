import utils from './utils/index.js';
import os from 'os';
import opS from './opS/index.js';
import nwd from './nwd/index.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import path from 'path';
import fo from './fo/index.js';
import hash from './hash/index.js';
import zip from './zip/index.js';

const rl = readline.createInterface({ input, output });

const startFM = async () => {
  await utils.makeGreeting();
  await process.chdir(os.homedir());
  await utils.getPath();

  rl.on('line', async (cli) => {
    const command = utils.getCLICommand(cli);
    const args = utils.getCLIArgs(cli);

    switch (args.length) {
      case 0: {
        switch (command) {
          case '.exit':
            rl.close();
            break;
          case 'ls':
            await nwd.getls(process.cwd());
            break;
          case 'up':
            await nwd.upDir(process.cwd());
            break;
        }
      }

      case 1: {
        switch (command) {
          case 'os --homedir':
            await opS.getHomeDir();
            break;
          case 'os --EOL':
            await opS.getEOL();
            break;
          case 'os --cpus':
            await opS.getCPUs();
            break;
          case 'os --username':
            await opS.getUserName();
            break;
          case 'os --architecture':
            await opS.getArchitecture();
            break;
          case 'cd':
            await nwd.changeDir(args[0]);
            break;
          case 'cat':
            await fo.readFile(args[0]);
            break;
          case 'add':
            await fo.addFile(args[0]);
            break;
          case 'mkdir':
            await fo.makeDir(args[0]);
            break;
          case 'rm':
            await fo.deleteFile(args[0]);
            break;
          case 'hash':
            await hash.calculateHash(args[0]);
            break;
        }
      }

      case 2: {
        switch (command) {
          case 'rn':
            fo.renameFile(...args);
            break;
          case 'cp':
            fo.copyFile(...args);
            break;
          case 'mv':
            fo.moveFile(...args);
            break;
          case 'compress':
            await zip.zipFile(...args);
            break;
          case 'decompress':
            await zip.unZipFile(...args);
            break;
        }
      }
    }

    utils.getPath();
  });

  rl.on('close', () => {
    utils.makeFarewell();
  });
};

startFM();
