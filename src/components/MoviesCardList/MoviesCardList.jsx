import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
// import { useLocation } from 'react-router-dom';
import useResize from '../../hooks/useResize.js';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ movies, savedMovies, onLikeMovie, onDeleteMovie }) => {
  let size = useResize();
  const [moviesToAdd, setMoviesToAdd] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setMoviesToAdd(0);
  }, [movies]);

  const moviesToRender = useMemo(() => {
    const countToRender = size.width < 768 ? 5 : 7;

    return movies.slice(0, countToRender + moviesToAdd);
  }, [movies, moviesToAdd, size]);

  return (
    <section className="movies">
      <ul className="movies-list">
        {moviesToRender.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              onLikeMovie={onLikeMovie}
              onDeleteMovie={onDeleteMovie}
            />
          );
        })}
      </ul>
      {location.pathname === '/movies' &&
        movies.length > moviesToRender.length && (
          <button
            onClick={() => {
              setMoviesToAdd((prev) => prev + (size.width >= 1280 ? 7 : 5));
            }}
            className="movies__more-btn"
          >
            Еще
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;