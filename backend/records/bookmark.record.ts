import { FieldPacket } from 'mysql2';
import { v4 } from 'uuid';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import { BookmarkEntity, NewBookmarkEntity, UserEntity } from '../types';

type BookmarkRecordResults = [BookmarkEntity[], FieldPacket[]];

export class BookmarkRecord implements BookmarkEntity {
  readonly id: string;
  name: string;
  url: string;
  favorite = false;
  user: UserEntity['id'];

  constructor({ id, name, url, favorite, user }: NewBookmarkEntity) {
    if (!name) {
      throw new ValidationError('Bookmark name is required');
    }
    if (name.length > 200) {
      throw new ValidationError('Bookmark name cannot be more than 200 characters');
    }
    if (!url) {
      throw new ValidationError('Bookmark url is required');
    }
    if (url.length > 500) {
      throw new ValidationError('Bookmark url cannot be more that 500 characters');
    }
    if (!user) {
      throw new ValidationError('Bookmark must be assigned to user');
    }

    this.id = id ?? v4();
    this.name = name;
    this.url = url;
    this.favorite = !!favorite;
    this.user = user;
  }

  async add(): Promise<BookmarkRecord> {
    await pool.execute(
      'INSERT INTO `bookmarks`(`id`,`name`,`url`,`favorite`,`user`) VALUES(:id, :name, :url, :favorite, :user)',
      this
    );
    return this;
  }

  async update(): Promise<BookmarkRecord> {
    await pool.execute(
      'UPDATE `bookmarks` SET `name` = :name, `url` = :url, `favorite` = :favorite WHERE `id` = :id',
      this
    );
    return this;
  }

  async delete(): Promise<void> {
    await pool.execute('DELETE FROM `bookmarks` WHERE `id` = :id', this);
  }

  static async getOne(id: string): Promise<BookmarkRecord | null> {
    const [results] = (await pool.execute('SELECT * from `bookmarks` WHERE `id` = :id', {
      id,
    })) as BookmarkRecordResults;

    if (!results[0]) return null;
    return new BookmarkRecord(results[0]);
  }

  static async getAll(name?: BookmarkEntity['name'], favorites?: boolean): Promise<BookmarkRecord[]> {
    if (name && favorites) {
      const [results] = (await pool.execute(
        'SELECT `id`, `name`, `url`, `favorite`, `user` FROM `bookmarks` WHERE `name` LIKE :name && `favorite` = 1 ORDER BY `createdAt` DESC',
        {
          name: `%${name}%`,
        }
      )) as BookmarkRecordResults;
      return results.map((result) => new BookmarkRecord(result));
    }

    if (name) {
      const [results] = (await pool.execute(
        'SELECT `id`, `name`, `url`, `favorite`, `user` FROM `bookmarks` WHERE `name` LIKE :name ORDER BY `createdAt` DESC',
        { name: `%${name}%` }
      )) as BookmarkRecordResults;
      return results.map((result) => new BookmarkRecord(result));
    }

    if (favorites) {
      const [results] = (await pool.execute(
        'SELECT `id`, `name`, `url`, `favorite`, `user` FROM `bookmarks` WHERE `favorite` = 1 ORDER BY `createdAt` DESC'
      )) as BookmarkRecordResults;
      return results.map((result) => new BookmarkRecord(result));
    }

    const [results] = (await pool.execute(
      'SELECT `id`, `name`, `url`, `favorite`, `user` FROM `bookmarks` ORDER BY `createdAt` DESC'
    )) as BookmarkRecordResults;
    return results.map((result) => new BookmarkRecord(result));
  }

  static async getAllByUser(
    user: UserEntity['id'],
    name?: BookmarkEntity['name'],
    favorites?: boolean
  ): Promise<BookmarkRecord[]> {
    if (name && favorites) {
      const [results] = (await pool.execute(
        'SELECT `id`, `name`, `url`, `favorite`, `user` FROM `bookmarks` WHERE `user` = :user && `name` LIKE :name && `favorite` = 1 ORDER BY `createdAt` DESC',
        {
          user,
          name: `%${name}%`,
        }
      )) as BookmarkRecordResults;
      return results.map((result) => new BookmarkRecord(result));
    }

    if (name) {
      const [results] = (await pool.execute(
        'SELECT `id`, `name`, `url`, `favorite`, `user` FROM `bookmarks` WHERE `user` = :user && `name` LIKE :name ORDER BY `createdAt` DESC',
        {
          user,
          name: `%${name}%`,
        }
      )) as BookmarkRecordResults;
      return results.map((result) => new BookmarkRecord(result));
    }

    if (favorites) {
      const [results] = (await pool.execute(
        'SELECT `id`, `name`, `url`, `favorite`, `user` FROM `bookmarks` WHERE `user` = :user && `favorite` = 1 ORDER BY `createdAt` DESC',
        {
          user,
        }
      )) as BookmarkRecordResults;
      return results.map((result) => new BookmarkRecord(result));
    }

    const [results] = (await pool.execute(
      'SELECT `id`, `name`, `url`, `favorite`, `user` FROM `bookmarks` WHERE `user` = :user ORDER BY `createdAt` DESC',
      {
        user,
      }
    )) as BookmarkRecordResults;
    return results.map((result) => new BookmarkRecord(result));
  }
}
