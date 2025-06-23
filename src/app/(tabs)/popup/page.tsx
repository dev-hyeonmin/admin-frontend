import PopupPage from '@/app/(tabs)/popup/_components/PopupPage';

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/popups`, {
    cache: 'no-store',
  });

  const { popups } = await res.json();

  return <PopupPage popups={popups} />;
}
