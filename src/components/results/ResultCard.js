import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from "react-router-dom";

const ResultCard = (props) => {
    let history = useHistory();
    const [liked, setLiked] = useState(false);
    // retrieve favorites from local storage (temporal implementation, ideally store in a DB)
    useEffect(() => {
        const storedItems = localStorage.getItem(props.type);
        if (storedItems) {
            const items = JSON.parse(storedItems);
            if (items.some(x => x.id === props.id))
                setLiked(true);
        }
    }, []);

    useEffect(() => {
        if (liked) addToFavorites();
        else removeFromFavorites();
    }, [liked]);

    const addToFavorites = () => {
        const storedItems = localStorage.getItem(props.type);
        if (storedItems) {
            const items = JSON.parse(storedItems);
            localStorage.setItem(props.type, JSON.stringify([...items, props]));
        } else {
            localStorage.setItem(props.type, JSON.stringify([props]));
        }
    }

    const removeFromFavorites = () => {
        const storedItems = localStorage.getItem(props.type);
        if (storedItems) {
            const items = JSON.parse(storedItems);
            const newItems = items.filter(x => x.id !== props.id);
            localStorage.setItem(props.type, JSON.stringify([...newItems]));
        }
    }

    const redirect = () => {
        let type = "character";
        if (props.type === "Comics")  type = "comic";
        if (props.type === "Stories") type = "story";

        history.push(`/${type}/${props.id}`);
    }

    const toggleHeart = (e) => {
        setLiked(!liked);
        e.stopPropagation();
    }

    return (
        <button className="result-card" onClick={ redirect }>
            <figure className="result-card__image">
                <img src={props.image} alt={props.title} />

            </figure>
            {!props.hideHeart ?
                <div style={{ position: 'relative' }}>
                    <div className={`heart ${liked ? 'liked' : ''}`} onClick={(e) => { toggleHeart(e) }}></div>
                </div> : null}
            <div className="result-card__info" style={{ paddingTop: props.hideHeart ? "1.5rem" : "3.2rem" }}>
                <h2>{props.title}</h2>
            </div>
        </button>
    );
}

export default withRouter(ResultCard);
