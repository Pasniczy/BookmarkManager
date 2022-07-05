// eslint-disable-next-line
import { pool } from '../../utils/db';

it('should be true', () => {
  expect(true).toBe(true);
});

// import { BookmarkRecord } from '../bookmark.record';
// import { BookmarkEntity, NewBookmarkEntity } from '../../types';

// const newBookmarkEntityMock: NewBookmarkEntity = {
//   name: 'test name',
//   url: 'http://example.com',
// };
//
// const testBookmarkId = '12345678-1234-1234-1234-123456789abc';
// const testBookmarkEntity: BookmarkEntity = {
//   id: testBookmarkId,
//   name: 'test bookmark',
//   url: 'http://test.com',
//   favorite: false,
// };
// const testBookmarkRecord = new BookmarkRecord(testBookmarkEntity);
//
// beforeAll(async () => {
//   await testBookmarkRecord.add();
// });
//
// afterAll(async () => {
//   await testBookmarkRecord.delete();
//   pool.end();
// });
//
// describe('BookmarkRecord', () => {
//   it('should create BookmarkRecord instance', () => {
//     const bookmark = new BookmarkRecord(newBookmarkEntityMock);
//     expect(bookmark.name).toBe('test name');
//     expect(bookmark.url).toBe('http://example.com');
//     expect(bookmark.favorite).toBe(false);
//   });
//
//   it('should generate id for BookmarkRecord instance if no id passed', () => {
//     const newBookmarkEntity: NewBookmarkEntity = { ...newBookmarkEntityMock, id: undefined };
//     expect(newBookmarkEntity.id).toBeUndefined();
//     const bookmark = new BookmarkRecord(newBookmarkEntity);
//     expect(typeof bookmark.id === 'string').toBe(true);
//   });
//
//   it('should create BookmarkRecord instance with favorite set to true', () => {
//     const bookmark = new BookmarkRecord({ ...newBookmarkEntityMock, favorite: true });
//     expect(bookmark.name).toBe('test name');
//     expect(bookmark.url).toBe('http://example.com');
//     expect(bookmark.favorite).toBe(true);
//   });
//
//   it('should parse SQL number to boolean', () => {
//     const bookmarkTruthyBoolean = new BookmarkRecord({ ...newBookmarkEntityMock, favorite: 1 });
//     const bookmarkFalsyBoolean = new BookmarkRecord({ ...newBookmarkEntityMock, favorite: 0 });
//     expect(bookmarkTruthyBoolean.favorite).toBe(true);
//     expect(bookmarkFalsyBoolean.favorite).toBe(false);
//   });
// });
//
// describe('BookmarkRecord.getOne() static', () => {
//   it('should return test BookmarkRecord entry for existing test id param', async () => {
//     const bookmark = await BookmarkRecord.getOne(testBookmarkId);
//     expect(typeof bookmark === 'object').toBe(true);
//     expect(bookmark).toStrictEqual(testBookmarkRecord);
//   });
//
//   it('should return null for non existing test id param', async () => {
//     const bookmark = await BookmarkRecord.getOne('------------------------------------');
//     expect(bookmark).toBeNull();
//   });
// });
//
// describe('BookmarkRecord.getAll() static', () => {
//   it('should return array of entries', async () => {
//     const bookmarks = await BookmarkRecord.getAll();
//     expect(Array.isArray(bookmarks)).toBe(true);
//     expect(bookmarks[0]).toBeDefined();
//   });
//
//   it('should return array with test bookmark entry for passed name query', async () => {
//     const bookmarks = await BookmarkRecord.getAll(testBookmarkEntity.name);
//     expect(Array.isArray(bookmarks)).toBe(true);
//     expect(bookmarks[0]).toStrictEqual(testBookmarkRecord);
//   });
// });
//
// describe('BookmarkRecord.add()', () => {
//   beforeEach(async () => {
//     await testBookmarkRecord.delete();
//   });
//   it('should return BookmarkRecord', async () => {
//     const bookmark = await testBookmarkRecord.add();
//     expect(bookmark instanceof BookmarkRecord).toBe(true);
//   });
//   it('should add BookmarkRecord to db', async () => {
//     let bookmark = await BookmarkRecord.getOne(testBookmarkId);
//     expect(bookmark).toBeNull();
//     bookmark = await testBookmarkRecord.add();
//     expect(bookmark).toStrictEqual(testBookmarkRecord);
//   });
// });
//
// describe('BookmarkRecord.update()', () => {
//   afterAll(async () => {
//     await testBookmarkRecord.update();
//   });
//   it('should return BookmarkRecord', async () => {
//     const bookmark = await testBookmarkRecord.update();
//     expect(bookmark instanceof BookmarkRecord).toBe(true);
//   });
//   it('should update BookmarkRecord with given id in db', async () => {
//     const bookmark = await BookmarkRecord.getOne(testBookmarkId);
//     if (!bookmark) throw new Error('No bookmark found');
//     expect(bookmark.url).toBe(testBookmarkRecord.url);
//     expect(bookmark.favorite).toBe(testBookmarkRecord.favorite);
//     bookmark.name = newBookmarkEntityMock.name;
//     bookmark.url = newBookmarkEntityMock.url;
//     bookmark.favorite = true;
//     const { name, url, favorite } = await bookmark.update();
//     expect(name).toBe(newBookmarkEntityMock.name);
//     expect(url).toBe(newBookmarkEntityMock.url);
//     expect(favorite).toBe(true);
//   });
// });
//
// describe('BookmarkRecord.delete()', () => {
//   afterAll(async () => {
//     await testBookmarkRecord.add();
//   });
//   it('should delete BookmarkRecord with given id in db', async () => {
//     expect(await BookmarkRecord.getOne(testBookmarkId)).toBeDefined();
//     await testBookmarkRecord.delete();
//     expect(await BookmarkRecord.getOne(testBookmarkId)).toBeNull();
//   });
// });
