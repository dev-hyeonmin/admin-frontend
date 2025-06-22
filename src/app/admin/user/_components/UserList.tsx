import UserItem from '@/app/admin/user/_components/UserItem';
import { getUsers } from '@/app/admin/user/action';

export default async function UserList() {
  const users = await getUsers();

  return (
    <div className="flex gap-4">
      {users.map((user) => (
        <UserItem key={`user${user.id}`} {...user} />
      ))}
    </div>
  );
}
