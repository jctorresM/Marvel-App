import React from 'react';

const ResultDetails = (props) => {
    return (
        <article className="result-details">
            <div className="result-details__backdrop"></div>
            <div className="result-details__info">
                <div className="result-details__info__header">
                    <figure>
                        <img src={props.image} alt={props.title} />
                    </figure>
                </div>
                <div className="result-details__info__body">
                    <div className="result-details__info__body__content">
                        <h1>{props.title}</h1>
                        { props.stories && <p><strong>Appears In: {props.stories.available || 0} stories</strong></p> }
                        <p>{props.description}</p>
                        <p><strong>Links:</strong></p>
                        <ul>
                            {props.urls && props.urls.map(({ url, type }, i) => 
                                <li key={i}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        {type}
                                    </a>
                                </li>)
                            }
                        </ul>
                    </div>
                    <button onClick={props.onClose}></button>
                </div>
            </div>
        </article>
    );
}

export default ResultDetails;
