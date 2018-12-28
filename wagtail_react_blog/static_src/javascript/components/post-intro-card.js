import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

class PostIntroCard extends React.Component {

    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {data: undefined};
        this.getPost = this.getPost.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPost();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.getPost();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getPost() {
        axios.get('/api/cms/pages/' + this.props.post.id + '/')
            .then(res => {
                if (this._isMounted) {
                    this.setState({ data: res.data });
                }
            });
    }

    renderPost(data) {
        return (
            <div className="card mb-4">
                <Link to={`/post/${data.id}`}>
                    <img src={data.header_image_url.url} class="card-img-top" />
                </Link>
                <div className="card-body">
                    <h2 className="card-title">
                        <Link to={`/post/${data.id}`}>
                            {data.title}
                        </Link>
                    </h2>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: data.md_excerpt }} />
                    <Link to={`/post/${data.id}`} className="btn btn-primary">
            Read More →
                    </Link>
                </div>
                <div className="card-footer text-muted">
          Posted on {data.pub_date}
                </div>
            </div>

        );
    }

    render() {
        const data = this.state.data;
        if (data !== undefined) {
            return this.renderPost(data);
        }
        else {
            return (
                <div className="card mb-4">
                </div>
            );
        }

    }

}

export { PostIntroCard };


