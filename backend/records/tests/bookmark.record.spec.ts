import { UserRecord } from '../user.record';
import { BookmarkRecord } from '../bookmark.record';
import { BookmarkEntity, NewBookmarkEntity, UserEntity } from '../../types';
import { pool } from '../../utils/db';

export const testUserEntity: UserEntity = {
  id: '12345678-1234-1234-1234-123456789xyz',
  username: 'test username',
  email: 'bookmark-test@email.com',
  password: '123456',
};
export const testUserRecord = new UserRecord(testUserEntity);

const testBookmarkEntity: BookmarkEntity = {
  id: '12345678-1234-1234-1234-123456789abc',
  name: 'test bookmark',
  url: 'http://test.com',
  favorite: false,
  user: testUserEntity.id,
};
const testBookmarkRecord = new BookmarkRecord(testBookmarkEntity);

beforeAll(async () => {
  await testUserRecord.create();
  await testBookmarkRecord.add();
});

afterAll(async () => {
  await testBookmarkRecord.delete();
  await testUserRecord.delete();
  pool.end();
});

describe('BookmarkRecord', () => {
  it('should create BookmarkRecord instance', () => {
    const bookmark = new BookmarkRecord(testBookmarkEntity);
    expect(bookmark.name).toBe(testBookmarkEntity.name);
    expect(bookmark.url).toBe(testBookmarkEntity.url);
    expect(bookmark.favorite).toBe(false);
    expect(bookmark.user).toBe(testBookmarkEntity.user);
  });

  it('should generate id for BookmarkRecord instance if no id passed', () => {
    const newBookmarkEntity: NewBookmarkEntity = { ...testBookmarkEntity, id: undefined };
    expect(newBookmarkEntity.id).toBeUndefined();
    const bookmark = new BookmarkRecord(newBookmarkEntity);
    expect(typeof bookmark.id === 'string').toBe(true);
  });

  it('should parse SQL number to boolean', () => {
    const bookmarkTruthyBoolean = new BookmarkRecord({ ...testBookmarkEntity, favorite: 1 });
    expect(bookmarkTruthyBoolean.favorite).toBe(true);
    const bookmarkFalsyBoolean = new BookmarkRecord({ ...testBookmarkEntity, favorite: 0 });
    expect(bookmarkFalsyBoolean.favorite).toBe(false);
  });

  it('should create BookmarkRecord instance with favorite set to true', () => {
    const bookmark = new BookmarkRecord({ ...testBookmarkEntity, favorite: true });
    expect(bookmark.favorite).toBe(true);
  });
});

describe('BookmarkRecord.getOne() static', () => {
  it('should return test BookmarkRecord entry for existing test id param', async () => {
    const bookmark = await BookmarkRecord.getOne(testBookmarkEntity.id);
    expect(typeof bookmark === 'object').toBe(true);
    expect(bookmark).toStrictEqual(testBookmarkRecord);
  });

  it('should return null for non existing test id param', async () => {
    const bookmark = await BookmarkRecord.getOne('------------------------------------');
    expect(bookmark).toBeNull();
  });
});

describe('BookmarkRecord.getAll() static', () => {
  beforeAll(async () => {
    testBookmarkRecord.favorite = true;
    await testBookmarkRecord.update();
  });
  afterAll(async () => {
    testBookmarkRecord.favorite = false;
    await testBookmarkRecord.update();
  });
  it('should return array of entries', async () => {
    const bookmarks = await BookmarkRecord.getAll();
    expect(Array.isArray(bookmarks)).toBe(true);
    expect(bookmarks[0]).toBeDefined();
  });

  it('should return array with test bookmark entry for passed name query', async () => {
    const bookmarks = await BookmarkRecord.getAll(testBookmarkEntity.name);
    expect(Array.isArray(bookmarks)).toBe(true);
    expect(bookmarks[0]).toStrictEqual(testBookmarkRecord);
  });

  it('should return array with test bookmark entry for passed name and favorites query', async () => {
    const bookmarks = await BookmarkRecord.getAll(testBookmarkRecord.name, true);
    expect(Array.isArray(bookmarks)).toBe(true);
    expect(bookmarks[0]).toStrictEqual(testBookmarkRecord);
  });
});

describe('BookmarkRecord.add()', () => {
  beforeEach(async () => {
    await testBookmarkRecord.delete();
  });
  it('should return BookmarkRecord', async () => {
    const bookmark = await testBookmarkRecord.add();
    expect(bookmark instanceof BookmarkRecord).toBe(true);
  });
  it('should add BookmarkRecord to db', async () => {
    let bookmark = await BookmarkRecord.getOne(testBookmarkEntity.id);
    expect(bookmark).toBeNull();
    bookmark = await testBookmarkRecord.add();
    expect(bookmark).toStrictEqual(testBookmarkRecord);
  });
});

describe('BookmarkRecord.update()', () => {
  afterAll(async () => {
    await testBookmarkRecord.update();
  });
  it('should return BookmarkRecord', async () => {
    const bookmark = await testBookmarkRecord.update();
    expect(bookmark instanceof BookmarkRecord).toBe(true);
  });
  it('should update BookmarkRecord with given id in db', async () => {
    const bookmark = await BookmarkRecord.getOne(testBookmarkEntity.id);
    if (!bookmark) throw new Error('No bookmark found');
    expect(bookmark.url).toBe(testBookmarkRecord.url);
    expect(bookmark.favorite).toBe(testBookmarkRecord.favorite);
    bookmark.name = testBookmarkEntity.name;
    bookmark.url = testBookmarkEntity.url;
    bookmark.favorite = true;
    const { name, url, favorite } = await bookmark.update();
    expect(name).toBe(testBookmarkEntity.name);
    expect(url).toBe(testBookmarkEntity.url);
    expect(favorite).toBe(true);
  });
});

describe('BookmarkRecord.delete()', () => {
  afterAll(async () => {
    await testBookmarkRecord.add();
  });
  it('should delete BookmarkRecord with given id in db', async () => {
    expect(await BookmarkRecord.getOne(testBookmarkEntity.id)).toBeDefined();
    await testBookmarkRecord.delete();
    expect(await BookmarkRecord.getOne(testBookmarkEntity.id)).toBeNull();
  });
});
