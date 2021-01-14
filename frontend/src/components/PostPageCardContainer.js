import React from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import _ from 'lodash';

import { PostPageCard } from "./PostPageCard";

class PostPageCardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pageCount: 0,
      pageStep: 2,
    };
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.getPosts();
    }
  }

  getCurPage() {
    // return the page number from the url
    const page = this.props.match.params.page;
    return page === undefined ? 1 : parseInt(page);
  }

  getPrePageUrl() {
    const target = _.clone(this.props.match.params);
    target.page = this.getCurPage() - 1;
    return generatePath(this.props.match.path, target);
  }

  getNextPageUrl() {
    const target = _.clone(this.props.match.params);
    target.page = this.getCurPage() + 1;
    return generatePath(this.props.match.path, target);
  }

  getPosts() {
    let category =
      this.props.match.params.category === undefined
        ? "*"
        : this.props.match.params.category;
    let tag =
      this.props.match.params.tag === undefined
        ? "*"
        : this.props.match.params.tag;

    let offset = (this.getCurPage() - 1) * this.state.pageStep;
    const url = `/api/blog/posts/?limit=${this.state.pageStep}&offset=${offset}&category=${category}&tag=${tag}`;
    axios.get(
      url
    ).then((res) => {
      const posts = res.data.results;
      this.setState({
        posts,
        pageCount: Math.ceil(parseInt(res.data.count) / this.state.pageStep),
      });
    });
  }

  render() {
    return (
      <Col md={8}>
        {this.state.posts.map((post) => (
          <PostPageCard postPk={post.id} key={post.id} />
        ))}

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={
                this.getCurPage() <= 1 ? "page-item disabled" : "page-item"
              }
            >
              <Link
                to={this.getPrePageUrl()}
                className="page-link"
              >
                Previous
              </Link>
            </li>
            <li
              className={
                this.getCurPage() >= this.state.pageCount
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <Link
                to={this.getNextPageUrl()}
                className="page-link"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </Col>
    );

  }
}

export { PostPageCardContainer };
