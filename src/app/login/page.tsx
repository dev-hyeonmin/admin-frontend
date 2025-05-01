'use client';

import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';
import { useFormState } from 'react-dom';
import { handleLogin } from '@/app/login/action';
import { useActionState } from 'react';

// 초기 상태 설정
const initialState = { email: '', password: '', error: {} };

const Login = () => {
  const [state, dispatch] = useActionState(handleLogin, initialState);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-sm px-4">
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="#4287f5"
              />
            </svg>
            <span className="text-2xl font-bold text-gray-800">CLINIC:</span>
            <span className="text-2xl font-normal text-gray-500">ADMIN</span>
          </div>
        </div>

        <form action={dispatch}>
          <div className="space-y-3">
            <div>
              <FormInput
                type="email"
                placeholder="이메일"
                name="email"
                defaultValue={state?.email as string}
                errors={state?.error?.email}
              />
            </div>

            <div>
              <FormInput
                type="password"
                placeholder="비밀번호"
                name="password"
                defaultValue={state?.password as string}
                errors={state?.error?.password}
              />
            </div>

            <div>
              <FormButton type="submit" text="로그인" />
            </div>

            <div>
              <FormButton type="button" text="비밀번호 찾기" variant="secondary" />
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <a href="mailto:admin@dermaclinic.com" className="text-blue-500 hover:underline">
              관리자에게 문의하세요
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
