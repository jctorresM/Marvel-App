import React from 'react';

const LoadMore = (props) => {
    return (
      <button className="load-more" onClick={ props.onClick }>Load More</button>
    );
}

export default LoadMore;