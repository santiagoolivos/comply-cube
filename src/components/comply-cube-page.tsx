// app/page.tsx (o en la ruta que prefieras dentro del App Router)
'use client';
import React from 'react';
import { ClientForm } from './client-form/comply-cube-client-form';

export default function CreateClientPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create a New Client</h1>
        <p className="text-gray-600 text-center mb-6">
          Please fill out the form below to create a new client. Ensure all the information is accurate before submitting.
        </p>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Enter the client&apos;s personal information such as email, phone numbers, and date of joining.</li>
            <li>Fill out the personal details including first name, last name, date of birth, and nationality.</li>
            <li>Once all fields are filled, click the <strong>Submit</strong> button to create the client.</li>
            <li>Ensure the email and phone numbers are valid to avoid submission errors.</li>
          </ul>
        </div>

        <ClientForm />
      </div>
    </div>
  );
}
