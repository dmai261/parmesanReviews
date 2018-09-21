FROM node:8-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install
#RUN npm run build
#RUN npm run seed
EXPOSE 1337
CMD [ "npm", "run", "startprod"]