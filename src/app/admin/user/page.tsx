import PageTitle from '@/components/PageTitle';
import PageFooter from '@/components/PageFooter';
import Link from 'next/link';
import UserList from './_components/UserList';

export default async function UserPage() {
  return (
    <div>
      <PageTitle title="" subTitle="" />
      <UserList />
      <PageFooter>
        <Link href={'/admin/user/form'} className="primary-button">
          사용자 추가
        </Link>
      </PageFooter>
    </div>
  );
}
