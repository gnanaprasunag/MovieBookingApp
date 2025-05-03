import { useState, useMemo, useCallback } from "react";
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function Genrefilter() {
    const dispatch = useDispatch();

    const genre = useMemo(() => [
        "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "Horror", "Musical", "Mystery", "Sci-Fi", "Thriller"
    ], []);

    const { allmovies } = useSelector((state) => state.movieSlice);
    console.log("all movies", allmovies);

    const [genrefilter, setgenrefilter] = useState([]);

    
    const handleGenre = useCallback((value) => {
        console.log("genre", value);
        if (allmovies) {
            const filtered = allmovies.filter((ele) => ele.genre.includes(value));
            setgenrefilter(filtered);
        }
    }, [allmovies]);

   
    const openNav = useCallback(() => {
        document.getElementById("mySidepanel").style.width = "250px";
    }, []);

    const closeNav = useCallback(() => {
        document.getElementById("mySidepanel").style.width = "0";
    }, []);

    return (
        <div>
            <button className="openbtn" onClick={openNav}>&#9776; Genre</button>
            <div id="mySidepanel" className="sidepanel">
                <button className="closebtn" onClick={closeNav}>&times;</button>
                {genre.map((ele, i) => (
                    <button
                        key={i}
                        onClick={() => handleGenre(ele)}
                    >
                        {ele}
                    </button>
                ))}
            </div>

            {/* Display filtered movies (optional) */}
            <div style={{ marginTop: '20px' }}>
                {genrefilter.map((movie, index) => (
                    <Card key={index} style={{ marginBottom: '10px' }}>
                        <CardBody>
                            <CardTitle tag="h5">{movie.title}</CardTitle>
                            <CardText>Genre: {movie.genre.join(", ")}</CardText>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
