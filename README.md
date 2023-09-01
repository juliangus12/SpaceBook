# SpaceBook Application

SpaceBook is a full-stack MERN application that allows users to interact in a social media-like environment.

## Getting Started

### Prerequisites

- Node.js
- Yarn (for the client)
- MongoDB

### Running the Application

1. **Start the Client**:
   ```bash
   cd client
   yarn start
   ```

2. **Start the Server**:
   ```bash
   cd server
   npm start
   ```

By following the above steps, both the client and server should be up and running.

### Database Configuration

1. Create a `.env` file inside the `server` directory with the following configurations:
   ```env
   PORT=5000
   MONGODB_CONNECTION="Your MongoDB connection URL here"
   JWTKEY="MERN"
   ```

2. Create another `.env` file inside the `client` directory with the following:
   ```env
   REACT_APP_PUBLIC_FOLDER=http://localhost:5000/images/
   ```

### Loading Sample User Data

To populate the database with the sample user data:

1. Download the required JSON data.
2. Update the path to the JSON file in the `loadJson.js` script.
3. Run the script using:
   ```bash
   node loadJson.js
   ```

After executing the script, verify the user data by checking the database collections. You should see the newly created users.

---

I hope this version of the README provides a clearer and more professional overview of your project and its setup. If you have any additional information or changes you'd like to include, please let me know!
