import { SelectUserType } from '../../../database/types/user.type';

export interface ILoginServiceResponse {
  user: SelectUserType;
  token: string;
}
