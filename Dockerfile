FROM node:10-alpine
LABEL author="Kevin van der Burgt <kevin@zdev.com>"

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

RUN chmod +x /app/entrypoint.sh /app/wait.sh
CMD ["/app/entrypoint.sh"]
