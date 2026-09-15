# Docker Guide 🐳

## What is Docker?

Docker is a platform that allows you to package an application and all of its dependencies into a **container**.

A Docker container provides a consistent environment for your application, so it can run the same way on different machines. This helps solve the common **"it works on my machine"** problem.

For a MERN/Express application, Docker can be used to create a development and deployment environment that is consistent across your team.

---

## 1. Install Docker 🐳

Before using Docker, you need to install **Docker Desktop** on your computer.

### Windows

Download and install Docker Desktop for Windows. During installation, make sure the required virtualization/WSL 2 components are enabled if Docker Desktop asks for them.

### macOS

Download and install Docker Desktop for macOS. Choose the version that matches your Mac's processor (Apple Silicon or Intel).

### Linux

Install Docker Engine and Docker Compose using the instructions for your Linux distribution.

After installation, open a terminal and verify that Docker is installed correctly:

```bash
docker --version
```

You can also check that Docker is running:

```bash
docker info
```

If Docker is installed and running correctly, these commands should return Docker information without an error.

---

## 2. Create a Dockerfile 📄

A Dockerfile is a script with instructions on how to build a Docker image.

First, create a folder called `docker` in the root of the project. Then, inside it, create a folder called `development`. In this folder, create a file named `Dockerfile`.

For our Express app, the `Dockerfile` might look something like this:

```dockerfile
# Use the official Node.js image as our base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 5501

# The command to run our app
CMD ["npm", "run", "dev"]
```

## 3. `.dockerignore` File 🚫

To ensure that local `node_modules`, debug logs, and environment variables aren't copied into our Docker image, we'll use a `.dockerignore` file.

Create a `.dockerignore` file in the root of your project:

```text
node_modules
npm-debug.log
.env
```

## 4. Building the Docker Image 🏗️

Navigate to the root directory of your project and run:

```bash
docker build -t auth-service:dev -f docker/development/Dockerfile .
```

This command will produce a Docker image named `auth-service` with the tag `dev`.

## 5. Running the Express App in a Docker Container 🚀

Once the image is built, you can run it:

### Linux / macOS

```bash
docker run --rm -it   -v "$(pwd):/usr/src/app"   -v /usr/src/app/node_modules   --env-file "$(pwd)/.env"   -p 5501:5501   -e NODE_ENV=development   auth-service:dev
```

### PowerShell

For PowerShell users, use `${PWD}` instead of `$(pwd)`:

```powershell
docker run --rm -it `
  -v "${PWD}:/usr/src/app" `
  -v /usr/src/app/node_modules `
  --env-file "${PWD}/.env" `
  -p 5501:5501 `
  -e NODE_ENV=development `
  auth-service:dev
```

### Command Prompt (cmd)

For Command Prompt users, use `%cd%` instead of `$(pwd)`:

```cmd
docker run --rm -it -v "%cd%:/usr/src/app" -v /usr/src/app/node_modules --env-file "%cd%/.env" -p 5501:5501 -e NODE_ENV=development auth-service:dev
```

Your Express app is now accessible at:

http://localhost:5501

## 6. Stopping the Docker Container ✋

You can stop the container using `Ctrl + C` if it is running in the foreground.

If the container is running in detached mode, first list the running containers:

```bash
docker ps
```

Then stop the container using its container ID:

```bash
docker stop <container-id>
```

## Conclusion 🌟

Docker provides a consistent environment for applications, reducing the "it works on my machine" problem.

With your Express app containerized, you can be confident that it will run the same way wherever Docker is installed. As you continue your MERN stack journey, consider using Docker for a seamless development and deployment experience.
