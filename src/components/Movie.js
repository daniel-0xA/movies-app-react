
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const IMG_REPLACEMENT  = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80"
const voteClass = (vote_average) => {
    if(vote_average >= 8)
        return "green"
    else if(vote_average >=6)
        return "orange"
    else return "red"
}
const Movie = ({title, overview, poster_path, vote_average}) => {
    return (
        <div className="movie">
            <img src={poster_path ? IMG_API + poster_path : IMG_REPLACEMENT} alt={title}/>
            <div className="movie-info">
                <h3>{title}</h3>
                <span className={"tag " + voteClass(vote_average)}>{vote_average}</span>
            </div>
            <div className="movie-overview">
                <h3>{title}</h3>
                <p>{overview}</p>
            </div>
        </div>
    )
}

export default Movie;