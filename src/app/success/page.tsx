'use client';
import { ClipLoader } from 'react-spinners';
import { useState } from "react";
import { useSuccessVerification } from '@/hooks/useSuccessVerification';


const SuccessPage = () => {
  const [loading, setLoading] = useState(true);
  useSuccessVerification({ setLoading });

  if (loading) {
    return (
      <div className="flex container mx-auto py-10 items-center justify-center min-h-screen">
        <ClipLoader size={40} />
      </div>
    );
  }

  return null;
};

export default SuccessPage;
