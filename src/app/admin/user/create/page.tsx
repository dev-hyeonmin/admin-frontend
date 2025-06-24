import UserUpsertPage from '@/app/admin/user/_components/UserUpsertPage';

export default function UserFormPage() {
  //
  // useEffect(
  //   function getMemberInfo() {
  //     if (!id) return;
  //
  //     const loadUser = async () => {
  //       try {
  //         const user = await getUser(id);
  //         if (!user) return;
  //
  //         setUser({
  //           ...user,
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //
  //     loadUser().then(() => {
  //       console.log('Load User Success!');
  //     });
  //   },
  //   [id]
  // );

  return <UserUpsertPage />;
}
