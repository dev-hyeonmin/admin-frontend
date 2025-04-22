import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  return Response.json({
    ok: true,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  return Response.json({
    ok: true,
  });
}
