export type UserRole = 0 | 1 | 2 | 3 | 4;

export type User = {
  id?: string;
  userName: string;
  password?: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
};

export type CloudImage = {
  secure_url: string;
};
