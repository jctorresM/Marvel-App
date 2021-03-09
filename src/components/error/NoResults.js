import React from 'react';

const NoResults = (props) => {
    const msg = props.searchTerm
        ? 'We couldn\'t find any results for "' + props.searchTerm + '". Why don\'t you try another one?'
        : 'Use the search bar above to begin searching';

    return (
        <div className="no-results">
            <h1>{msg}</h1>
        </div>
    );

}

export default NoResults;