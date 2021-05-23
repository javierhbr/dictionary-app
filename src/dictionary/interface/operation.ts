import { ActionEnum } from '../enums/action.enum';

export interface Operation {
  action: ActionEnum;
  key?: string;
  value?: string;
}
