import { useEffect, useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onFilter, searchQuery }) => {
  const isChecked = JSON.parse(localStorage.getItem('filterCheckBox'));
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(isChecked);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    if (searchQuery.searchText) {
      setSearchText(searchQuery.searchText);
    }
  }, [searchQuery.searchText]);

  const checkFilterBox = () => {
    if (searchText !== '') {
      setIsShortFilmChecked(!isShortFilmChecked);
      localStorage.setItem('filterCheckBox', !isShortFilmChecked);

      onFilter({
        searchText: searchText,
        isShortFilmChecked: !isShortFilmChecked
      });
    } else {
      setIsShortFilmChecked(!isShortFilmChecked);
      localStorage.setItem('filterCheckBox', !isShortFilmChecked);

      onFilter({
        searchText: searchQuery.searchText,
        isShortFilmChecked: !isShortFilmChecked
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() === '') {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      onFilter({ searchText, isShortFilmChecked });
    }
  };

  return (
    <section className="search">
      <form className='search-form' onSubmit={onSubmit} noValidate>
        <div className='search-form__inner'>
          <input
            type='search'
            name='film-search'
            placeholder='Фильм'
            required
            minLength='1'
            maxLength='300'
            className='search-form__input'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type='submit'
            className='search-form__button'
          >
            Найти
          </button>
        </div>
        {error && <p className="search-form__error">{error}</p>}
        <div className='search-form__toggle'>
          <label className='search-form__toggle-label' htmlFor='short-films'>
            <input
              className='search-form__toggle-checkbox-invisible'
              type='checkbox'
              name='short-films'
              id='short-films'
              onChange={checkFilterBox}
              checked={isShortFilmChecked || ''}
            />
            <span className={`search-form__toggle-checkbox-visible ${isShortFilmChecked && 'search-form__toggle-checkbox-visible_checked'}`} />
            Короткометражки
          </label>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;