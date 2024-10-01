'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SuccessVerificationProps {
  setLoading: (loading: boolean) => void;
}

export const useSuccessVerification = (props: SuccessVerificationProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipient_id');
  const client_id = searchParams.get('client_id');

  useEffect(() => {
    if (!client_id) return;

    const fetchClientChecks = async () => {
      try {
        const response = await fetch(`/api/comply-cube/client/${client_id}`);

        if (!response.ok) {
          throw new Error(`Error fetching client checks: ${response.status}`);
        }

        const checksData = await response.json();

        const firstCheck = checksData.items[0];

        const checkDetailResponse = await fetch(
          `/api/comply-cube/checks/${firstCheck.id}`
        );

        if (!checkDetailResponse.ok) {
          throw new Error(
            `Error fetching check details: ${checkDetailResponse.status}`
          );
        }

        const checkDetailData = await checkDetailResponse.json();

        const createdCeremonyResponse = await fetch(
          `/api/signatureapi/ceremony/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipientId: recipientId,
              ceremonyData: {
                authentication: {
                  type: 'custom',
                  provider: 'ComplyCube',
                  data: {
                    checkId: checkDetailData.id,
                    type: checkDetailData.type,
                    status: checkDetailData.status,
                    facialSimilarity: `${checkDetailData.result.breakdown.faceAnalysis.facialSimilarity}`,
                    livenessCheck: `${checkDetailData.result.breakdown.authenticityAnalysis.livenessCheck}`,
                  },
                },
                redirect_url: `${process.env.NEXT_PUBLIC_URL}/success/complete-flow`,
                embeddable_in: [`${process.env.NEXT_PUBLIC_URL}/success`],
              },
            }),
          }
        );

        if (!createdCeremonyResponse.ok) {
          throw new Error(
            `Error creating ceremony: ${createdCeremonyResponse.status}`
          );
        }
        const ceremonyData = await createdCeremonyResponse.json();

        props.setLoading(false);
        router.push(ceremonyData.url);
      } catch (error) {
        console.error('Error fetching client checks:', error);
      }
    };

    fetchClientChecks();
  }, [client_id]);
};
