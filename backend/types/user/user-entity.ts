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
