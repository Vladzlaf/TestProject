import { getFunctions, httpsCallable } from 'firebase/functions';
import { Deal } from '../../domain/entities/Deal';

export class EmailService {
  private functions;

  constructor() {
    this.functions = getFunctions();
  }

  async sendRedemptionEmail(userEmail: string, deal: Deal) {
    const sendEmail = httpsCallable(this.functions, 'sendEmail');

    const emailData = {
      to: userEmail,
      subject: 'You have enrolled in a deal!',
      text: `Congratulations! You have enrolled in the deal "${deal.title}". Here is how to redeem it: ${deal.description}.`,
    };

    try {
      const response = await sendEmail(emailData);
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}