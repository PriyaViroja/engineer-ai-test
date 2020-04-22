import React, { Component } from "react";
import axios from "axios";
import {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Table,
  TableContainer,
  withStyles,
  TablePagination,
  Button,
} from "@material-ui/core";
import PostsDataComponent from "../components/PostsDataComponent";
import { appConstant } from "../utils/constants";
const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
});

class BlogPostContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 0,
      postData: [],
      rowsPerPage: appConstant.ROWS_PER_PAGE,
      page: 0,
      postDataContainer: {
        open: false,
        Data: null,
      },
    };
    this.setinterval = null;
  }

  componentDidMount() {
    this.setinterval = setInterval(() => {
      this.LoadPostData();
    }, 3000);
    this.LoadPostData();
  }

  // Load Post Data
  LoadPostData = () => {
    axios
      .get(
        `${appConstant.API_BASE_URL}search_by_date?tags=story&page=${this.state.pageNumber}`
      )
      .then((res) => {
        this.setState({
          postData: [...this.state.postData, ...res.data.hits],
          pageNumber: this.state.pageNumber + 1,
        });
      });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: parseInt(event.target.value),
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleClose = () => {
    this.setState({
      postDataContainer: {
        open: false,
      },
    });
  };

  onBlogPostSelect = (event, postData) => {
    this.setState({
      postDataContainer: {
        open: true,
        Data: postData,
      },
    });
  };

  componentWillUnmount() {
    clearInterval(this.setinterval);
  }

  render() {
    const { classes } = this.props;
    const posts = this.state.postData.splice(
      this.state.page * this.state.rowsPerPage,
      this.state.rowsPerPage
    );
    return (
      <>
        {posts.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>URL</TableCell>
                    <TableCell>AUTHOR</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.url}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.created_at}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => this.onBlogPostSelect(e, post)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.state.postData.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </>
        ) : (
          <>No Post Fouund</>
        )}
        <PostsDataComponent
          postDataContainer={this.state.postDataContainer}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}

export default withStyles(useStyles)(BlogPostContainer);
