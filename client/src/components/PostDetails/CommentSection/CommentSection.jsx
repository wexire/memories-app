import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../../actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          <div className={classes.comments}>
            {comments?.length ? (
              comments.map((c, i) => (
                <Typography key={i} variant="subtitle1">
                  <strong>{c.split(":")[0]}</strong>:{c.split(":")[1]}
                </Typography>
              ))
            ) : (
              <Typography variant="subtitle1">
                No comments for this post yet
              </Typography>
            )}
            <div ref={commentsRef} />
          </div>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12} sm={6}>
          {user ? (
            <>
              <Typography gutterBottom variant="h6">
                Write a comment
              </Typography>
              <TextField
                fullWidth
                minRows={4}
                variant="outlined"
                multiline
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment}
                variant="contained"
                onClick={handleClick}
                color="primary"
              >
                Comment
              </Button>
            </>
          ) : (
            <Typography variant="h6" color="textSecondary">
              Log in to write a comment
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentSection;
