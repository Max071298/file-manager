import utils from './utils/index.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

const startFM = async () => {
  await utils.makeGreeting();
  rl.on('line', (command) => {
    switch (command) {
      case '.exit':
        rl.close();
        break;
    }
  });
  rl.on('close', () => {
    utils.makeFarewell();
  });
};

startFM();
