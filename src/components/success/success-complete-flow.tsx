// import { useSearchParams } from 'next/navigation';

// export const SuccessCompleteFlow = () => {
//   const searchParams = useSearchParams();
//   const recipientId = searchParams.get('recipient_id');
//   const ceremonyResult = searchParams.get('ceremony_result');
//   const envelopeId = searchParams.get('envelope_id');

//   return (
//     <>
//       <p className="text-lg">
//         <strong>Ceremony Result:</strong> {ceremonyResult || 'Loading...'}
//       </p>
//       <p className="text-lg">
//         <strong>Envelope ID:</strong> {envelopeId || 'Loading...'}
//       </p>
//       <p className="text-lg">
//         <strong>Recipient ID:</strong> {recipientId || 'Loading...'}
//       </p>
//     </>
//   );
// };

import { useSearchParams } from 'next/navigation';

export const SuccessCompleteFlow = () => {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipient_id');
  const ceremonyResult = searchParams.get('ceremony_result');
  const envelopeId = searchParams.get('envelope_id');

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 items-start">
        <tbody className="text-start text-sm ">
          <tr>
            <td className="px-4 py-2 border ">Ceremony Result</td>
            <td className="px-4 py-2 border ">
              {ceremonyResult || 'Loading...'}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border ">Envelope ID</td>
            <td className="px-4 py-2 border ">{envelopeId || 'Loading...'}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border ">Recipient ID</td>
            <td className="px-4 py-2 border ">{recipientId || 'Loading...'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
