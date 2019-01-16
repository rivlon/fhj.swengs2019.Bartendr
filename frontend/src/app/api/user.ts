export interface User {
  id?: number;
  username: string;
  password?: string;
  confirmPassword?: string;
  admin?: boolean;
  firstname?: string;
  lastname?: string;
  email?: string;
  active?: boolean;
}
