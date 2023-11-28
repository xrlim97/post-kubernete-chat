FROM node:alpine
WORKDIR /usr/backendapp
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]