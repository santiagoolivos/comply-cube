'use client';

import { SuccessCompleteFlow } from '@/components/success/success-complete-flow';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const RedirectPage = () => {
  const router = useRouter();


  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Ceremony with ComplyCube completed successfully</h1>
          <h2 className="text-lg font-semibold mb-4">Ceremony Details:</h2>

        <SuccessCompleteFlow />
          <button
            onClick={handleGoHome}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default RedirectPage;
