import utils from './utils/index.js';
import os from './os/index.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

const startFM = async () => {
  await utils.makeGreeting();
  await utils.getPath();

  rl.on('line', (command) => {
    utils.getPath();
    switch (command) {
      case '.exit':
        rl.close();
        break;
      case 'os --homedir':
        os.getHomeDir();
        break;
      case 'os --EOL':
        os.getEOL();
        break;
      case 'os --cpus':
        os.getCPUs();
        break;
      case 'os --username':
        os.getUserName();
        break;
      case 'os --architecture':
        os.getArchitecture();
        break;
    }
  });

  rl.on('close', () => {
    utils.makeFarewell();
  });
};

startFM();
