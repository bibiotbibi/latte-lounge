import { NextResponse } from 'next/server';
import items from '../../data/items.json';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let filteredItems = [...items];

    // Filter by category
    if (category && category !== 'all') {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredItems = filteredItems.filter(item => item.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredItems = filteredItems.filter(item => item.price <= parseFloat(maxPrice));
    }

    return NextResponse.json({
      success: true,
      data: filteredItems,
      total: filteredItems.length
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching items',
        error: error.message
      },
      { status: 500 }
    );
  }
}