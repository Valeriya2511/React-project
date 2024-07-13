import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // для улучшенных матчеров Jest-DOM
import App from './App';

// Тестирование компонента App
describe('App Component', () => {
  // Подготовка перед каждым тестом
  beforeEach(() => {
    // Мокируем fetch для возврата пустого массива в случае успеха
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ results: [] }), // Функция json должна быть асинхронной
      ok: true,
      status: 200, // Добавляем статус, который может использоваться в вашем коде
    } as Response); // Явное указание на тип Response
  });

  // Очистка после каждого теста
  afterEach(() => {
    jest.restoreAllMocks(); // Восстанавливаем все моки
  });

  test('renders Pokedex header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Pokedex/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('performs search and updates state', async () => {
    const mockData = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
      ],
    };

    // Мокируем fetch для возврата mockData в случае успеха
    global.fetch.mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
      status: 200,
    } as Response); // Явное указание на тип Response

    render(<App />);
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
    // Мокируем fetch для имитации ошибки
    global.fetch.mockRejectedValueOnce(new Error('API is down'));

    render(<App />);

    const errorButton = screen.getByText('Trigger Error');
    fireEvent.click(errorButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Something went wrong/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('renders NotFound component for unknown route', () => {
    render(<App />, { route: '/unknown' });

    const notFoundMessage = screen.getByText('404 Not Found');
    expect(notFoundMessage).toBeInTheDocument();
  });
});
