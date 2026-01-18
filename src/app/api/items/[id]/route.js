import { NextResponse } from 'next/server';
import items from '../../../data/items.json';

export async function GET(request, { params }) {
  try {
    const itemId = parseInt(params.id);
    const item = items.find(item => item.id === itemId);

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message: 'Item not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching item',
        error: error.message
      },
      { status: 500 }
    );
  }
}