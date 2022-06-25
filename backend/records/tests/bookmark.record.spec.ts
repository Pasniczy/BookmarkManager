import { pool } from "../../utils/db";
import { BookmarkRecord } from "../bookmark.record";
import { BookmarkEntity, NewBookmarkEntity } from "../../types";

const testBookmark: BookmarkRecord = {
  id: "12345678-1234-1234-1234-123456789abc",
  name: "test bookmark",
  url: "http://test.com",
  favorite: false,
}; // make sure to add this bookmark to db

const newBookmarkEntityMock: NewBookmarkEntity = {
  name: "test name",
  url: "http://example.com",
};

const parseBookmark = (bookmark: BookmarkEntity): BookmarkEntity => ({
  ...bookmark,
  favorite: !!bookmark.favorite,
});

afterAll(() => {
  pool.end();
});

describe("BookmarkRecord", () => {
  it("should create BookmarkRecord instance", () => {
    const bookmark = new BookmarkRecord(newBookmarkEntityMock);
    expect(bookmark.name).toBe("test name");
    expect(bookmark.url).toBe("http://example.com");
    expect(bookmark.favorite).toBe(false);
  });

  it("should create BookmarkRecord instance with favorite set to true", () => {
    const bookmark = new BookmarkRecord({ ...newBookmarkEntityMock, favorite: true });
    expect(bookmark.name).toBe("test name");
    expect(bookmark.url).toBe("http://example.com");
    expect(bookmark.favorite).toBe(true);
  });
});

describe("BookmarkRecord.getOne()", () => {
  it("should return test bookmark entry for existing test id param", async () => {
    const bookmark = await BookmarkRecord.getOne(testBookmark.id);
    expect(typeof bookmark === "object").toBe(true);
    expect(parseBookmark(bookmark)).toStrictEqual(testBookmark);
  });

  it("should return null for non existing test id param", async () => {
    const bookmark = await BookmarkRecord.getOne("------------------------------------");
    expect(bookmark).toBeNull();
  });
});

describe("BookmarkRecord.getAll()", () => {
  it("should return array of entries", async () => {
    const bookmarks = await BookmarkRecord.getAll();
    expect(Array.isArray(bookmarks)).toBe(true);
    expect(bookmarks[0]).toBeDefined();
  });

  it("should return array with test bookmark entry for passed name query", async () => {
    const bookmarks = await BookmarkRecord.getAll(testBookmark.name);
    expect(Array.isArray(bookmarks)).toBe(true);
    expect(parseBookmark(bookmarks[0])).toStrictEqual(testBookmark);
  });
});
