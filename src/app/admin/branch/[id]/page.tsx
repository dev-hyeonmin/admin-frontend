import BranchUpsertPage from '@/app/admin/branch/_components/BranchUpsertPage';
import { getBranch } from '@/app/admin/branch/action';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const branch = await getBranch(Number(id));

  if (!branch) {
    notFound();
  }

  return <BranchUpsertPage branch={branch} />;
}
