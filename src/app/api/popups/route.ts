import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryBranchId = searchParams.get('branchId');

    const branchId = queryBranchId ? parseInt(queryBranchId, 10) : undefined;

    const popups = await db.popup.findMany({
      where: {
        ...(branchId ? { branchId } : {}),
        deleted_at: null,
      },
      select: {
        id: true,
        title: true,
        image_url: true,
        order: true,
        created_at: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json({ popups }, { status: 200 });
  } catch (error) {
    console.error('Error fetching popups:', error);
    return NextResponse.json({ error: 'Failed to fetch popups' }, { status: 500 });
  }
}
