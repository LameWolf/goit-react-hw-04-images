import { useState } from 'react';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { FcSearch } from 'react-icons/fc';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

const SearchBar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const handleNameChange = evt => {
    setImgName(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (imgName.trim() === '') {
      toast.error(
        'Search cannot be empty! Please enter the text of the request!'
      );
      return;
    }

    onSubmit(imgName);
    setImgName('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <IconContext.Provider value={{ color: 'blue', size: '3em' }}>
            <FcSearch />
          </IconContext.Provider>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imgName}
          onChange={handleNameChange}
        />
      </SearchForm>
    </Searchbar>
  );
};

export default SearchBar;
