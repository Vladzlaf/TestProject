import { render, screen, fireEvent } from '@testing-library/react';
import LogInForm from '@/components/LogInForm';
import { sendLoginLink } from '@/infrastructure/auth/auth';

jest.mock('@/infrastructure/auth/auth', () => ({
  sendLoginLink: jest.fn(),
}));

describe('LogInForm', () => {
  it('renders the login form', () => {
    render(<LogInForm />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    expect(emailInput).toBeInTheDocument();
  });

  it('submits the form with an email', () => {
    render(<LogInForm />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByText('Send Login Link');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    expect(sendLoginLink).toHaveBeenCalledWith('test@example.com');
  });
});
