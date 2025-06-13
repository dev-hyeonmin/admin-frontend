import db from '@/lib/db';
import { formatDate } from '@/lib/utils';
import UserItem from '@/app/admin/user/_components/UserItem';

const getUsers = async () => {
  return db.user.findMany({
    // where: {
    //   deleted_at: null,
    // },
    include: {
      branch: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export default async function UserList() {
  const users = await getUsers();

  return (
    <div className="flex gap-4">
      {users.map((user) => (
        <UserItem
          key={`user${user.id}`}
          id={user.id}
          name={user.name}
          email={user.email}
          branchName={user.branch?.name}
          createdAt={formatDate(user.created_at)}
        />
      ))}
    </div>
  );
}
