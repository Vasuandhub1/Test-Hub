# importing the node image v22
FROM  node:22

# change the working directory
WORKDIR /app

# copy the package files
COPY package*.json .

# install all the dependancy 
RUN npm install

COPY . .

CMD ["npm","run","dev"]

EXPOSE 5173



