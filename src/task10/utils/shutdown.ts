import { DI } from '../server';

export default function shutdown() {
  DI.logger.info('Received kill signal, shutting down gracefully');

  DI.server.close(() => {
    DI.logger.info('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 20000);

  DI.connections.forEach((connection) => connection.end());
  setTimeout(() => {
    DI.connections.forEach((connection) => connection.destroy());
  }, 10000);
}
