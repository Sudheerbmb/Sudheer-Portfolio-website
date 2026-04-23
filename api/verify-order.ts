import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { order_id } = req.query;

  if (!order_id) {
    return res.status(400).json({ message: 'Order ID is required' });
  }

  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  const env = process.env.CASHFREE_ENV || 'SANDBOX';

  const url = env === 'PRODUCTION' 
    ? `https://api.cashfree.com/pg/orders/${order_id}` 
    : `https://sandbox.cashfree.com/pg/orders/${order_id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-client-id': appId!,
        'x-client-secret': secretKey!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree Error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Order verification failed:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
