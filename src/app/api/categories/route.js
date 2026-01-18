import { NextResponse } from 'next/server';
import items from '../../data/items.json';

export async function GET() {
  try {
    const categories = [...new Set(items.map(item => item.category))];
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching categories',
        error: error.message
      },
      { status: 500 }
    );
  }
}