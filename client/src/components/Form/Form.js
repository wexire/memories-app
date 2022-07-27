import { Button, Paper, TextField, Typography } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import React, { useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost, updatePost } from "../../actions/posts";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("The memory title is required."),
      tags: Yup.array().min(1, "The memory should have at least one tag."),
      selectedFile: Yup.string().required("The memory should have an image."),
    }),
    onSubmit: (values) => {
      if (currentId) {
        dispatch(
          updatePost(currentId, { ...values, name: user?.result?.name })
        );
      } else {
        dispatch(createPost({ ...values, name: user?.result?.name }, history));
      }
      clear();
    },
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) {
      formik.setValues(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    formik.resetForm();
  };

  const handleAdd = (tag) =>
    formik.setValues({ ...formik.values, tags: [...formik.values.tags, tag] });

  const handleDelete = (tagToDelete) =>
    formik.setValues({
      ...formik.values,
      tags: formik.values.tags.filter((tag) => tag !== tagToDelete),
    });

  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          onBlur={formik.handleBlur}
          value={formik.values.title}
          onChange={formik.handleChange}
        ></TextField>
        {formik.touched.title && formik.errors.title && (
          <Typography className={classes.error} variant="body1">
            {formik.errors.title}
          </Typography>
        )}
        <TextField
          name="message"
          multiline
          variant="outlined"
          label="Message"
          fullWidth
          minRows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
        ></TextField>
        <ChipInput
          value={formik.values.tags}
          onBlur={formik.handleBlur}
          onAdd={handleAdd}
          onDelete={handleDelete}
          label="Tags"
          variant="outlined"
          className={classes.tagsInput}
        ></ChipInput>
        {formik.touched.tags && formik.errors.tags && (
          <Typography className={classes.error} variant="body1">
            {formik.errors.tags}
          </Typography>
        )}
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            onBlur={formik.handleBlur}
            multiple={false}
            onDone={({ base64 }) =>
              formik.setValues({ ...formik.values, selectedFile: base64 })
            }
          ></FileBase>
          {formik.touched.selectedFile && formik.errors.selectedFile && (
            <Typography className={classes.error} variant="body1">
              {formik.errors.selectedFile}
            </Typography>
          )}
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
