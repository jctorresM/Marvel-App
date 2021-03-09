import axios from 'axios';
import md5 from 'md5';
import ApiKey from './ApiKey.enum';


export default class MarvelService {
    static get ENDPOINTS() {
        return {
            comic: 'https://gateway.marvel.com:443/v1/public/comics',
            comics: 'https://gateway.marvel.com:443/v1/public/comics',
            character: 'https://gateway.marvel.com:443/v1/public/characters',
            characters: 'https://gateway.marvel.com:443/v1/public/characters',
            stories: 'https://gateway.marvel.com:443/v1/public/stories',
            story: 'https://gateway.marvel.com:443/v1/public/stories'
        };
    }

    constructor(config) {
        this.apiKey = config.apiKey;
    }

    getAuthConfig() {
        const timestamp = new Date().getTime();
        const md5Hash = md5(timestamp + ApiKey.PRIVATE + ApiKey.PUBLIC);
        return { apikey: ApiKey.PUBLIC, ts: timestamp, hash: md5Hash };
    }

    getCharacters(config = {}) {

        const params = { ...config, ...this.getAuthConfig() };

        const endpoint = MarvelService.ENDPOINTS.characters;

        return axios.get(endpoint, { params: params })
            .then((response) => {
                return response.data.data;
            });
    }

    getCharacter(id, config = {}) {
        const params = { ...config, ...this.getAuthConfig() };

        const endpoint = MarvelService.ENDPOINTS.character + '/' + id;

        return axios.get(endpoint, { params: params })
            .then((response) => {
                return response.data.data;
            });
    }

    getComics(config = {}) {
        const params = { ...config, ...this.getAuthConfig() };
        const endpoint = MarvelService.ENDPOINTS.comics;
        return axios.get(endpoint, { params: params })
            .then((response) => {
                return response.data.data;
            });
    }

    getComic(id, config = {}) {
        const params = { ...config, ...this.getAuthConfig() };
        const endpoint = MarvelService.ENDPOINTS.comic + '/' + id;
        return axios.get(endpoint, { params: params })
            .then((response) => {
                return response.data.data;
            });
    }

    getStories(config = {}) {
        const params = { ...config, ...this.getAuthConfig() };
        const endpoint = MarvelService.ENDPOINTS.stories;
        return axios.get(endpoint, { params: params })
            .then((response) => {
                return response.data.data;
            });
    }

    getStory(id, config = {}) {
        const params = { ...config, ...this.getAuthConfig() };
        const endpoint = MarvelService.ENDPOINTS.stories + '/' + id;
        return axios.get(endpoint, { params: params })
            .then((response) => {
                return response.data.data;
            });
    }
}
