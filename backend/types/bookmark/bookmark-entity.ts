import { UserEntity } from '../user';

export interface BookmarkEntity {
  id: string;
  name: string;
  url: string;
  favorite: boolean;
  user: UserEntity['id'];
}

export type NewBookmarkEntity = Omit<BookmarkEntity, 'id' | 'favorite'> & {
  id?: string;
  favorite?: boolean | 0 | 1;
};

export type NewBookmarkData = Omit<NewBookmarkEntity, 'user'>;
