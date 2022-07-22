import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={Number(page)}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        ></PaginationItem>
      )}
    ></Pagination>
  );
};

export default Paginate;
