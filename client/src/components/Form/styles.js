import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "95%",
    margin: "15px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontVariant: "body2",
    width: "95%",
  },
  tagsInput: {
    width: "95%",
    margin: "10px 0",
  },
}));
