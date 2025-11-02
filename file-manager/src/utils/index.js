const getName = async () => {
  const cliData = await process.argv;
  const name = cliData.find((item) => item.startsWith('--username='));
  return name ? name.slice(name.indexOf('=') + 1, name.length) : 'Unknown user';
};

const makeGreeting = async () => {
  const userName = await getName();
  console.log(`Welcome to the File Manager, ${userName}!`);
};

const makeFarewell = async () => {
  const userName = await getName();
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

const getPath = async () => {
  console.log(`You are currently in ${process.cwd()}`);
};

const getCLICommand = (cli) => {
  const splittedCLI = cli.split(' ');
  return splittedCLI[0] === 'os' ? cli : splittedCLI[0];
};

const getCLIArgs = (cli) => {
  let splittedCLI;
  if (cli.includes('"')) {
    splittedCLI = cli.split(' "');
  } else if (cli.includes("'")) {
    splittedCLI = cli.split(" '");
  } else {
    splittedCLI = cli.split(' ');
  }

  let cliArgs = splittedCLI
    .slice(1, splittedCLI.length)
    .map((item) => item.replaceAll('"', '').replaceAll("'", ''));

  return cliArgs;
};

export default {
  makeGreeting,
  makeFarewell,
  getPath,
  getCLICommand,
  getCLIArgs,
};
