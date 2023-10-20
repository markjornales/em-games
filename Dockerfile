# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN yarn install

# Copy the rest of your application code to the container
COPY . .

# Build the Next.js app
RUN yarn run build

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Define the command to start your Next.js app
CMD ["yarn", "start"]
