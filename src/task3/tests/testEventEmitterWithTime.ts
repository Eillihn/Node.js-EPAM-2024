import WithTime from '../WithTime';
import { AnyFunction, EventName } from '../types';

export default function (): void {
  const fetchFromUrl = async (url: string, cb: AnyFunction): Promise<void> => {
    const response = await fetch(url);
    const data = await response.json();

    if (cb) {
      cb(data);
    }
  };

  const withTime = new WithTime();

  withTime.on(EventName.BEGIN, () => console.log('About to execute'));
  withTime.on(EventName.END, () => console.log('Done with execute'));
  withTime.on(EventName.DATA, () => console.log('Data received'));

  withTime.execute(
    fetchFromUrl,
    'https://jsonplaceholder.typicode.com/posts/1',
    console.log,
  );

  console.log(withTime.rawListeners(EventName.END));
}
