import NoticePage from '@/app/(tabs)/notice/_components/NoticePage';

export default async function Notice({ params }: { params: { page?: number } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/notices`, {
    cache: 'no-store',
  });

  const { notices } = await res.json();

  return <NoticePage notices={notices} />;
}
