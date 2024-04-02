import childProcess from 'child_process';
import os from 'os';
import fs from 'fs';

run();

function run(): void {
  try {
    setInterval(consoleLog, 100);
    setInterval(fileLog, 1000);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function consoleLog(): Promise<void> {
  const processDetails: string = await getProcessDetails();
  writeToCommandLine(`${processDetails.replace(/[\r\n]/g, '')}\r`);
}
async function fileLog(): Promise<void> {
  const processDetails: string = await getProcessDetails();
  writeToLogFile(processDetails);
}

function getProcessDetails(): Promise<string | never> {
  return new Promise((resolve, reject) => {
    const command: string = getCommand();
    if (!command) {
      reject(new Error('Unsupported platform'));
    } else {
      const child: childProcess.ChildProcess = childProcess.fork('src/task2/executeCommand.ts');
      child.send(command);
      child.on('message', resolve);
      child.on('error', reject);
    }
  });
}

function writeToCommandLine(processDetails: string): void {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(processDetails);
}

function writeToLogFile(data: string): void {
  const logFileName: string = 'src/task2/activityMonitor.log';
  const logData: string = `${Date.now()} : ${data}\n`;

  fs.appendFile(logFileName, logData, (err: NodeJS.ErrnoException | null): void => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

function getCommand(): string {
  const platform: NodeJS.Platform = os.platform();
  switch (platform) {
    case 'win32':
      return "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
    case 'linux':
    case 'darwin':
      return 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
    default:
      return '';
  }
}
