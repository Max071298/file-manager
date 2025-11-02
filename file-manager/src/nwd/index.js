import fs from 'fs/promises';
import path from 'path';

const getls = async (path) => {
  try {
    const tableData = [];
    const files = await fs.readdir(path, { withFileTypes: true });
    files.forEach((item) => {
      const Name = item.name;
      const Type = item.isFile() ? 'file' : 'directory';
      tableData.push({ Name, Type });
    });
    console.table(tableData);
  } catch (_) {
    console.error('Operation failed');
  }
};

const upDir = (currentDir) => {
  const splitedPass = currentDir.split('\\');

  splitedPass.pop();
  const newPass = splitedPass.join('\\');

  try {
    process.chdir(newPass);
  } catch (_) {
    console.error('Operation failed');
  }
};

const changeDir = async (path) => {
  try {
    process.chdir(path);
  } catch {
    console.error('Invalid input');
  }
};

export default { getls, upDir, changeDir };
