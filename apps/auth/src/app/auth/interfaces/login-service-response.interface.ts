import { SelectUserType } from '../../../database/types/user.type';

export interface ILoginServiceResponseInterface {
  user: SelectUserType;
  token: string;
}
