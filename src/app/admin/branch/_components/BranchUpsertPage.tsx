// 'use client';
import { Branch } from '@/types/branch';
import PageTitle from '@/components/PageTitle';
import BranchForm from '@/app/admin/branch/_components/BranchForm';

interface BranchUpsertPageProps {
  branch?: Branch;
}

export default function BranchUpsertPage({ branch }: BranchUpsertPageProps) {
  return (
    <>
      <PageTitle title={branch ? 'Edit Branch' : 'Create Branch'} subTitle="" />
      <BranchForm id={branch?.id} name={branch?.name} />
    </>
  );
}
