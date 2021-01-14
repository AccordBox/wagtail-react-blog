import React from "react";
import axios from "axios";
import { StreamField } from "./StreamField/StreamField";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: true,
    };
  }

  componentDidMount() {
    const pk = this.props.match.params.id;

    // convert querystring to dict
    const querystring = this.props.location.search.replace(/^\?/, '');
    const params = {};
    querystring.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    if (params.token) {
      // preview
      axios.get(`/api/cms/page_preview/${pk}/${this.props.location.search}`)
        .then((res) => {
          const post = res.data;
          this.setState({
            post,
            loading: false
          });
        });
    } else {
      axios.get(`/api/cms/pages/${pk}/`).then((res) => {
        const post = res.data;
        this.setState({
          post,
          loading: false
        });
      })
    }
  }

  render() {
    if (!this.state.loading) {
      const post = this.state.post;

      return (
        <div className="col-md-8">
          <img
            src={post.header_image_url.url}
            className="img-fluid rounded"
            alt=""
          />
          <hr />
          <h1>{post.title}</h1>
          <hr />
          <StreamField value={post.body} />
        </div>
      );
    } else {
      return <div className="col-md-8">Loading...</div>;
    }
  }
}

export { PostDetail };
