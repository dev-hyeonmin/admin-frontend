'use client';

import PageTitle from '@/components/PageTitle';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBranch } from '@/app/admin/branch/action';
import BranchForm from '@/app/admin/branch/_components/BranchForm';

export default function BranchFormPage() {
  const params = useParams();
  const id = Number(params.id?.[0]);

  const [branch, setBranch] = useState<{ id: number; name: string }>();

  useEffect(() => {
    if (!id) return;

    const loadBranch = async () => {
      try {
        const branch = await getBranch(id);
        if (!branch) return;

        setBranch({
          ...branch,
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadBranch().then(() => {
      console.log('Load Branch Success!');
    });
  }, [id]);

  return (
    <div>
      <PageTitle title="" subTitle="" />
      <BranchForm {...branch} />
    </div>
  );
}
