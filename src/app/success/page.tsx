'use client';
import { SuccessVerificationStep } from '@/components/success/success-verification';
import { Suspense } from 'react';


const SuccessPage = () => {

  return (
    <Suspense>
      <SuccessVerificationStep/>
    </Suspense>
  );
};

export default SuccessPage;
