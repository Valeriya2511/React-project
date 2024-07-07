import { Component } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  lastSearchQuery: string;
}

class SearchForm extends Component<SearchFormProps> {
  state = {
    searchQuery: '',
  };

  componentDidMount() {
    const { lastSearchQuery } = this.props;
    const savedQuery = localStorage.getItem('lastSearchQuery');
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery });
    } else if (lastSearchQuery) {
      this.setState({ searchQuery: lastSearchQuery });
    }
  }

  componentDidUpdate(prevProps: SearchFormProps) {
    if (this.props.lastSearchQuery !== prevProps.lastSearchQuery) {
      this.setState({ searchQuery: this.props.lastSearchQuery });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchQuery } = this.state;
    this.props.onSearch(searchQuery.trim());
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchQuery}
          onChange={this.handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
