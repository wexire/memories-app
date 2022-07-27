import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const RecommendedPost = ({ post }) => {
  const history = useHistory();
  const classes = useStyles();

  const openPost = (id) => {
    history.push(`/posts/${id}`);
  };

  return (
    <Paper
      elevation={3}
      className={classes.paper}
      onClick={() => openPost(post._id)}
    >
      <Typography gutterBottom variant="h5">
        {post.title}
      </Typography>
      <Typography gutterBottom variant="body1">
        {post.name}
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        {post.message.split(" ").length > 20
          ? `${post.message.split(" ").splice(0, 20).join(" ")}...`
          : post.message}
      </Typography>
      <img src={post.selectedFile} width="100%" />
      <Typography gutterBottom variant="subtitle1">
        {post.likes.length} Likes
      </Typography>
    </Paper>
  );
};

export default RecommendedPost;
