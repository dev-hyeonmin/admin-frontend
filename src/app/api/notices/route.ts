import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const [notices, total] = await Promise.all([
      db.notice.findMany({
        where: {
          deleted_at: null,
        },
        orderBy: [{ is_pinned: 'desc' }, { created_at: 'desc' }],
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          content: true,
          image_url: true,
          is_pinned: true,
          created_at: true,
          updated_at: true,
        },
      }),
      db.notice.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return NextResponse.json({
      notices,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('공지사항 목록 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '공지사항 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
