import utils from './utils/index.js';
import os from 'os';
import opS from './opS/index.js';
import nwd from './nwd/index.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import path from 'path';

const rl = readline.createInterface({ input, output });

const startFM = async () => {
  await utils.makeGreeting();
  await process.chdir(os.homedir());
  await utils.getPath();

  rl.on('line', async (command) => {
    const splitedCommand = command.split(' ');
    if (splitedCommand.length === 2) {
      switch (splitedCommand[0]) {
        case 'cd':
          await nwd.changeDir(splitedCommand[1]);
          break;
      }
    } else {
      switch (command) {
        case '.exit':
          rl.close();
          break;
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
        case 'ls':
          await nwd.getls(process.cwd());
          break;
        case 'up':
          await nwd.upDir(process.cwd());
          break;
      }
    }

    utils.getPath();
  });

  rl.on('close', () => {
    utils.makeFarewell();
  });
};

startFM();
