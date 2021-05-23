import { DictionaryDataDto } from './dto/dictionary-data.dto';

export class DictionaryService {
  private readonly _dictionary: Map<string, DictionaryDataDto>;
  private readonly EMPTY_SET_MESSAGE = '(empty set)';

  private printResult = (result: string[], fallBackMessage: string): void => {
    result.length > 0
      ? this.printOperationalResult(result)
      : console.log(fallBackMessage);
  };

  constructor() {
    this._dictionary = new Map<string, DictionaryDataDto>();
  }

  getDictionary(): Map<string, DictionaryDataDto> {
    return this._dictionary;
  }

  keysOperation(): void {
    const result: string[] = [];
    this._dictionary.forEach((value) => {
      result.push(value.key);
    });
    this.printResult(result, this.EMPTY_SET_MESSAGE);
  }

  addOperation(inputData: DictionaryDataDto): void {
    if (this._dictionary.has(inputData.getCompoundKey())) {
      console.log('ERROR, value already exists');
    } else {
      this._dictionary.set(inputData.getCompoundKey(), inputData);
      console.log('Added');
    }
  }

  printOperationalResult(result: string[]): void {
    let index = 1;
    result.forEach((element) => {
      console.log(`${index}) ${element}`);
      index++;
    });
  }

  membersOperation(inputData: DictionaryDataDto): void {
    const result: string[] = [];
    this._dictionary.forEach((value, key) => {
      if (key.includes(inputData.key)) {
        result.push(value.value);
      }
    });
    this.printResult(result, 'ERROR, key does not exist.');
  }

  removeOperation(inputData: DictionaryDataDto): void {
    if (this._dictionary.has(inputData.getCompoundKey())) {
      this._dictionary.delete(inputData.getCompoundKey());
      console.log('Removed');
    } else {
      console.log('ERROR, value does not exist');
    }
  }

  removeAllOperation(inputData: DictionaryDataDto): void {
    const keys: IterableIterator<string> = this._dictionary.keys();
    let wasRemoved = false;
    for (const key of keys) {
      if (key.includes(inputData.key)) {
        this._dictionary.delete(key);
        wasRemoved = true;
      }
    }
    if (wasRemoved) {
      console.log('Removed');
    } else {
      console.log('ERROR, key does not exist');
    }
  }

  clearOperation(): void {
    this._dictionary.clear();
    console.log('Cleared');
  }

  keyExsistsOperations(inputData: DictionaryDataDto): void {
    const keys: IterableIterator<string> = this._dictionary.keys();
    for (const key of keys) {
      if (key.includes(inputData.key)) {
        console.log(true);
        return;
      }
    }
    console.log(false);
  }

  valueExistsOperation(inputData: DictionaryDataDto): void {
    if (this._dictionary.has(inputData.getCompoundKey())) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  allMembersOperation(): void {
    const result: string[] = [];
    for (const data of this._dictionary.values()) {
      result.push(data.value);
    }
    this.printResult(result, this.EMPTY_SET_MESSAGE);
  }

  itemsOperation(): void {
    const result: string[] = [];
    for (const data of this._dictionary.values()) {
      result.push(`${data.key}: ${data.value}`);
    }
    this.printResult(result, this.EMPTY_SET_MESSAGE);
  }
}
