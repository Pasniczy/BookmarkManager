import { UserRecord } from '../user.record';
import { UserEntity, NewUserEntity } from '../../types';
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
  password: '123456',
};
const testUserRecord = new UserRecord(testUserEntity);

beforeAll(async () => {
  await testUserRecord.create();
});

afterAll(async () => {
  await testUserRecord.delete();
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

describe('UserRecord.findOneById() static', () => {
  it('should return test UserRecord entry for existing test id param', async () => {
    const user = await UserRecord.findOneById(testUserId);
    expect(typeof user === 'object').toBe(true);
    expect(user?.id).toBe(testUserEntity.id);
    expect(user?.username).toBe(testUserEntity.username);
    expect(user?.email).toBe(testUserEntity.email);
    expect(user?.password.length).toBe(60);
  });

  it('should return null for non existing test id param', async () => {
    const user = await UserRecord.findOneById('------------------------------------');
    expect(user).toBeNull();
  });
});

describe('UserRecord.findOneByEmail() static', () => {
  it('should return test UserRecord entry for existing test email param', async () => {
    const user = await UserRecord.findOneByEmail(testUserRecord.email);
    expect(typeof user === 'object').toBe(true);
    expect(user?.id).toBe(testUserEntity.id);
    expect(user?.username).toBe(testUserEntity.username);
    expect(user?.email).toBe(testUserEntity.email);
    expect(user?.password.length).toBe(60);
  });

  it('should return null for non existing test id param', async () => {
    const user = await UserRecord.findOneByEmail('------------------------------------');
    expect(user).toBeNull();
  });
});

describe('UserRecord.create()', () => {
  beforeEach(async () => {
    await testUserRecord.delete();
  });
  it('should return UserRecord', async () => {
    const user = await testUserRecord.create();
    expect(user instanceof UserRecord).toBe(true);
  });
  it('should create BookmarkRecord in db', async () => {
    let user = await UserRecord.findOneById(testUserId);
    expect(user).toBeNull();
    user = await testUserRecord.create();
    expect(user).toStrictEqual(testUserRecord);
    expect(user.id).toBe(testUserRecord.id);
    expect(user.username).toBe(testUserRecord.username);
    expect(user.email).toBe(testUserRecord.email);
    expect(user.password.length).toBe(60);
    expect(user.createdAt instanceof Date).toBe(true);
  });
});

describe('UserRecord.delete()', () => {
  afterAll(async () => {
    await testUserRecord.create();
  });
  it('should delete UserRecord with given id in db', async () => {
    expect(await UserRecord.findOneById(testUserId)).toBeDefined();
    await testUserRecord.delete();
    expect(await UserRecord.findOneById(testUserId)).toBeNull();
  });
});
