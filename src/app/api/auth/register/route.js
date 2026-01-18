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

// Write users to JSON file
async function saveUsers(users) {
  try {
    const filePath = getUsersFilePath();
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
}

export async function POST(request) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required'
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Passwords do not match'
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password must be at least 6 characters long'
        },
        { status: 400 }
      );
    }

    // Get current users
    const users = await getUsers();

    // Check if user already exists
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email already exists'
        },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password, // In production, hash this password
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Save users back to file
    const saved = await saveUsers(users);
    if (!saved) {
      return NextResponse.json(
        {
          success: false,
          message: 'Error saving user data'
        },
        { status: 500 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        data: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error registering user',
        error: error.message
      },
      { status: 500 }
    );
  }
}