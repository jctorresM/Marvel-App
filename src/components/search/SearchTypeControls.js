import React from 'react';

const SearchTypeControls = (props) => {
    return (
        <div className="search-type-controls">
            <label htmlFor="selectCharacters">
                <input
                    id="selectCharacters"
                    name="searchType"
                    type="radio"
                    checked={props.searchType === 'Characters'}
                    onChange={props.onCharactersClick}
                />
                <span>Characters</span>
            </label>
            <label htmlFor="selectComics">
                <input
                    id="selectComics"
                    name="searchType"
                    type="radio"
                    checked={props.searchType === 'Comics'}
                    onChange={props.onComicsClick}
                />
                <span>Comics</span>
            </label>
            <label htmlFor="selectStories">
                <input
                    id="selectStories"
                    name="searchType"
                    type="radio"
                    checked={props.searchType === 'Stories'}
                    onChange={props.onStoriesClick}
                />
                <span>Stories</span>
            </label>
        </div>
    );
}

export default SearchTypeControls;