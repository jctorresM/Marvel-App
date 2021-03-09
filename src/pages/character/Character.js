import React, { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import { withRouter, useHistory, useParams } from "react-router-dom";

const Character = (props) => {
    const { id } = useParams();
    let history = useHistory();
    const [data, setData] = useState();
    const marvelService = new MarvelService({
        apiKey: props.apiKey,
    });

    useEffect(() => {
        marvelService.getCharacter(id)
            .then((d) => {
                setData({ ...d.results[0] });
            })
            .catch((err) => {
                console.error(err);
                setData({ hasError: true });
            });
    }, []);

    const getUrlId = (url) => {
        return url.substring(url.lastIndexOf('/') + 1);
    }

    const onResultClick = (e, type, url) => {
        e.preventDefault();
        history.push(`/${type}/${getUrlId(url)}`);
    }

    return (
        <div class="character">
            {data && <>
                <div className="character-header">
                    <figure>
                        <img
                            width="250"
                            height="250"
                            src={data.thumbnail ? data.thumbnail.path + '.' + data.thumbnail.extension : '/placeholder.jpg'}
                            alt={data.name} />
                    </figure>
                </div>
                <section className="character-description">
                    <h3>{data.name}</h3>
                    <p>{data.description}</p>
                </section>
                {data.stories &&
                    <section >
                        <p><strong>Appears In: {data.stories.available || 0} stories</strong></p>
                        <p><strong>Links:</strong></p>
                        <ul>
                            {data.urls && data.urls.map(({ url, type }, i) =>
                                <li key={i}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        {type}
                                    </a>
                                </li>)
                            }
                        </ul>
                    </section>}
                {data.comics &&
                    <section>
                        <h3>Comics</h3>
                        <ul>
                            {data.comics && data.comics.items.map((item, i) =>
                                <li key={i}>
                                    <a href="#" onClick={(e) => onResultClick(e, 'comic', item.resourceURI)}>
                                        {item.name}
                                    </a>
                                </li>)
                            }
                        </ul>
                    </section>}
                {data.stories &&
                    <section>
                        <h3>Stories</h3>
                        <ul>
                            {data.stories && data.stories.items.map((item, i) =>
                                <li key={i}>
                                    <a href="#" onClick={(e) => onResultClick(e, 'story', item.resourceURI)}>
                                        {item.name}
                                    </a>
                                </li>)
                            }
                        </ul>
                    </section>}
            </>}
        </div>
    );
}

export default withRouter(Character);