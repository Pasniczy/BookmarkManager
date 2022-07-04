export interface UserEntity {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export type NewUserEntity = Omit<UserEntity, 'id'> & {
  id?: string;
};

export type LoginUserRequestData = Pick<UserEntity, 'email' | 'password'>;

export type LoadUserResponseData = Pick<UserEntity, 'username' | 'email'> & {
  createdAt: Date;
};
