const utils = require('../lib/utils');
const mongo = require('../db/mongo');

describe('test the utils functions', () => {
  beforeAll(async () => {
    await mongo.mongoConnect();
    const db = await mongo.getDb();
    const modCol = await db.collection('mod');
    await modCol.findAndRemove(
      { date: { $eq: await utils.getCurrentDate() } },
    );
    const iodCol = await db.collection('iod');
    await iodCol.findAndRemove(
      { date: { $eq: await utils.getCurrentDate() } },
    );
  });

  afterAll(async () => {
    await mongo.mongoClose();
  });

  it('check get a random message', async () => {
    const data = await utils.getRandomMessage();
    expect(data).toBeTruthy();
  });

  it('return false when no MOD exists', async () => {
    const bool = await utils.checkForMod();
    expect(bool).toBeFalsy();
  });

  it('insert a new mod', async () => {
    const data = await utils.setMod();
    expect(data).toBe(true);
  });

  it('throw when mod already exists', async () => {
    await expect(() => utils.setMod()).rejects.toThrow('exists');
  });

  it('get the mod', async () => {
    const data = await utils.getMod();
    expect(data).toBeTruthy();
  });

  it('check for the Mod', async () => {
    const data = await utils.checkForMod();
    expect(data).toBe(true);
  });

  it('get the current date', async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const testDate = new Date(year, month, day);
    const curDate = await utils.getCurrentDate();
    expect(curDate).toEqual(testDate);
  });

  it('add untracked images to db', async () => {
    const data = await utils.addImagesToDb();
    expect(data).toBeTruthy();
  });

  it('return false with no matching image', async () => {
    const bool = await utils.checkForImage('image');
    expect(bool).toBe(false);
  });

  it('return true with a matching image', async () => {
    const bool = await utils.checkForImage('mod-11.jpg');
    expect(bool).toBe(true);
  });

  it('get a random image', async () => {
    const image = await utils.getRandomImage();
    expect(image).toBeTruthy();
    expect(image.name).toEqual(expect.any(String));
  });

  it('return false when no IOD exists', async () => {
    const bool = await utils.checkForIod();
    expect(bool).toBeFalsy();
  });

  it('insert a new iod', async () => {
    const bool = await utils.setIod();
    expect(bool).toBe(true);
  });

  it('throw when iod already exists', async () => {
    await expect(() => utils.setIod()).rejects.toThrow('exists');
  });

  it('get the iod', async () => {
    const img = await utils.getIod();
    expect(img).toBeTruthy();
  });
});
