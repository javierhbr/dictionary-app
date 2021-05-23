## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

### Use as a repository template

To start, just click the **[Use template][repo-template-action]** link (or the green button). Now start adding your code in the `src` and unit tests in the `__tests__` directories.

### Run the APP

To clone the repository use the following commands:

####  System requirements

- Node v12 or +
- Typescript v4 +
- npm

####  Run locally

```sh
npm install

npm run start:dev
or 
npm run start
```



####  Run Test

```sh
npm install

npm run test
```
Coverage  report inside directory:

`coverage/lcov-report/index.html`

#### Run production version
```sh
npm install

npm run build

npm run start:prod
```

Or

```sh
npm install

npm run build

node build/src/main.js
```


### Use the Dictionary APP
Functionalities are described in the main menu with an example of hoy use them.
After each operation, the menu will as again for the next operation, to exit from the app
, just need to use the `EXIT` option.


```shell
Dictionary App
------------------------
Allowed action:
*All action must have a key entries and value are optional for some actions
foo is the key and bar the value on the examples.
 
 - KEYS - e.g.: "KEYS foo bar"  (Returns all the keys in the dictionary)
 - MEMBERS - e.g.: "MEMBERS foo" -(Returns the collection of strings for the given key)
 - ADD - e.g.: "ADD foo bar" - (Add a member to a collection for a given key)
 - REMOVE - e.g.: "REMOVE foo bar" - (Removes a value from a key.)
 - KEYS - e.g.: "KEYS" - (Removes a value from a key.)
 - REMOVEALL - e.g.: "REMOVEALL foo" - (Removes all value for a key and removes the key from the dictionary)
 - CLEAR - e.g.: "CLEAR" - (Removes all keys and all values from the dictionary)
 - KEYEXISTS - e.g.: "KEYEXISTS foo" - (Returns whether a key exists or not)
 - VALUEEXISTS - e.g.: "VALUEEXISTS foo bar" - (Returns whether a value exists within a key)
 - ALLMEMBERS - e.g.: "ALLMEMBERS" - (Returns all the values in the dictionary)
 - ITEMS - e.g.: "ITEMS" - (Returns all keys in the dictionary and all of their values)
 - EXIT (Exit of the dictionary)
 
Please Enter the action with a key value entry:
Example "ADD foo bar":

Enter action and key value input: 
```

There are some improvement to do. Because of the time (2 hours ) I mainly focused on the functionalities but thinking grown as well.

Same with the unit test. I added some testing coverage but not  100%
