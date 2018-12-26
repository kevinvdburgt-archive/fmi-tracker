import request from 'request-promise-native';
import { jar } from 'request';

export const login = async (apple_id, password, session) => {

  // Create a new login session
  session.jar = jar();

  try {
    const response = await request({
      method: 'POST',
      url: 'https://setup.icloud.com/setup/ws/1/login',
      headers: {
        Origin: 'https://www.icloud.com',
      },
      json: {
        apple_id,
        password,
        extended_login: true,
      },
      jar: session.jar,
    });

    return response;
  } catch (err) {
    console.log('ERRRRR',err);
  }
};

export const devices = async (session) => {
  try {
    const response = await request({
      method: 'POST',
      url: 'https://p33-fmipweb.icloud.com/fmipservice/client/web/initClient',
      headers: {
        Origin: 'https://www.icloud.com',
      },
      json: {},
      jar: session.jar,
    });

    return response;
  } catch (err) {
    console.log('Error:', err);
    return null;
  }
};
