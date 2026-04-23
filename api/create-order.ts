import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount, customerName, customerEmail, customerPhone } = req.body;

  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  const env = process.env.CASHFREE_ENV || 'SANDBOX';

  const url = env === 'PRODUCTION' 
    ? 'https://api.cashfree.com/pg/orders' 
    : 'https://sandbox.cashfree.com/pg/orders';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-client-id': appId!,
        'x-client-secret': secretKey!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: 'INR',
        order_id: `order_${Date.now()}`,
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_email: customerEmail || 'test@gmail.com',
          customer_phone: customerPhone || '9999999999',
          customer_name: customerName || 'Anonymous',
        },
        order_meta: {
          return_url: `${req.headers.origin}/?order_id={order_id}`,
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree Error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Order creation failed:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
