import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { pageSlug, password } = await request.json();
    
    // Get the required password from environment variables
    const passwordEnvVar = `PROJECT_PASSWORD_${pageSlug.toUpperCase().replace(/-/g, '_')}`;
    const requiredPassword = process.env[passwordEnvVar];
    
    if (!requiredPassword) {
      // No password required for this page
      return NextResponse.json({ success: true });
    }
    
    const isValid = password === requiredPassword;
    
    return NextResponse.json({
      success: isValid
    });
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}