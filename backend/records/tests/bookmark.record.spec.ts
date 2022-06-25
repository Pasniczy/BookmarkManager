import { pool } from '../../utils/db';
import { BookmarkRecord } from '../bookmark.record';
import { BookmarkEntity, NewBookmarkEntity } from '../../types';

const newBookmarkEntityMock: NewBookmarkEntity = {
  name: 'test name',
  url: 'http://example.com',
};

// make sure this record exists in db
const testBookmarkEntityMock: BookmarkEntity = {
  id: '12345678-1234-1234-1234-123456789abc',
  name: 'test bookmark',
  url: 'http://test.com',
  favorite: false,
};

const testBookmarkRecordMock = new BookmarkRecord(testBookmarkEntityMock);

afterAll(() => {
  pool.end();
});

describe('BookmarkRecord', () => {
  it('should create BookmarkRecord instance', () => {
    const bookmark = new BookmarkRecord(newBookmarkEntityMock);
    expect(bookmark.name).toBe('test name');
    expect(bookmark.url).toBe('http://example.com');
    expect(bookmark.favorite).toBe(false);
  });

  it('should generate id for BookmarkRecord instance if no id passed', () => {
    const newBookmarkEntity: NewBookmarkEntity = { ...newBookmarkEntityMock, id: undefined };
    expect(newBookmarkEntity.id).toBeUndefined();
    const bookmark = new BookmarkRecord(newBookmarkEntity);
    expect(typeof bookmark.id === 'string').toBe(true);
  });

  it('should create BookmarkRecord instance with favorite set to true', () => {
    const bookmark = new BookmarkRecord({ ...newBookmarkEntityMock, favorite: true });
    expect(bookmark.name).toBe('test name');
    expect(bookmark.url).toBe('http://example.com');
    expect(bookmark.favorite).toBe(true);
  });

  it('should parse SQL number to boolean', () => {
    const bookmarkTruthyBoolean = new BookmarkRecord({ ...newBookmarkEntityMock, favorite: 1 });
    const bookmarkFalsyBoolean = new BookmarkRecord({ ...newBookmarkEntityMock, favorite: 0 });
    expect(bookmarkTruthyBoolean.favorite).toBe(true);
    expect(bookmarkFalsyBoolean.favorite).toBe(false);
  });
});

describe('BookmarkRecord.getOne()', () => {
  it('should return test BookmarkRecord entry for existing test id param', async () => {
    const bookmark = await BookmarkRecord.getOne(testBookmarkEntityMock.id);
    expect(typeof bookmark === 'object').toBe(true);
    expect(bookmark).toStrictEqual(testBookmarkRecordMock);
  });

  it('should return null for non existing test id param', async () => {
    const bookmark = await BookmarkRecord.getOne('------------------------------------');
    expect(bookmark).toBeNull();
  });
});

describe('BookmarkRecord.getAll()', () => {
  it('should return array of entries', async () => {
    const bookmarks = await BookmarkRecord.getAll();
    expect(Array.isArray(bookmarks)).toBe(true);
    expect(bookmarks[0]).toBeDefined();
  });

  it('should return array with test bookmark entry for passed name query', async () => {
    const bookmarks = await BookmarkRecord.getAll(testBookmarkEntityMock.name);
    expect(Array.isArray(bookmarks)).toBe(true);
    expect(bookmarks[0]).toStrictEqual(testBookmarkRecordMock);
  });
});
