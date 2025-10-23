export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
};

export type AuthResponse = {
  message: string;
  user: UserType;
  token: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type UpdateProfileData = {
  name?: string;
  password?: string;
}; 