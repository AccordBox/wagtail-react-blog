import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class PostPageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(`/api/cms/pages/${this.props.postPk}/`).then((res) => {
      this.setState({
        data: res.data,
        loading: false
      });
    });
  }

  renderPost(data) {
    const dateStr = new Date(data.pub_date).toLocaleString();

    return (
      <div className="card mb-4">
        <Link to={`/post/${data.id}`}>
          <img
            src={data.header_image_url.url}
            className="card-img-top"
            alt=""
          />
        </Link>
        <div className="card-body">
          <h2 className="card-title">
            <Link to={`/post/${data.id}`}>{data.title}</Link>
          </h2>
          <p className="card-text">{data.excerpt}</p>
          <Link to={`/post/${data.id}`} className="btn btn-primary">
            Read More →
          </Link>
        </div>
        <div className="card-footer text-muted">Posted on {dateStr}</div>
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return 'Loading...';
    } else {
      return this.renderPost(this.state.data);
    }
  }
}

export { PostPageCard };
