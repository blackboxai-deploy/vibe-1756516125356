import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'RunFuture Economy System',
    version: '1.0.0',
    components: {
      database: 'not_configured',
      ai_services: 'available',
      cache: 'not_configured',
      payments: 'not_configured'
    }
  });
}