import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    year: String,
    dev: Boolean,
    des: Boolean,
    pm: Boolean,
    core: Boolean,
    mentor: Boolean,
    major: String,
    minor: String,
    birthday: String,
    home: String,
    quote: String,
    favoriteThing1: String,
    favoriteThing2: String,
    favoriteThing3: String,
    favoriteDartmouthTradition: String,
    funFact: String,
    picture: String,
    coverPicture: {  // New field for cover picture
        type: String,
        default: "dfci.jpeg"   // Default value can be set to a default image path if needed
    },
    profilePicture: {  // New field for profile picture
        type: String,
        default: ""   // Default value can be set to a default image path if needed
    },
    followers: [String],
    following: [String]
}, { timestamps: true });

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
