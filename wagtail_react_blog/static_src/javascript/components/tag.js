import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class TagWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        };
    }

    componentDidMount() {
        axios.get('/api/blog/tag/')
            .then(res => {
                const tags = res.data.results;
                this.setState({
                    tags,
                });
            });
    }

    render() {
        return (
            <div class="card my-4">
                <h5 class="card-header">Tags</h5>
                <div class="card-body">

                    {this.state.tags.map(tag =>
                        <Link to={`/tag/${tag.slug}`}>
                            <span class="badge badge-secondary">{tag.name}</span>{' '}
                        </Link>
                    )}

                </div>
            </div>
        );
    }
}

export {TagWidget};





