import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductManager from './ProductManager';

// Mock fetch
global.fetch = jest.fn();

describe('ProductManager', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    // Default mock for initial fetch
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        data: [],
      }),
    });
  });

  it('renders product manager title', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: [],
      }),
    });

    render(<ProductManager />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
  });

  it('fetches and displays products', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Test Product',
        comment: 'Test Comment',
        quantity: 10,
        company_id: '1',
        company: { name: 'Test Company' },
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: mockProducts,
      }),
    });

    render(<ProductManager />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText(/Test Comment/)).toBeInTheDocument();
    });
  });

  it('adds a new product', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ // Initial load
        json: async () => ({ data: [] }),
      })
      .mockResolvedValueOnce({ // Add product
        json: async () => ({
          id: 2,
          name: 'New Product',
          comment: 'New Comment',
          quantity: 5,
          company_id: '2',
          company: { name: 'New Company' }, // Mocking backend response structure
        }),
      });

    render(<ProductManager />);

    // Wait for initial load
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByPlaceholderText('Comment'), { target: { value: 'New Comment' } });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Company id'), { target: { value: '2' } });

    fireEvent.click(screen.getByText('Add Product'));

    await waitFor(() => {
      expect(screen.getByText('New Product')).toBeInTheDocument();
    });
  });

  it('deletes a product', async () => {
     const mockProducts = [
      {
        id: 1,
        name: 'Product to Delete',
        comment: 'Comment',
        quantity: 10,
        company_id: '1',
        company: { name: 'Company' },
      },
    ];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ // Initial load
        json: async () => ({ data: mockProducts }),
      })
      .mockResolvedValueOnce({}); // Delete response

    render(<ProductManager />);

    await waitFor(() => {
      expect(screen.getByText('Product to Delete')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('Product to Delete')).not.toBeInTheDocument();
    });
  });
});
