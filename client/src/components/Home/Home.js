import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Form from "../Form/Form";
import Pagination from "../Pagination/Pagination";
import Posts from "../Posts/Posts";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          spacing={3}
          alignItems="stretch"
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}></Posts>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              color="inherit"
              position="static"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></TextField>
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              ></ChipInput>
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
