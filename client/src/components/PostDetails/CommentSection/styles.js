import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  divider: {
    margin: "20px 0",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  comments: {
    overflowY: "auto",
    height: "200px",
    marginRight: "30px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
