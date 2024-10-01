import React from 'react';
import { ClientForm } from './client-form/comply-cube-client-form';

export default function CreateClientPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Complete a New SignatureAPI Envelope with ComplyCube Verification
        </h1>
        <p className="text-center mb-6">
          Please fill out the form below to start the process. Make sure all the
          information is correct before submitting.
        </p>

        <ClientForm />
      </div>
    </div>
  );
}
