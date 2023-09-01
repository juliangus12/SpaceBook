import axios from 'axios';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import UserModel from './models/userModel.js';
import { connectToDatabase } from './dbConnection.js';

// Read the JSON file
const usersData = JSON.parse(fs.readFileSync('dali_social_media.json', 'utf-8'));

// Function to download and save an image from a URL
const downloadImage = async (url, imageName) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const imagePath = path.join('./public/images', imageName);
    fs.writeFileSync(imagePath, buffer);
    return imageName;  // Return only the image name
};

const loadUsers = async () => {
    await connectToDatabase();

    // Use Promise.all to process all users concurrently
    await Promise.all(usersData.map(async (userJson) => {
        // Map fields from JSON to UserModel
        const user = {
            username: userJson.name.split(' ').join('').toLowerCase(), // Convert name to a username format
            name: userJson.name,
            password: await bcrypt.hash("dali_is_c00l", 10), // Hash the password
            year: userJson.year,
            major: userJson.major,
            home: userJson.home,
            birthday: userJson.birthday,
            quote: userJson.quote,
            favoriteThing1: userJson["favorite thing 1"],
            favoriteThing2: userJson["favorite thing 2"],
            favoriteThing3: userJson["favorite thing 3"],
            favoriteDartmouthTradition: userJson["favorite dartmouth tradition"],
            funFact: userJson["fun fact"],
            dev: userJson.dev || false,
            des: userJson.des || false,
            pm: userJson.pm || false,
            core: userJson.core || false,
            mentor: userJson.mentor || false,
            profilePicture: userJson.picture, // This will be overwritten if the image download is successful
            coverPicture: 'dfci.jpeg', // Default cover picture
            followers: [],
            following: []
        };

        if (userJson.picture) {
            try {
                const imageName = await downloadImage(userJson.picture, path.basename(userJson.picture));
                user.profilePicture = imageName; // Update the profilePicture field to the image name
            } catch (error) {
                console.error(`Failed to download image for user ${user.username}:`, error);
            }
        }

        // Insert or update the user in the database
        await UserModel.findOneAndUpdate({ username: user.username }, user, { upsert: true });
    }));

    console.log('Users loaded successfully.');
};

loadUsers().catch(error => {
    console.error('Error loading users:', error);
});
