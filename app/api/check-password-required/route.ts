import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { pageSlug } = await request.json();
    
    // Check if password environment variable exists for this page
    const passwordEnvVar = `PROJECT_PASSWORD_${pageSlug.toUpperCase().replace(/-/g, '_')}`;
    const requiredPassword = process.env[passwordEnvVar];
    
    return NextResponse.json({
      requiresPassword: !!requiredPassword
    });
  } catch (error) {
    console.error('Error checking password requirement:', error);
    return NextResponse.json(
      { requiresPassword: false },
      { status: 500 }
    );
  }
}