export type AuthContextProps = {
  auth: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export type ResponseData = {
  message?: string;
  data?: any;
  success: boolean;
};

export type LoginData = {
  userName: string;
  password: string;
};
