import React from 'react';
import {CategoryWidget} from './category';
import {TagWidget} from './tag';
import {ProfileWidget} from './profile';


class SideBar extends React.Component {
    render() {
        return (
            <div class="col-md-4">
                <ProfileWidget/>
                <CategoryWidget/>
                <TagWidget/>
            </div>
        );
    }
}

export { SideBar };