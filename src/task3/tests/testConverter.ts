import CsvToJsonConverter from '../CsvToJsonConverter.js';

const csvFilePath = 'src/task3/data/input.csv';
const outputFilePath = 'src/task3/data/output.txt';

export default function (): void {
  CsvToJsonConverter.execute(csvFilePath, outputFilePath);
}
