import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid container className={classes.mainContainer} spacing={2}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId}></Post>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
