import db from '@/lib/db';
import { formatDate } from '@/lib/utils';
import BranchItem from '@/app/admin/branch/_components/BranchItem';

const getBranches = async () => {
  return db.branch.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

export default async function BranchList() {
  const branches = await getBranches();

  return (
    <div className="flex gap-4">
      {branches.map((branch) => (
        <BranchItem
          key={`branch${branch.id}`}
          id={branch.id}
          name={branch.name}
          createdAt={formatDate(branch.created_at)}
        />
      ))}
    </div>
  );
}
