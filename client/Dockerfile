# importing the node image v22
FROM  node:22-alpine

# change the working directory
WORKDIR /app

# copy the package files
COPY package*.json .

# install all the dependancy 
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


