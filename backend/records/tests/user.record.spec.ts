import { UserRecord } from '../user.record';
import { UserEntity, NewUserEntity } from '../../types';
import { BookmarkRecord } from '../bookmark.record';
import { pool } from '../../utils/db';

const newUserEntityMock: NewUserEntity = {
  username: 'test username',
  email: 'test@email.pl',
  password: 'test password',
};

const testUserId = '12345678-1234-1234-1234-123456789abc';
const testUserEntity: UserEntity = {
  id: testUserId,
  username: 'test username',
  email: 'test@email.com',
  password: '123456789012345678901234567890123456789012345678901234567890',
};

afterAll(async () => {
  pool.end();
});

describe('UserRecord', () => {
  it('should create UserRecord instance', () => {
    const user = new UserRecord(newUserEntityMock);
    expect(user.username).toBe(newUserEntityMock.username);
    expect(user.email).toBe(newUserEntityMock.email);
    expect(user.password).toBe(newUserEntityMock.password);
  });

  it('should generate id for UserRecord instance if no id passed', () => {
    const newUserEntity: NewUserEntity = { ...newUserEntityMock, id: undefined };
    expect(newUserEntity.id).toBeUndefined();
    const user = new UserRecord(newUserEntity);
    expect(typeof user.id === 'string').toBe(true);
  });
});

describe('UserRecord.getOne() static', () => {
  it('should return test UserRecord entry for existing test id param', async () => {
    const user = await UserRecord.getOne(testUserId);
    expect(typeof user === 'object').toBe(true);
    expect(user?.id).toBe(testUserEntity.id);
    expect(user?.username).toBe(testUserEntity.username);
    expect(user?.email).toBe(testUserEntity.email);
    expect(user?.password).toBe(testUserEntity.password);
  });

  it('should return null for non existing test id param', async () => {
    const bookmark = await BookmarkRecord.getOne('------------------------------------');
    expect(bookmark).toBeNull();
  });
});
