import React, { useEffect, useState } from 'react';
import ResultCard from '../../components/results/ResultCard';

const Favorites = () => {
    const [data, setData] = useState();

    useEffect(() => {
        // read local storage
        let storedData = [];
        ["Characters", "Comics", "Stories"].forEach(item => {
            const storedItems = localStorage.getItem(item);
            if (storedItems) {
                storedData = [...storedData, ...JSON.parse(storedItems)];
            }
        });
        console.log(storedData);
        setData(storedData);
    }, [])

    const characters = data && data.length ? data.filter(i => i.type === "Characters").map((result) => {
        return (
            <ResultCard
                key={result.id}
                id={result.id}
                type={result.type}
                image={result.image}
                title={result.title}
                hideHeart={true}
            />
        );
    }) : null;

    const comics = data && data.length ? data.filter(i => i.type === "Comics").map((result) => {
        return (
            <ResultCard
                key={result.id}
                id={result.id}
                type={result.type}
                image={result.image}
                title={result.title}
                hideHeart={true}
            />
        );
    }) : null;

    const stories = data && data.length ? data.filter(i => i.type === "Stories").map((result) => {
        return (
            <ResultCard
                key={result.id}
                id={result.id}
                type={result.type}
                image={result.image}
                title={result.title}
                hideHeart={true}
            />
        );
    }) : null;

    return (
        <section className="favorite-container">
            <div>
                <h3 className="title">Favorite Characters</h3>
                <section className="results-list">
                    {characters && characters.length > 0 ?
                        characters : <p>Your favorite characters will appear here</p>}
                </section>
            </div>
            <div>
                <h3 className="title">Favorite Comics</h3>
                <section className="results-list">
                    {comics && comics.length ?
                        comics : <p>Your favorite comics will appear here</p>}
                </section>
            </div>
            <div>
                <h3 className="title">Favorite Stories</h3>
                <section className="results-list">
                    {stories && stories.length > 0 ? 
                        stories : <p>Your favorite stories will appear here</p>}
                </section>
            </div>
        </section>
    );
}

export default Favorites;