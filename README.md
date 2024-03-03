# Documentation for the Matcher Application

## Introduction
Matcher is a social discovery platform designed to connect people across the globe. Built using the modern MERN stack, the application provides features for user registration, profile browsing, liking, disliking, real-time chat functionalities, and more.

## Technology Choices

- **[MongoDB](https://www.mongodb.com/docs/manual/)**: A NoSQL database, chosen for its flexibility with unstructured data and scalability.
- **[Express.js](https://expressjs.com/)**: A minimal and flexible Node.js web application framework, facilitating the creation of RESTful APIs.
- **[React](https://react.dev/)**: A front-end library for building user interfaces or UI components.
- **[Node.js](https://nodejs.org/en)**: A JavaScript runtime environment that allows JavaScript to be run on the server-side.
- **[Passport](https://www.passportjs.org/)**: Authentication middleware for Node.js, assisting in implementing token-based authentication.
- **[Mongoose](https://mongoosejs.com/)**: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema validations.
- **[JWTs (JSON Web Tokens)](https://jwt.io/)**: Used for securely transmitting information between the client and server as a JSON object.

## Installation Guidelines

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You will also need MongoDB running locally or set up a cloud-based MongoDB instance via MongoDB Atlas.

#### Setting up the Client

1. **Install Client Dependencies**: To set up the client part of the application, ensure you're still in the root directory of your project and run:

   ```bash
   npm run install
   ```

   This command navigates to the `/client` directory and installs all dependencies necessary for the client.

2. **Build for Production**:
   - Once the installation is completed, start the client application by running:

     ```bash
     npm run build
     ```

   - This will make the production build for the client application.

#### Setting up the Server

1. **Install Server Dependencies**: Before starting, ensure you are in the root directory of your project, then initialize the server setup by running:

   ```bash
   npm run preinstall
   ```

   This command navigates to the `/server` directory and installs necessary dependencies for the server.

2. **Environment Variables**: In the `/server` directory, you need to configure your environment variables:
   - Copy the `.env.example` file to a new file and name it `.env`.
   - Open the newly created `.env` file and fill in the environment variables as needed.

3. **Start the Server**:
   - To start the server, run:

     ```bash
     npm start
     ```

   - This command navigates to the `/server` directory and starts the server application. If you have *NODE_ENV* set as "production", this will deploy the react-build as a static site.

#### Development Mode (optional)

- If you wish to run both the server and the client simultaneously in development mode, you can use:

  ```bash
  npm run dev
  ```

- This command makes use of `concurrently` to run both `"npm run dev:server"` and `"npm run dev:client"` at the same time, allowing you to develop both the client and server side concurrently.

## Features Implemented

- **User Registration and Login**: Utilizing bcrypt for password hashing and JWT for session management.
- **Profile Browsing and Actions**: Ability for users to browse, like/dislike other user profiles.
- **Real-Time Chat**: Users who mutually liked each other can engage in real-time conversations.
- **User Authentication**: Secure routes with JWT-based authentication.
- **Profile Updates**: Users can update their profiles, including changing profile pictures.
- **Localization**: Application supports English and Finnish languages using `react-i18next`.

## User Manual

### Registering

To start using Matcher, navigate to the registration page from the homepage. Enter your credentials and personal information following the provided input guidelines. Once you've registered, you will be directed to the login page.

### Logging In

Use the credentials you registered with to log in to Matcher. Upon successful login, you'll be redirected to your profile page.

### Browsing Profiles

Navigate to the 'Swipe' tab to browse through user profiles. You can like or dislike profiles. If two users mutually like each other, a match is established.

### Chatting

Once you have matches, you can view them under the 'Chat' tab. Select a match to start a conversation. The chat feature allows for real-time messaging.

### Editing Profile

To edit your profile, navigate to the 'Profile' tab and select 'Edit Profile.' Make any desired changes and save them.

### Logout

You can log out at any time by accessing the logout option found in the settings.

## Conclusion

Matcher brings people together, focusing on seamless interactions and real-time communication. Whether you're looking to make friends or just have someone to talk to, Matcher provides a platform for meaningful connections.