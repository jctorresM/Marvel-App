import React from 'react';

const Loading = (props) => {
    return (
        <div className="loading">
            <h1>{'Loading results for "' + props.searchTerm + '".'}</h1>
        </div>
    );
}

export default Loading;