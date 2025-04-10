# Use an official Nginx image as the base image
FROM node:22-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy the project files to the container
COPY . .

RUN npm install 

# Expose port 80 for the Nginx server
EXPOSE 3000

CMD ["node", "index.js"]