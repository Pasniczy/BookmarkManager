import { genSalt, hash, compare } from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password1: string, password2: string) => {
  const result = await compare(password1, password2);
  return result;
};
