import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Get the path to the users.json file
const getUsersFilePath = () => {
  return path.join(process.cwd(), 'src/app/data/users.json');
};

// Read users from JSON file
async function getUsers() {
  try {
    const filePath = getUsersFilePath();
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading users file:', error);
    // Return default users if file doesn't exist or can't be read
    return [
      {
        id: "1",
        email: "admin@lattelounge.com",
        password: "password123",
        name: "Admin User",
        role: "admin",
        createdAt: "2024-01-01T00:00:00.000Z"
      },
      {
        id: "2",
        email: "user@lattelounge.com",
        password: "user123",
        name: "Regular User",
        role: "user",
        createdAt: "2024-01-01T00:00:00.000Z"
      }
    ];
  }
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and password are required'
        },
        { status: 400 }
      );
    }

    // Get users
    const users = await getUsers();

    const user = users.find(
      user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password'
        },
        { status: 401 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error logging in',
        error: error.message
      },
      { status: 500 }
    );
  }
}