import { Branch } from '@/types/branch';
import { getBranches } from '@/app/admin/branch/action';
import PageTitle from '@/components/PageTitle';
import { UserData } from '@/types/user';
import UserForm from '@/app/admin/user/_components/UserForm';

interface UserUpsertPageProps {
  user?: UserData;
}

export default async function UserUpsertPage({ user }: UserUpsertPageProps) {
  const branches: Branch[] = await getBranches();

  return (
    <>
      <PageTitle title={user ? 'Edit User' : 'Create User'} subTitle="" />
      <UserForm branches={branches} user={user} />
    </>
  );
}
