import React from 'react';
import ResultCard from './ResultCard';
import NoResults from '../error/NoResults';

const ResultsList = (props) => {
    const resultsElems = props.results.length
        ? props.results.map((result) => {
            return (
                <ResultCard
                    key={result.id}
                    id={result.id}
                    type={props.searchType}
                    image={result.thumbnail ? result.thumbnail.path + '.' + result.thumbnail.extension : '/placeholder.jpg'}
                    title={props.searchType === 'Characters' ? result.name : result.title}
                    onClick={() => props.onResultClick(result.id)}
                />
            );
        })
        : <NoResults searchTerm={props.searchTerm} />;

    return (
        <section className="results-list">
            { resultsElems}
        </section>
    );

}

export default ResultsList;
