# using node 22 image 
FROM node:22

# now changing the working directory 
WORKDIR /app


# now copy the filr
COPY package*.json .

# install all the dependancy 
RUN npm install

# copy all the code file 
COPY . .

# now export the ports 
EXPOSE 3000

CMD [ "npm","run","dev"]

