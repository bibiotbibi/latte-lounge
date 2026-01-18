import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'LatteLounge API is running!',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    type: 'Next.js API Routes'
  });
}