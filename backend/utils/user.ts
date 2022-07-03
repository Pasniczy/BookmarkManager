import { genSalt, hash } from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};
