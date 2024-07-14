import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders Pokedex header', () => {
    render(<App />, { wrapper: MemoryRouter });
    const headerElement = screen.getByText(/Pokedex/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('performs search and updates state', async () => {
    render(<App />, { wrapper: MemoryRouter });
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });
    fireEvent.submit(searchInput);

    await waitFor(() => {
      expect(localStorage.getItem('lastSearchQuery')).toBe('pikachu');
      const pikachuElement = screen.getByText('pikachu');
      expect(pikachuElement).toBeInTheDocument();
    });
  });

  test('shows error message on fetch failure', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API is down'));

    render(<App />, { wrapper: MemoryRouter });
    const errorButton = screen.getByText('Trigger Error');
    fireEvent.click(errorButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Something went wrong/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('renders NotFound component for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Route path="/unknown" element={<App />} />
      </MemoryRouter>
    );
    const notFoundMessage = screen.getByText('404 Not Found');
    expect(notFoundMessage).toBeInTheDocument();
  });
});
