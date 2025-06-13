import PageTitle from '@/components/PageTitle';
import PageFooter from '@/components/PageFooter';
import Link from 'next/link';
import BranchList from './_components/BranchList';

export default async function BranchPage() {
  return (
    <div>
      <PageTitle title="" subTitle="" />
      <BranchList />
      <PageFooter>
        <Link href={'/branch/form'} className="primary-button">
          지점 추가
        </Link>
      </PageFooter>
    </div>
  );
}
