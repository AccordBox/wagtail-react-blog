import React from 'react';
import axios from 'axios';

class PostDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        let pk = this.props.match.params.id;

        axios.get('/api/cms/pages/' + pk + '/')
            .then(res => {
                const post = res.data;
                this.setState({ post, loaded: true});
            });
    }

    render() {
        if (this.state.loaded) {
            const post = this.state.post;

            return (
                <div class="col-md-8">
                    <img src={post.header_image_url.url} class="img-fluid rounded" />
                    <hr/>
                    <h1>{post.title}</h1>
                    <hr/>
                    <div dangerouslySetInnerHTML={{ __html: post.md_body }} />
                </div>
            );
        } else {
            return (
                <div class="col-md-8">
                    Loading...
                </div>
            );
        }
    }

}

export {PostDetail};