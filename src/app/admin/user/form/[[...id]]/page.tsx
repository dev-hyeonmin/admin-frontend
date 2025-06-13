'use client';

import PageTitle from '@/components/PageTitle';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUser } from '@/app/admin/user/action';
import UserForm from '@/app/admin/user/_components/UserForm';
import { getBranches } from '@/app/admin/branch/action';

export default function UserFormPage() {
  const params = useParams();
  const id = Number(params.id?.[0]);

  const [user, setUser] = useState<{ id: number; name: string; email: string; branchId: number }>();
  const [branches, setBranches] = useState<
    { id: number; name: string; uuid: string; created_at: Date; deleted_at: Date | null }[]
  >([]);

  useEffect(function getBranchList() {
    const loadData = async () => {
      try {
        const data = await getBranches();

        setBranches(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData().then(() => {
      console.log('Load Branches Success!');
    });
  }, []);

  useEffect(
    function getMemberInfo() {
      if (!id) return;

      const loadUser = async () => {
        try {
          const user = await getUser(id);
          if (!user) return;

          setUser({
            ...user,
          });
        } catch (error) {
          console.log(error);
        }
      };

      loadUser().then(() => {
        console.log('Load User Success!');
      });
    },
    [id]
  );

  return (
    <div>
      <PageTitle title="" subTitle="" />
      <UserForm {...user} branches={branches} />
    </div>
  );
}
