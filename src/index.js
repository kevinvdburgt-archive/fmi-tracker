import dotenv from 'dotenv';
import { CronJob } from 'cron';
import database from './database';
import { login, devices } from './icloud';

dotenv.config();

const setup = async () => {
  // Migrate the database to its latest version
  await database.migrate.latest();

  // Load the session from memory
  const session = {};

  // Authenticate at iCloud
  try {
    await login(process.env.ICLOUD_USERNAME, process.env.ICLOUD_PASSWORD, session);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  new CronJob('*/10 * * * *', async () => {
    try {
      const result = await devices(session);
  
      if (!result || !result.content || result.content.length === 0) {
        console.log('No devices found!');
        process.exit(1);
      }
  
      result.content.forEach(async (device) => {
        const { id, rawDeviceModel, name } = device;
  
        // Check if the device exists in the database based on Apple's device id.
        let deviceRecord = await database('devices')
          .where({ uuid: id })
          .first();
  
        if (!deviceRecord) {
          deviceRecord = await database('devices')
            .insert({
              uuid: id,
              model: rawDeviceModel,
              name,
            });
        } else if (device && device.location && device.location.latitude) {
          await database('device_locations')
            .insert({
              device_id: deviceRecord.id,
              latitude: device.location.latitude,
              longitude: device.location.longitude,
            });
        }
  
        console.log(deviceRecord);
      });
    } catch (err) {
      console.error(err);
    }
  });
};

setup();
