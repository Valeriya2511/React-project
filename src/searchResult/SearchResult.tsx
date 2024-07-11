interface SearchResult {
  name: string;
  url: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <strong>{result.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

// class SearchResults extends React.Component<SearchResultsProps> {
//   render() {
//     const { results } = this.props;

//     return (
//       <div>
//         <h2>Search Results:</h2>
//         <ul>
//           {results.map((result, index) => (
//             <li key={index}>
//               <strong>{result.name}</strong>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

export default SearchResults;
