import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import NotFound from './notFound';

describe('NotFound component', () => {
  it('renders page not found message', () => {
    const { getByText } = render(<NotFound />);

    const pageTitle = getByText(/Page not found/i);
    expect(pageTitle).toBeInTheDocument();

    const statusCode = getByText('404');
    expect(statusCode).toBeInTheDocument();
    expect(statusCode).toHaveClass('page-404');
  });
});
