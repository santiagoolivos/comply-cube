// app/page.tsx (o en la ruta que prefieras dentro del App Router)
'use client';
import React from 'react';
import { ClientForm } from './client-form/comply-cube-client-form';

export default function CreateClientPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Complete a new SignatureAPI Envelope with Comply Cube verification
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please fill out the form below to start the process. Ensure all the
          information is accurate before submitting.
        </p>

        <ClientForm />
      </div>
    </div>
  );
}
