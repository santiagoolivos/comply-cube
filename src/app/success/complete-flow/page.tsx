'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipient_id');
  const ceremonyResult = searchParams.get('ceremony_result');
  const envelopeId = searchParams.get('envelope_id');


  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Ceremony with ComplyCube completed successfully</h1>
        <h2 className="text-lg font-semibold mb-4">Ceremony Details:</h2>

        <p className="text-lg">
          <strong>Ceremony Result:</strong> {ceremonyResult || 'Loading...'}
        </p>
        <p className="text-lg">
          <strong>Envelope ID:</strong> {envelopeId || 'Loading...'}
        </p>
        <p className="text-lg">
          <strong>Recipient ID:</strong> {recipientId || 'Loading...'}
        </p>

        <button
          onClick={handleGoHome}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default RedirectPage;
