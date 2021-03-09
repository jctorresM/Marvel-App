import React, { useState, useEffect } from 'react';
import SearchTypeControls from './SearchTypeControls';

const SearchBar = (props) => {
    const [state, setState] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(state.searchTerm);
    }

    return (
        <>
            <p style={{color: 'yellow', marginTop: 0}}>Note: Search Characters and Comics by name (eg. spider-man), and stories by comic id (eg. 941) </p>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    className="search-bar__field"
                    type="text"
                    value={state.searchTerm}
                    placeholder="Search (eg. Thor)"
                    onChange={(e) => setState({ searchTerm: e.target.value })}
                />
                <SearchTypeControls
                    searchType={props.searchType}
                    onCharactersClick={() => props.onSelect('Characters')}
                    onComicsClick={() => props.onSelect('Comics')}
                    onStoriesClick={() => props.onSelect('Stories')}
                />
                <button className="search-bar__submit" type="submit">Search</button>
            </form>
            
        </>
    );
}

export default SearchBar;