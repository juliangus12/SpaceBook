import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost, addComment } from "../../api/PostsRequests";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    try {
      const newComment = {
        userId: user._id,
        username: user.username, // Assuming user object contains the username
        text: commentText,
        createdAt: new Date(),
      };
      await addComment(data._id, newComment);
      data.comments.push(newComment);
      setCommentText(""); // Clear the input field
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="comments">
        {data.comments.map((comment) => (
          <div key={comment._id} className="comment">
            <span>
              {comment.text}
            </span>
          </div>
        ))}
      </div>
      <div className="addComment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" onClick={toggleComments} />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
