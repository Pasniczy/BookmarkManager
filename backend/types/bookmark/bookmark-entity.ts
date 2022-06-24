export interface BookmarkEntity {
  id: string;
  name: string;
  url: string;
  favorite: boolean;
}

export type NewBookmarkEntity = Omit<BookmarkEntity, "id" | "favorite"> & { id?: string; favorite?: boolean };
