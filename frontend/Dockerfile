# Use an official Node.js LTS (Long Term Support) image as a base
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the app (assumed to be npm run dev for development)
CMD ["npm", "run", "dev"]