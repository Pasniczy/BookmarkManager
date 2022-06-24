import { BookmarkRecord } from "../bookmark.record";
import { NewBookmarkEntity } from "../../types";

const newBookmarkEntityMock: NewBookmarkEntity = {
  name: "test name",
  url: "http://example.com",
};

describe("BookmarkRecord tests", () => {
  it("should create BookmarkRecord", () => {
    const bookmark = new BookmarkRecord(newBookmarkEntityMock);

    expect(bookmark.name).toBe("test name");
    expect(bookmark.url).toBe("http://example.com");
    expect(bookmark.favorite).toBe(false);
  });

  it("should create BookmarkRecord with favorite set to true", () => {
    const bookmark = new BookmarkRecord({ ...newBookmarkEntityMock, favorite: true });

    expect(bookmark.name).toBe("test name");
    expect(bookmark.url).toBe("http://example.com");
    expect(bookmark.favorite).toBe(true);
  });
});
