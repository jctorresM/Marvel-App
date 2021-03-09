import React, { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import { withRouter, useHistory, useParams } from "react-router-dom";

const Story = (props) => {
    const { id } = useParams();
    let history = useHistory();
    const [data, setData] = useState();
    const marvelService = new MarvelService({
        apiKey: props.apiKey,
    });

    useEffect(() => {
        marvelService.getStory(id)
            .then((d) => {
                setData({ ...d.results[0] });
                console.log(data);
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
        <div class="story">
            {data && <>
                <div className="story-header">
                    <figure>
                        <img
                            width="250"
                            height="250"
                            src={data.thumbnail ? data.thumbnail.path + '.' + data.thumbnail.extension : '/placeholder.jpg'}
                            alt={data.name} />
                    </figure>
                </div>
                <section className="story-description">
                    <h3>{data.title}</h3>
                </section>
                {data.stories &&
                    <section >
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
                {data.characters &&
                    <section>
                        <h3>Characters</h3>
                        <ul>
                            {data.stories && data.stories.items.map((item, i) =>
                                <li key={i}>
                                    <a href="#" onClick={(e) => onResultClick(e, 'characters', item.resourceURI)}>
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

export default withRouter(Story);