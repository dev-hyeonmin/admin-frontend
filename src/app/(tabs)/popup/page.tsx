import PopupPage from '@/app/(tabs)/popup/_components/PopupPage';

// TODO edit
// TODO cache @https://nextjs.org/docs/app/api-reference/functions/cacheTag
export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/popups`, {
    cache: 'no-store',
  });

  const { popups } = await res.json();

  return <PopupPage popups={popups} />;
}
