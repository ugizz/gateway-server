FROM node:21

ARG JWT_SECRET \
    JWT_EXPIRE \
    AUTHHOST \
    FRIENDHOST \
    GAMEHOST 



ENV JWT_SECRET=${JWT_SECRET} \
    JWT_EXPIRE=${JWT_EXPIRE} \
    AUTHHOST=${AUTHHOST} \
    FRIENDHOST=${FRIENDHOST} \
    GAMEHOST=${GAMEHOST}

RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .

RUN rm yarn.lock || true
RUN rm package-lock.json || true
RUN npm install 
RUN npm run build 

EXPOSE 3000
CMD [ "node", "dist/main.js" ]