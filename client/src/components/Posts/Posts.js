import { CircularProgress, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading)
    return <Typography variant="h4">No posts found...</Typography>;

  return isLoading ? (
    <Grid container justifyContent="center">
      <CircularProgress size="4em"></CircularProgress>
    </Grid>
  ) : (
    <Grid container className={classes.mainContainer} spacing={2}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={4} lg={3}>
          <Post post={post} setCurrentId={setCurrentId}></Post>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
