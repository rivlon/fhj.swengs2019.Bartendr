export interface User {
  id?: number;
  username: string;
  password: string;
  admin?: boolean;
  firstname?: string;
  lastname?: string;
  email?: string;
  active?: boolean;
}
