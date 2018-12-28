import React from 'react';


class ProfileWidget extends React.Component {
    render() {
        return (

            <div class="profile-sidebar">
                <div class="profile-userpic">
                    <img src="https://blog.michaelyin.info/upload/images/4366781.original.jpg" class="mx-auto d-block" alt="" />
                </div>
                <div class="profile-usertitle">
                    <div class="profile-usertitle-name">
            Michael Yin
                    </div>
                    <div class="profile-usertitle-job">
            Full Stack Developer
                    </div>
                </div>
            </div>

        );
    }
}

export { ProfileWidget };





