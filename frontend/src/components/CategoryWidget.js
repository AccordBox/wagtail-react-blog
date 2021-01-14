import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CategoryWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get("/api/blog/categories/").then((res) => {
      const categories = res.data.results;
      this.setState({
        categories,
        loading: false
      });
    });
  }

  render() {
    let content;
    if (this.state.loading) {
      content = 'Loading...';
    } else {
      content = <div className="row">
        <div className="col-lg-12">
          <ul className="list-unstyled mb-0">
            {this.state.categories.map((category) => (
              <li key={category.slug}>
                <Link to={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    }

    return (
      <div className="card my-4">
        <h5 className="card-header">Categories</h5>
        <div className="card-body">
          {content}
        </div>
      </div>
    );
  }
}

export { CategoryWidget };
