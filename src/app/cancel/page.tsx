'use client';
import { FullScreen } from '@/components/full-screen';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();
  const hadleBackToForm = () => {
    router.push('/');
  };

  return (
    <FullScreen
      className="is-failure"
      icon={
        <IconExclamationCircle className="w-12 h-12 inline-block text-danger text-red-500" />
      }
      h1_text={'Client Verification Failed'}
      p_text={'Please try again or contact support'}
    >
      <div className="pt-5 text-sm">
        <button
          onClick={hadleBackToForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 min-w-24"
        >
          Back to Form
        </button>
      </div>
    </FullScreen>
  );
}
