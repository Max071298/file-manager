const getName = async () => {
  const cliData = await process.argv;
  const name = cliData.find((item) => item.startsWith('--username='));
  return name ? name.slice(name.indexOf('=') + 1, name.length) : 'Unknown user';
};

const makeGreeting = async () => {
  const userName = await getName();
  console.log(`Welcome to the File Manager, ${userName}!`);
};

export default { makeGreeting };
