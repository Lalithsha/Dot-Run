import fs from 'fs';

interface File {
  type: 'dir' | 'file';
  name: string;
  path?: string;
}

export async function fetchDir(dir: string, baseDir: string): Promise<File[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          files.map(file => ({
            type: file.isDirectory() ? 'dir' : 'file',
            name: file.name,
            path: `${baseDir}/${file.name}`,
          }))
        );
      }
    });
  });
}

export async function fetchFileContent(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function saveFile(file: string, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, 'utf8', err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
