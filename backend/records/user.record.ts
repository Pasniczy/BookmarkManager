import { FieldPacket } from 'mysql2';
import { v4 } from 'uuid';
import { sign, Secret } from 'jsonwebtoken';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import { UserEntity, NewUserEntity } from '../types';
import { encryptPassword, comparePassword } from '../utils/user';

type UserRecordResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
  readonly id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor({ id, username, email, password, createdAt }: NewUserEntity) {
    if (!username) {
      throw new ValidationError('User name is required');
    }
    if (username.length > 20) {
      throw new ValidationError('User name cannot be more than 20 characters');
    }
    if (!email) {
      throw new ValidationError('User email is required');
    }
    if (username.length > 320) {
      throw new ValidationError('User email cannot be more than 320 characters');
    }
    if (!password) {
      throw new ValidationError('User password is required');
    }
    if (password.length < 6) {
      throw new ValidationError('User password cannot be less than 6 characters');
    }
    if (password.length > 60) {
      throw new ValidationError('User password cannot be more than 60 characters');
    }

    this.id = id ?? v4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date();
  }

  async create(): Promise<UserRecord> {
    this.password = await encryptPassword(this.password);
    await pool.execute(
      'INSERT INTO `users`(`id`,`username`,`email`, `password`) VALUES(:id, :username, :email, :password)',
      {
        ...this,
      }
    );
    return this;
  }

  async delete(): Promise<void> {
    await pool.execute('DELETE FROM `users` WHERE `id` = :id', this);
  }

  async matchPassword(password: string): Promise<boolean> {
    const isPasswordCorrect = await comparePassword(password, this.password);
    return isPasswordCorrect;
  }

  getSignedJWTToken() {
    const JWTToken = sign({ id: this.id }, process.env.JWT_SECRET as Secret, { expiresIn: process.env.JWT_EXPIRE });
    return JWTToken;
  }

  static async findOneById(id: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute('SELECT * from `users` WHERE `id` = :id', {
      id,
    })) as UserRecordResults;
    if (!results[0]) return null;
    return new UserRecord(results[0]);
  }

  static async findOneByEmail(email: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute('SELECT * from `users` WHERE `email` = :email', {
      email,
    })) as UserRecordResults;
    if (!results[0]) return null;
    return new UserRecord(results[0]);
  }
}
