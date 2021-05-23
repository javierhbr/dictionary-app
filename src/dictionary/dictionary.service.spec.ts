import { DictionaryService } from './dictionary.service';
import { DictionaryDataDto } from './dto/dictionary-data.dto';

describe('Dictionary Service', () => {
  let dictionaryService: DictionaryService;
  const fooBar: DictionaryDataDto = new DictionaryDataDto('foo', 'bar');
  const fooBaz: DictionaryDataDto = new DictionaryDataDto('foo', 'baz');
  const bazBang: DictionaryDataDto = new DictionaryDataDto('faz', 'bang');
  const bangZip: DictionaryDataDto = new DictionaryDataDto('bang', 'zip');

  let consoleLogSpy;

  beforeEach(() => {
    dictionaryService = new DictionaryService();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dictionaryService should be defined', () => {
    expect(dictionaryService).toBeDefined();
  });

  describe('keysOperation', () => {
    it('should shows error', () => {
      dictionaryService.addOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      dictionaryService.addOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(
        'ERROR, value already exists',
      );

      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
      expect(dictionaryService.getDictionary().size).toBe(1);
    });

    it('should shows keys of the dictionary', () => {
      /**
       * > ADD foo bar
       ) Added
       > ADD baz bang
       ) Added
       > KEYS
       1) foo
       2) baz
       */
      dictionaryService.addOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      dictionaryService.addOperation(bazBang);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');

      dictionaryService.keysOperation();
      expect(consoleLogSpy).toHaveBeenCalledTimes(4);

      expect(dictionaryService.getDictionary().size).toBe(2);
      expect(
        dictionaryService.getDictionary().has(fooBar.getCompoundKey()),
      ).toBeTruthy();
      expect(
        dictionaryService.getDictionary().has(bazBang.getCompoundKey()),
      ).toBeTruthy();
    });
  });

  describe('membersOperation', () => {
    it('should shows error when member doesnt exist', () => {
      /**
       > MEMBERS bad
       ) ERROR, key does not exi
       */
      dictionaryService.addOperation(bazBang);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      dictionaryService.membersOperation(new DictionaryDataDto('foo', ''));
      expect(consoleLogSpy).toHaveBeenLastCalledWith(
        'ERROR, key does not exist.',
      );
      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
      expect(dictionaryService.getDictionary().size).toBe(1);
    });

    it('should shows members of the dictionary', () => {
      /**
       > ADD foo bar
       > ADD foo baz
       > MEMBERS foo
       1) bar
       2) baz

       > MEMBERS bad
       ) ERROR, key does not exi
       */
      dictionaryService.addOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      dictionaryService.addOperation(fooBaz);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');

      dictionaryService.membersOperation(new DictionaryDataDto('foo', ''));
      expect(consoleLogSpy).toHaveBeenCalledTimes(4);
      expect(dictionaryService.getDictionary().size).toBe(2);
      expect(
        dictionaryService.getDictionary().has(fooBar.getCompoundKey()),
      ).toBeTruthy();
      expect(
        dictionaryService.getDictionary().has(fooBaz.getCompoundKey()),
      ).toBeTruthy();
    });
  });

  describe('removeOperation', () => {
    it('should shows error when key doesnt exist', () => {
      /**
       > REMOVE boom
       ) ERROR, key does not exist
       */
      dictionaryService.removeOperation(new DictionaryDataDto('boom', ''));
      expect(consoleLogSpy).toHaveBeenLastCalledWith(
        'ERROR, value does not exist',
      );
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(dictionaryService.getDictionary().size).toBe(0);
    });

    it('should shows members of the dictionary', () => {
      /**
       > ADD foo bar
       ) Added
       > ADD foo baz
       ) Added

       > REMOVE foo bar
       ) Removed
       > REMOVE foo bar
       ) ERROR, value does not exist
       */
      dictionaryService.addOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      dictionaryService.addOperation(fooBaz);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');

      dictionaryService.removeOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Removed');
      dictionaryService.removeOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(
        'ERROR, value does not exist',
      );
      expect(consoleLogSpy).toHaveBeenCalledTimes(4);
      expect(dictionaryService.getDictionary().size).toBe(1);
      expect(
        dictionaryService.getDictionary().has(fooBar.getCompoundKey()),
      ).toBeFalsy();
      expect(
        dictionaryService.getDictionary().has(fooBaz.getCompoundKey()),
      ).toBeTruthy();
    });
  });

  describe('removeAllOperation', () => {
    it('should shows error when key doesnt exist', () => {
      /**
       REMOVEALL foo
       ) ERROR, key does not exist
       */
      dictionaryService.removeAllOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(
        'ERROR, key does not exist',
      );
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(dictionaryService.getDictionary().size).toBe(0);
      expect(
        dictionaryService.getDictionary().has(fooBar.getCompoundKey()),
      ).toBeFalsy();
    });

    it('should remove all members of given a key', () => {
      /**
       > ADD foo bar
       ) Added
       > ADD foo baz
       ) Added
       > KEYS
       1) foo

       > REMOVEALL foo
       ) Removed
       */
      dictionaryService.addOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      dictionaryService.addOperation(fooBaz);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');

      dictionaryService.removeAllOperation(new DictionaryDataDto('foo', ''));
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Removed');

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);
      expect(dictionaryService.getDictionary().size).toBe(0);
    });
  });

  describe('clearOperation', () => {
    it('should clear with empty dictionary', () => {
      /**
       REMOVEALL foo
       ) ERROR, key does not exist
       */
      expect(dictionaryService.getDictionary().size).toBe(0);
      dictionaryService.clearOperation();
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Cleared');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(dictionaryService.getDictionary().size).toBe(0);
    });

    it('should clear all members of the dictionary', () => {
      dictionaryService.addOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      dictionaryService.addOperation(bangZip);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      expect(dictionaryService.getDictionary().size).toBe(2);
      dictionaryService.clearOperation();
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Cleared');

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);
      expect(dictionaryService.getDictionary().size).toBe(0);
    });
  });

  describe('keyExsistsOperations', () => {
    it('should show error given a non existing key', () => {
      dictionaryService.keyExsistsOperations(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(false);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(dictionaryService.getDictionary().size).toBe(0);
    });

    it('should clear all members of the dictionary', () => {
      dictionaryService.addOperation(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith('Added');
      dictionaryService.keyExsistsOperations(fooBar);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(true);
      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
      expect(dictionaryService.getDictionary().size).toBe(1);
    });
  });
});
