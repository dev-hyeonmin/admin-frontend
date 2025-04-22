'use server';

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(formData.get('email'), formData.get('password'));

  return {
    errors: ['wrong password'],
  };
};
