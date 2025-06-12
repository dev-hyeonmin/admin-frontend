import db from '@/lib/db';

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
    <>
      {branches.map((branch) => (
        <div key={`branch${branch.id}`}>{branch.name}</div>
      ))}
    </>
  );
}
