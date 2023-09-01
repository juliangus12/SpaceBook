import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: {type: String, required : true},
    likes: [],
    comments: [
      {
        userId: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      }
    ],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
