import { useSearchParams } from 'next/navigation';

export const SuccessCompleteFlow = () => {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipient_id');
  const ceremonyResult = searchParams.get('ceremony_result');
  const envelopeId = searchParams.get('envelope_id');

  return (
    <>
      <p className="text-lg">
        <strong>Ceremony Result:</strong> {ceremonyResult || 'Loading...'}
      </p>
      <p className="text-lg">
        <strong>Envelope ID:</strong> {envelopeId || 'Loading...'}
      </p>
      <p className="text-lg">
        <strong>Recipient ID:</strong> {recipientId || 'Loading...'}
      </p>
    </>
  );
};
