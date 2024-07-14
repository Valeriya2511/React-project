import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  let originalConsoleError: typeof console.error;

  beforeAll(() => {
    originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('should render children normally when no error is thrown', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>This is a child component</div>
      </ErrorBoundary>
    );

    expect(getByText('This is a child component')).toBeInTheDocument();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should display an error message when an error is thrown in child components', () => {
    const ChildComponent = () => {
      throw new Error('Test error');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(
      getByText('Something went wrong.(ErrorBoundary)')
    ).toBeInTheDocument();
    expect(getByText('Please try refreshing the page.')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});
