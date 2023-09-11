import { Component } from 'react';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { FcSearch } from 'react-icons/fc';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

class SearchBar extends Component {
  state = {
    imgName: '',
  };

  handleNameChange = evt => {
    this.setState({ imgName: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.imgName.trim() === '') {
      toast.error(
        'Search cannot be empty! Please enter the text of the request!'
      );
      return;
    }

    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
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
            value={this.state.imgName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

export default SearchBar;
