import PageTitle from '@/components/PageTitle';
import PageFooter from '@/components/PageFooter';
import Link from 'next/link';
import UserList from './UserList';

export default async function UserPage() {
  return (
    <>
      <PageTitle title="Users" subTitle="Admin > Users" />

      <UserList />

      <PageFooter>
        <Link href={'/admin/user/create'} className="primary-button">
          사용자 추가
        </Link>
      </PageFooter>
    </>
  );
}
