import React from 'react';
import {Navigation} from './navigation';
import {Footer} from './footer';
import {SideBar} from './sidebar';
import {PostDetail} from './post-detail';

class BlogPost extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <div className="row">
                        <PostDetail {...this.props}/>
                        <SideBar/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export {BlogPost};