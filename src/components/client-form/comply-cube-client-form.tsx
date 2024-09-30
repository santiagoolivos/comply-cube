'use client';

import { useState } from "react";

interface PersonDetails {
  firstName: string;
  lastName: string;
  dob: string;  
  nationality: string;
}

interface FormData {
  type: string;
  email: string;
  mobile: string;
  telephone: string;
  joinedDate: string;
  personDetails: PersonDetails;
}

export const ClientForm = () => {
  const [formData, setFormData] = useState<FormData>({
    type: "person",
    email: "",
    mobile: "",
    telephone: "",
    joinedDate: "",
    personDetails: {
      firstName: "",
      lastName: "",
      dob: "",
      nationality: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof FormData
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handlePersonDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof PersonDetails
  ) => {
    setFormData({
      ...formData,
      personDetails: {
        ...formData.personDetails,
        [key]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const clientResponse = await fetch("/api/comply-cube/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Request:", clientResponse);

      if (!clientResponse.ok) {
        throw new Error(`Error: ${clientResponse.status}`);
      }
      console.log("clientResponse:", clientResponse);

      if (!clientResponse.ok) {
        throw new Error(`Error: ${clientResponse.status}`);
      }

      const complyClient = await clientResponse.json();
      console.log("Client created successfully:", complyClient);


      const createdEnvelope = await fetch("/api/signatureapi/envelopes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: 'Client Onboarding',
          documents: [
            {
              url: "https://signatureapi-test-files.s3.us-east-2.amazonaws.com/mars_cover.pdf",
            },
          ],
          recipients: [
            {
              type: "signer",
              key: "company",
              name: formData.personDetails.firstName + ' ' + formData.personDetails.lastName,
              email: formData.email,
              ceremony_creation: 'manual'
            },
          ],
        }),
      });

      console.log("Request:", createdEnvelope);

      if (!createdEnvelope.ok) {
        throw new Error(`Error: ${createdEnvelope.status}`);
      }
      console.log("createdEnvelope:", createdEnvelope);

      if (!createdEnvelope.ok) {
        throw new Error(`Error: ${createdEnvelope.status}`);
      }
      console.log("Request:", createdEnvelope);

      const signatureApiEnvelope = await createdEnvelope.json();
      console.log("Client created successfully:", signatureApiEnvelope);


      const sessionResponse = await fetch("/api/comply-cube/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "clientId": `${complyClient.id}`,
          "checkTypes": [
              "identity_check"
          ],
          "enableMonitoring": false,
          "successUrl": `http://localhost:3004/success?client_id=${complyClient.id}&recipient_id=${signatureApiEnvelope.recipients[0].id}`,
          "cancelUrl": "http://localhost:3004/cancel",
          "language": "en",
          "theme": "light"
        }),
      });
      console.log("Request:", sessionResponse);

      if (!sessionResponse.ok) {
        throw new Error(`Error: ${sessionResponse.status}`);
      }
      const sessionData = await sessionResponse.json();
      console.log("Session created successfully:", sessionData);

      console.log("sessionResponse:", sessionResponse);

      window.location.href = sessionData.redirectUrl;
      if (!sessionResponse.ok) {
        throw new Error(`Error: ${sessionResponse.status}`);
      }
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange(e, "email")}
          required
          className="p-2 border rounded-md"
        />

        <label htmlFor="mobile" className="text-sm font-medium">
          Mobile
        </label>
        <input
          type="tel"
          id="mobile"
          value={formData.mobile}
          onChange={(e) => handleInputChange(e, "mobile")}
          required
          className="p-2 border rounded-md"
        />

        <label htmlFor="telephone" className="text-sm font-medium">
          Telephone
        </label>
        <input
          type="tel"
          id="telephone"
          value={formData.telephone}
          onChange={(e) => handleInputChange(e, "telephone")}
          required
          className="p-2 border rounded-md"
        />

        <label htmlFor="joinedDate" className="text-sm font-medium">
          Joined Date
        </label>
        <input
          type="date"
          id="joinedDate"
          value={formData.joinedDate}
          onChange={(e) => handleInputChange(e, "joinedDate")}
          required
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="firstName" className="text-sm font-medium">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.personDetails.firstName}
          onChange={(e) => handlePersonDetailsChange(e, "firstName")}
          required
          className="p-2 border rounded-md"
        />

        <label htmlFor="lastName" className="text-sm font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.personDetails.lastName}
          onChange={(e) => handlePersonDetailsChange(e, "lastName")}
          required
          className="p-2 border rounded-md"
        />

        <label htmlFor="dob" className="text-sm font-medium">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          value={formData.personDetails.dob}
          onChange={(e) => handlePersonDetailsChange(e, "dob")}
          required
          className="p-2 border rounded-md"
        />

        <label htmlFor="nationality" className="text-sm font-medium">
          Nationality
        </label>
        <input
          type="text"
          id="nationality"
          value={formData.personDetails.nationality}
          onChange={(e) => handlePersonDetailsChange(e, "nationality")}
          required
          className="p-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};
