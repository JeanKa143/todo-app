export interface UserSingup {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserAuth {
  id: string;
  token: string;
  refreshToken: string;
}
