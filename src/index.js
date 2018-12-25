import request from 'request';

const jar = request.jar();

request({
  method: 'POST',
  url: 'https://setup.icloud.com/setup/ws/1/login',
  headers: {
    Origin: 'https://www.icloud.com',
  },
  json: {
    apple_id: '',
    password: '',
    extended_login: true,
  },
  jar,
}, (err, response, body) => {
  
  console.log(jar);
});
