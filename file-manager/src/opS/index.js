import os from 'os';

const getHomeDir = async () => {
  try {
    console.log(await os.homedir());
  } catch (_) {
    console.error('Operation failed');
  }
};

const getEOL = async () => {
  try {
    console.log(JSON.stringify(await os.EOL));
  } catch (_) {
    console.error('Operation failed');
  }
};

const getCPUs = async () => {
  try {
    const CPUsInfo = await os.cpus();
    console.log(`Overall amount of CPUS: ${CPUsInfo.length}`);
    CPUsInfo.forEach((item) => {
      delete item.times;
      console.log(item);
    });
  } catch (_) {
    console.error('Operation failed');
  }
};

const getUserName = async () => {
  try {
    const userInfo = await os.userInfo();
    console.log(userInfo.username);
  } catch (_) {
    console.error('Operation failed');
  }
};

const getArchitecture = async () => {
  try {
    console.log(await os.arch());
  } catch (_) {
    console.error('Operation failed');
  }
};

export default { getHomeDir, getEOL, getCPUs, getUserName, getArchitecture };
