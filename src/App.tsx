import { ChangeEvent, Component } from 'react';
import './App.css';
import { SearchComponentState } from './interface/SearchComponent.interfaces';

class App extends Component<object, SearchComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ searchQuery: value });
  };

  handleSearch = () => {
    localStorage.setItem('searchQuery', this.state.searchQuery);
  };
  render() {
    return (
      <div className="app">
        <div className="upper-section">
          <input
            type="text"
            placeholder="Enter your search term..."
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div className="lower-section">
          <h2>Нижняя секция</h2>
          <p>Содержимое нижней секции...</p>
        </div>
      </div>
    );
  }
}

export default App;
