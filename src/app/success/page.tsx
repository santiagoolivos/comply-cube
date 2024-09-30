'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
interface Check {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface CheckDetail {
  id: string;
  type: string;
  result: {
    outcome: string;
    breakdown: {
      faceAnalysis: {
        facialSimilarityScore: number;
      };
    };
  };
}

const SuccessPage = () => {
  const [checkDetail, setCheckDetail] = useState<CheckDetail | null>(null);
  const [clientChecks, setClientChecks] = useState<Check[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipient_id');
  const client_id = searchParams.get('client_id');
  console.log("recipientId:", recipientId);
  console.log("client_id:", client_id);

  useEffect(() => {
    if (!client_id) return;

    const fetchClientChecks = async () => {
      try {
        const response = await fetch(`/api/comply-cube/client?clientId=${client_id}`);

        if (!response.ok) {
          throw new Error(`Error fetching client checks: ${response.status}`);
        }

        const checksData = await response.json();
        console.log("Client checks:", checksData);
        const firstCheck = checksData.items[0];

        const checkDetailResponse = await fetch(`/api/comply-cube/checks?checkId=${firstCheck.id}`);

        if (!checkDetailResponse.ok) {
          throw new Error(`Error fetching check details: ${checkDetailResponse.status}`);
        }

        const checkDetailData = await checkDetailResponse.json();
        console.log("Check detail:", checkDetailData);
        setCheckDetail(checkDetailData);

        const createdCeremonyResponse = await fetch(`/api/signatureapi/ceremony/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              recipientId: recipientId,
              ceremonyData: {
                authentication: {
                  type: "custom",
                  provider: "acme",
                  data: {
                    checkId: checkDetailData.id,
                    type: checkDetailData.type,
                    facialSimilarityScore: `${checkDetailData.result.breakdown.faceAnalysis.breakdown.facialSimilarityScore}`,
                    livenessCheckScore: `${checkDetailData.result.breakdown.authenticityAnalysis.breakdown.livenessCheckScore}`,
                  },
                },
                redirect_url: `http://localhost:3004/`,
                embeddable_in: ['http://localhost:3004/success'],
              }
          }),
        });

        if (!createdCeremonyResponse.ok) {
          throw new Error(`Error creating ceremony: ${createdCeremonyResponse.status}`);
        }
        const ceremonyData = await createdCeremonyResponse.json();
        console.log("Session created successfully:", ceremonyData);

        console.log("createdCeremonyResponse:", createdCeremonyResponse);

        window.location.href = ceremonyData.url;
      } catch (error) {
        console.error("Error fetching client checks:", error);
      }
    };

    fetchClientChecks();
  }, [client_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Client Checks</h1>
      {clientChecks.length === 0 ? (
        <p>No checks found for this client.</p>
      ) : (
        <ul>
          {clientChecks.map((check) => (
            <li key={check.id}>
              <strong>ID:</strong> {check.id} <br />
              <strong>Status:</strong> {check.status} <br />
              <strong>Created At:</strong> {check.createdAt} <br />
              <strong>Updated At:</strong> {check.updatedAt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuccessPage;
