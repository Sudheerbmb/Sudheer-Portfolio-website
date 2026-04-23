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

  const baseUrl = env === 'PRODUCTION' 
    ? 'https://api.cashfree.com/pg' 
    : 'https://sandbox.cashfree.com/pg';

  const headers = {
    'x-client-id': appId!,
    'x-client-secret': secretKey!,
    'x-api-version': '2023-08-01',
    'Content-Type': 'application/json',
  };

  try {
    // 1. Fetch Order Details
    const orderResponse = await fetch(`${baseUrl}/orders/${order_id}`, {
      method: 'GET',
      headers,
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error('Cashfree Order Error:', orderData);
      return res.status(orderResponse.status).json(orderData);
    }

    // 2. Fetch Payment Details for this Order
    const paymentsResponse = await fetch(`${baseUrl}/orders/${order_id}/payments`, {
      method: 'GET',
      headers,
    });

    const paymentsData = await paymentsResponse.json();

    // Combine order data with its latest successful payment
    const latestPayment = Array.isArray(paymentsData) 
      ? paymentsData.find(p => p.payment_status === 'SUCCESS') || paymentsData[0]
      : null;

    return res.status(200).json({
      ...orderData,
      payment_details: latestPayment
    });
  } catch (error) {
    console.error('Order verification failed:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
