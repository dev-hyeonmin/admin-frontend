'use client';

import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import { handleLogin } from '@/app/(auth)/login/action';
import { useActionState } from 'react';
import { Shield } from 'lucide-react';

// 초기 상태 설정
const initialState = { email: '', password: '', error: {} };

export default function Login() {
  const [state, action] = useActionState(handleLogin, initialState);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8">
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-2 flex items-center gap-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <div className="flex flex-col">
              <p className="text-lg text-gray-600">안녕하세요, 관리자님 👋</p>
              <p className="text-sm text-gray-500">로그인하고 클리닉을 관리해보세요</p>
            </div>
          </div>
        </div>

        <form action={action} className="space-y-4">
          <FormInput
            type="email"
            placeholder="이메일"
            name="email"
            defaultValue={state?.email as string}
            errors={state?.error?.email}
            className="h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none"
          />

          <FormInput
            type="password"
            placeholder="비밀번호"
            name="password"
            defaultValue={state?.password as string}
            errors={state?.error?.password}
            className="h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none"
          />

          <FormButton type="submit" text="로그인" fullWidth={true} variant="primary" />
          <FormButton
            type="button"
            text="비밀번호 찾기"
            loadingText="비밀번호 찾기"
            fullWidth={true}
            variant="secondary"
          />
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <a
              href="mailto:dev.hyeonmin@gmail.com"
              className="text-blue-600 transition-colors hover:text-blue-700"
            >
              관리자에게 문의하세요
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
