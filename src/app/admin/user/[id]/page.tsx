import { notFound } from 'next/navigation';
import { getUser } from '@/app/admin/user/action';
import UserUpsertPage from '../_components/UserUpsertPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const user = await getUser(Number(id));

  if (!user) {
    notFound();
  }

  return <UserUpsertPage user={user} />;
}
