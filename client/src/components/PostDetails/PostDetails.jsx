import {
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import { RESET_POST } from "../../constants/actionTypes";
import CommentSection from "./CommentSection/CommentSection";
import RecommendedPost from "./RecommendedPost/RecommendedPost";

import useStyles from "./styles";

const PostDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: RESET_POST });
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em"></CircularProgress>
      </Paper>
    );
  }

  const recommendedPosts = posts
    .filter(({ _id }) => _id !== post._id)
    .slice(0, 4);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Grid container className={classes.recommendedPosts} spacing={3}>
            {recommendedPosts.map((post) => (
              <Grid item xs={12} sm={6} md={3} key={post._id}>
                <RecommendedPost post={post}></RecommendedPost>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
