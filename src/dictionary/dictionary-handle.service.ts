import { ActionEnum } from './enums/action.enum';
import { Operation } from './interface/operation';
import { DictionaryDataDto } from './dto/dictionary-data.dto';
import { DictionaryService } from './dictionary.service';

export class DictionaryHandleService {
  private dictionaryService: DictionaryService;

  constructor() {
    this.dictionaryService = new DictionaryService();
  }

  processingOperations(operation: Operation): void {
    const inputData: DictionaryDataDto = new DictionaryDataDto(
      operation.key,
      operation.value,
    );
    switch (operation.action) {
      case ActionEnum.KEYS:
        this.dictionaryService.keysOperation();
        break;
      case ActionEnum.ADD:
        this.dictionaryService.addOperation(inputData);
        break;
      case ActionEnum.MEMBERS:
        this.dictionaryService.membersOperation(inputData);
        break;
      case ActionEnum.REMOVE:
        this.dictionaryService.removeOperation(inputData);
        break;
      case ActionEnum.REMOVEALL:
        this.dictionaryService.removeAllOperation(inputData);
        break;
      case ActionEnum.CLEAR:
        this.dictionaryService.clearOperation();
        break;
      case ActionEnum.KEYEXISTS:
        this.dictionaryService.keyExsistsOperations(inputData);
        break;
      case ActionEnum.VALUEEXISTS:
        this.dictionaryService.valueExistsOperation(inputData);
        break;
      case ActionEnum.ALLMEMBERS:
        this.dictionaryService.allMembersOperation();
        break;
      case ActionEnum.ITEMS:
        this.dictionaryService.itemsOperation();
        break;
    }
  }
}
