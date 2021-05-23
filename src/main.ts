import { ActionEnum } from './dictionary/enums/action.enum';
import { DictionaryHandleService } from './dictionary/dictionary-handle.service';
import { Operation } from './dictionary/interface/operation';

function logMenuOptions() {
  console.log(' ');
  console.log('Dictionary App');
  console.log('------------------------');
  console.log('Allowed action:');
  console.log(
    '*All action must have a key entries and value are optional for some actions',
  );
  console.log('foo is the key and bar the value on the examples.');
  console.log(' ');
  console.log(
    ` - ${ActionEnum.KEYS} - e.g.: "KEYS foo bar"  (Returns all the keys in the dictionary)`,
  );
  console.log(
    ` - ${ActionEnum.MEMBERS} - e.g.: "MEMBERS foo" -(Returns the collection of strings for the given key)`,
  );
  console.log(
    ` - ${ActionEnum.ADD} - e.g.: "ADD foo bar" - (Add a member to a collection for a given key)`,
  );
  console.log(
    ` - ${ActionEnum.REMOVE} - e.g.: "REMOVE foo bar" - (Removes a value from a key.)`,
  );
  console.log(
    ` - ${ActionEnum.KEYS} - e.g.: "KEYS" - (Removes a value from a key.)`,
  );
  console.log(
    ` - ${ActionEnum.REMOVEALL} - e.g.: "REMOVEALL foo" - (Removes all value for a key and removes the key from the dictionary)`,
  );
  console.log(
    ` - ${ActionEnum.CLEAR} - e.g.: "CLEAR" - (Removes all keys and all values from the dictionary)`,
  );
  console.log(
    ` - ${ActionEnum.KEYEXISTS} - e.g.: "KEYEXISTS foo" - (Returns whether a key exists or not)`,
  );
  console.log(
    ` - ${ActionEnum.VALUEEXISTS} - e.g.: "VALUEEXISTS foo bar" - (Returns whether a value exists within a key)`,
  );
  console.log(
    ` - ${ActionEnum.ALLMEMBERS} - e.g.: "ALLMEMBERS" - (Returns all the values in the dictionary)`,
  );
  console.log(
    ` - ${ActionEnum.ITEMS} - e.g.: "ITEMS" - (Returns all keys in the dictionary and all of their values)`,
  );
  console.log(` - ${ActionEnum.EXIT} (Exit of the dictionary)`);
  console.log(' ');
  console.log('Please Enter the action with a key value entry:');
  console.log('Example "ADD foo bar":');
}

const parseInput = (input: string): Operation => {
  const splitInput = input.split(' ');
  const action: ActionEnum = ActionEnum[splitInput[0].toUpperCase()];

  return {
    action,
    key: splitInput[1],
    value: splitInput[2],
  };
};

function startDictionary() {
  const dictionaryService: DictionaryHandleService =
    new DictionaryHandleService();
  logMenuOptions();
  const stdin = process.openStdin();

  process.stdout.write('\nEnter action and key value input: ');

  stdin.addListener('data', (text) => {
    const input = text.toString().trim();
    const inputOperation: Operation = parseInput(input);
    if (inputOperation.action) {
      if (inputOperation.action == ActionEnum.EXIT) {
        process.exit(0);
      }
      dictionaryService.processingOperations(inputOperation);
      console.log('\n--------');
      console.log('Please Enter another action and key value:');
    } else {
      console.log(`Please use a valid action, let's try one more time`);
    }
    stdin.end();
  });
}

startDictionary();
