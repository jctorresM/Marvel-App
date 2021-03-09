import React from 'react';
import { withRouter, useHistory } from "react-router-dom";

const Menu = () => {
    let history = useHistory();
    return (
        <div class="navbar">
            <a onClick={() => {
                history.push(`/search`);
            }}>Search</a>
            <a onClick={() => {
                history.push(`/favorites`);
            }}>Favorites</a>
            <img id='marvel-icon' src='/marvel-icon.png'></img>
        </div>
    )
}

export default withRouter(Menu);