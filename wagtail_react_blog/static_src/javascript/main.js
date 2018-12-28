import React from 'react';
import ReactDOM from 'react-dom';

import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import {BlogHome} from './components/blog-home';
import {BlogPost} from './components/blog-post';

import 'bootstrap';


ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={BlogHome}/>
            <Route path="/category/:category" component={BlogHome}/>
            <Route path="/tag/:tag" component={BlogHome}/>
            <Route path="/post/:id" component={BlogPost}/>
        </div>
    </BrowserRouter>
), document.getElementById('app'));


