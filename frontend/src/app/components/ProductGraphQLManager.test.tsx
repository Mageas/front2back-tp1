import { render, screen } from '@testing-library/react';
import ProductGraphQLManager from './ProductGraphQLManager';
import { useSubscription } from '@apollo/client/react';

// Mock useSubscription
jest.mock('@apollo/client/react', () => ({
  useSubscription: jest.fn(),
}));

describe('ProductGraphQLManager', () => {
  it('renders loading state', () => {
    (useSubscription as unknown as jest.Mock).mockReturnValue({
      loading: true,
      data: null,
      error: null,
    });

    render(<ProductGraphQLManager />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useSubscription as unknown as jest.Mock).mockReturnValue({
      loading: false,
      data: null,
      error: { message: 'Test error' },
    });

    render(<ProductGraphQLManager />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('renders product list', () => {
    const mockData = {
      product: [
        {
          id: 1,
          name: 'Test Product',
          comment: 'Test Comment',
          quantity: 10,
          company_id: 1,
          company: { name: 'Test Company' },
        },
      ],
    };

    (useSubscription as unknown as jest.Mock).mockReturnValue({
      loading: false,
      data: mockData,
      error: null,
    });

    render(<ProductGraphQLManager />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/Test Comment/)).toBeInTheDocument();
    expect(screen.getByText(/Test Company/)).toBeInTheDocument();
  });
});
