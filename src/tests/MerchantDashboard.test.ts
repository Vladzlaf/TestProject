import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DealService } from '@/domain/services/DealService';
import { auth } from '@/infrastructure/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// Mock the dependencies
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  getDoc: jest.fn(),
  doc: jest.fn(),
}));
jest.mock('@/domain/services/DealService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('MerchantDashboard', () => {
  let mockRouterPush: jest.Mock;
  let mockDealService: jest.Mocked<DealService>;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    mockDealService = new DealService() as jest.Mocked<DealService>;
    (mockDealService.getDealsByMerchant as jest.Mock).mockResolvedValue([
      { id: '1', title: 'Deal 1' },
      { id: '2', title: 'Deal 2' },
    ]);
    (mockDealService.getCurrentUser as jest.Mock).mockResolvedValue({
      id: 'merchant-id-123',
      role: 'Merchant',
    });

    (getDoc as jest.Mock).mockResolvedValue({
      data: jest.fn().mockReturnValue({ role: 'merchant' }),
    });
  });

  it('renders Merchant Dashboard for merchant and fetches deals', async () => {
    render(<MerchantDashboard />);

    // Assert that it shows "Merchant Dashboard"
    expect(screen.getByText('Merchant Dashboard')).toBeInTheDocument();

    // Wait for deals to load and check if they are displayed
    await waitFor(() => expect(screen.getByText('Deal 1')).toBeInTheDocument());
    expect(screen.getByText('Deal 2')).toBeInTheDocument();
  });

  it('redirects to log-in if no user is authenticated', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => callback(null));

    render(<MerchantDashboard />);

    await waitFor(() => {
      // Ensure router.push to '/log-in' was called
      expect(mockRouterPush).toHaveBeenCalledWith('/log-in');
    });
  });

  it('enrolls in a deal when "Enroll" button is clicked', async () => {
    render(<MerchantDashboard />);

    // Wait for deals to load
    await waitFor(() => screen.getByText('Deal 1'));

    const enrollButton = screen.getAllByText('Enroll')[0];
    fireEvent.click(enrollButton);

    // Ensure enrollInDeal is called with correct arguments
    await waitFor(() => {
      expect(mockDealService.enrollInDeal).toHaveBeenCalledWith('merchant-id-123', '1');
    });
  });

  it('shows access denied for non-merchant users', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      data: jest.fn().mockReturnValue({ role: 'customer' }),
    });

    render(<MerchantDashboard />);

    await waitFor(() => {
      // Ensure "Access denied!" is alerted
      expect(screen.queryByText('Access denied!')).toBeInTheDocument();
    });
  });
});
