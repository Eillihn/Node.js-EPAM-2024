import csv from 'csvtojson';
import * as fs from 'fs';
import { EventName } from './types.js';
import type { Converter } from 'csvtojson/v2/Converter.js';

interface CSVData {
  Book: string;
  Author: string;
  Price: string;
}

interface TXTData {
  book: string;
  author: string;
  price: number;
}

export default class CsvToJsonConverter {
  static execute(inputPath: string, outputPath: string): void {
    const readStream: fs.ReadStream = fs.createReadStream(inputPath);
    const writeStream: fs.WriteStream = fs.createWriteStream(outputPath);

    readStream.on('error', (err) => {
      console.error('Error reading CSV file:', err);
    });

    writeStream.on('error', (err) => {
      console.error('Error writing to output file:', err);
    });
    (csv() as Converter)
      .fromStream(readStream)
      .subscribe((data: CSVData): void => {
        const { Book, Author, Price } = data;
        const newData: TXTData = {
          book: Book,
          author: Author,
          price: parseFloat(Price),
        };
        writeStream.write(`${JSON.stringify(newData)}\n`);
      })
      .on(EventName.DONE, () => {
        console.log('CSV to JSON conversion complete.');
        writeStream.end();
      });
  }
}
