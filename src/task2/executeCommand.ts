import childProcess from 'child_process';

process.on('message', (command: string) => {
  childProcess.exec(command, (error, stdout) => {
    if (error) {
      process.send?.({ error: error.message });
    } else {
      process.send?.(stdout.trim());
    }
  });
});
