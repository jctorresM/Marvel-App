import React, { Component } from 'react';
import ResultsList from '../../components/results/ResultList';
import ResultDetails from '../../components/results/ResultDetails';
import SearchBar from '../../components/search/SearchBar';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import LoadMore from '../../components/loading/LoadMore';
import MarvelService from '../../services/MarvelService';
import queryString from 'query-string';

class Search extends Component {
    constructor(props) {
        super(props);

        const urlQueryStrings = this.props.location.search;
        const queryValues = queryString.parse(urlQueryStrings);

        this.state = {
            searchTerm: '',
            searchType: queryValues.type ? queryValues.type : 'Characters',
            results: [],
            canLoadMore: false,
            selectedResult: null,
        };

        this.fetchCharacters = this.fetchCharacters.bind(this);
        this.fetchCharacter = this.fetchCharacter.bind(this);
        this.fetchMoreCharacters = this.fetchMoreCharacters.bind(this);

        this.fetchComics = this.fetchComics.bind(this);
        this.fetchComic = this.fetchComic.bind(this);
        this.fetchMoreComics = this.fetchMoreComics.bind(this);

        this.fetchStories = this.fetchStories.bind(this);
        this.fetchStory = this.fetchStory.bind(this);
        this.fetchMoreStories = this.fetchStory.bind(this);

        this.marvelService = new MarvelService({
            apiKey: this.props.apiKey,
        });
    }

    render() {
        const resultsElem = this.state.hasError
            ? <Error />
            : this.state.isLoading
                ? <Loading searchTerm={this.state.searchTerm} />
                : (
                    <ResultsList
                        results={this.state.results}
                        searchTerm={this.state.searchTerm}
                        searchType={this.state.searchType}
                    />
                );

        const loadMoreElem = this.state.canLoadMore
            ? <LoadMore onClick={this.state.searchType === 'Characters' ? 
            this.fetchMoreCharacters : (this.state.searchType === 'Comics' ? this.fetchMoreComics : this.fetchMoreStories)} />
            : '';

        const detailsElem = this.state.selectedResult
            ? (
                <ResultDetails
                    image={this.state.selectedResult.thumbnail ? 
                        this.state.selectedResult.thumbnail.path + '.' + this.state.selectedResult.thumbnail.extension : '/placeholder.jpg'}
                    title={this.state.selectedResult.name}
                    description={this.state.selectedResult.description}
                    stories={this.state.selectedResult.stories}
                    urls={this.state.selectedResult.urls}
                    onClose={() => this.setState({ selectedResult: null })}
                />
            )
            : '';

        return (
            <section className="search">
                <SearchBar
                    searchTerm={this.state.searchTerm}
                    searchType={this.state.searchType}
                    onSubmit={(searchTerm) => this.setState({ searchTerm })}
                    onSelect={(searchType) => this.setState({ searchType })}
                />
                { resultsElem}
                { loadMoreElem}
                { detailsElem}
            </section>
        );
    }

    // set update lifecycle
    componentDidUpdate(_, prevState) {
        const searchTerm = this.state.searchTerm;
        const prevSearchTerm = prevState.searchTerm;
        const searchType = this.state.searchType;
        const prevSearchType = prevState.searchType;

        if (
            searchTerm
            && (searchTerm !== prevSearchTerm || searchType !== prevSearchType)
        ) {
            if (this.state.searchType === 'Characters') {
                this.fetchCharacters();
            }
            else if (this.state.searchType === 'Comics') {
                this.fetchComics();
            } else {
                this.fetchStories();
            }
        }
    }

    fetchCharacters() {
        this.setState({ isLoading: true });

        this.marvelService.getCharacters({
            nameStartsWith: this.state.searchTerm,
            orderBy: "-name"
        })
            .then((data) => {
                this.setState({
                    results: data.results,
                    canLoadMore: data.total > data.offset + data.count,
                    isLoading: false,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

    fetchCharacter(id) {
        this.marvelService.getCharacter(id)
            .then((data) => {
                this.setState({ selectedResult: data.results[0] });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

    fetchMoreCharacters() {
        this.marvelService.getCharacters({
            nameStartsWith: this.state.searchTerm,
            orderBy: "-name",
            offset: this.state.results.length,
        })
            .then((data) => {
                this.setState({
                    results: [...this.state.results, ...data.results],
                    canLoadMore: data.total > data.offset + data.count,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

    fetchComics() {
        this.setState({ isLoading: true });

        this.marvelService.getComics({
            titleStartsWith: this.state.searchTerm,
            orderBy: "issueNumber"
        })
            .then((data) => {
                this.setState({
                    results: data.results,
                    canLoadMore: data.total > data.offset + data.count,
                    isLoading: false,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

    fetchComic(id) {
        this.marvelService.getComic(id)
            .then((data) => {
                this.setState({ selectedResult: data.results[0] });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

    fetchMoreComics() {
        this.marvelService.getComics({
            titleStartsWith: this.state.searchTerm,
            orderBy: "issueNumber",
            offset: this.state.results.length,
        })
            .then((data) => {
                this.setState({
                    results: [...this.state.results, ...data.results],
                    canLoadMore: data.total > data.offset + data.count,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

    fetchStories() {
        this.setState({ isLoading: true });

        this.marvelService.getStories({
            comics: this.state.searchTerm,
            orderBy: "-id"
        })
            .then((data) => {
                this.setState({
                    results: data.results,
                    canLoadMore: data.total > data.offset + data.count,
                    isLoading: false,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

    fetchStory(id) {
        this.marvelService.getStory(id)
            .then((data) => {
                this.setState({ selectedResult: data.results[0] });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

    fetchMoreStories() {
        this.marvelService.getStories({
            comics: this.state.searchTerm,
            orderBy: "-id",
            offset: this.state.results.length,
        })
            .then((data) => {
                this.setState({
                    results: [...this.state.results, ...data.results],
                    canLoadMore: data.total > data.offset + data.count,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ hasError: true });
            });
    }

}

export default Search;

