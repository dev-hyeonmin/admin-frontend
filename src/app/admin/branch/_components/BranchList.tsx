import BranchItem from '@/app/admin/branch/_components/BranchItem';
import { Branch } from '@/types/branch';
import { getBranches } from '@/app/admin/branch/action';

export default async function BranchList() {
  // TODO loading
  const branches: Branch[] = await getBranches();

  return (
    <div className="space-y-2">
      {branches.map((branch) => (
        <BranchItem key={`branch${branch.id}`} {...branch} />
      ))}
    </div>
  );
}
