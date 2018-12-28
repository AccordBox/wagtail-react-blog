import React from 'react';
import {Navigation} from './navigation';
import {Footer} from './footer';
import {PostContainer} from './post-container';
import {SideBar} from './sidebar';

class BlogHome extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <div className="row">
                        <PostContainer {...this.props}/>
                        <SideBar/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export {BlogHome};