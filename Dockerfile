FROM node

WORKDIR /app
COPY /express-mongoose-auth /app
RUN npm install
CMD node app.js
EXPOSE 3000