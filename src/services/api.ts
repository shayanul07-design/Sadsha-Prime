export interface CoachResponse {
  text: string;
  error?: string;
}

export async function getAICoaching(messages: { role: string, parts: { text: string }[] }[], userData: any): Promise<CoachResponse> {
  try {
    const response = await fetch('/api/ai/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, userData }),
    });

    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Coaching service error:', error);
    return { text: '', error: 'Failed to connect to Sadsha AI.' };
  }
}

export async function createSubscriptionSession(tier: string, months: number) {
  const response = await fetch('/api/payments/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tier, duration: months }),
  });
  return await response.json();
}
