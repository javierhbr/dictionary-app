export class DictionaryDataDto {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  getCompoundKey(): string {
    return this.key + '_' + this.value;
  }
}
