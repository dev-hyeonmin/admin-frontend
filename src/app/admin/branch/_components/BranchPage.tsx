import PageTitle from '@/components/PageTitle';
import BranchList from '@/app/admin/branch/_components/BranchList';
import PageFooter from '@/components/PageFooter';
import Link from 'next/link';

export default function BranchPage() {
  return (
    <>
      <PageTitle title="Branch" subTitle="관리자 메뉴 > 지점관리" />

      <BranchList />

      <PageFooter>
        <Link href={'/admin/branch/create'} className="primary-button">
          지점 추가
        </Link>
      </PageFooter>
    </>
  );
}
