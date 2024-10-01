export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Unexpected error occurred
        </h1>
        <p className="text-lg text-gray-700">
          Please try again later or contact support.
        </p>
      </div>
    </div>
  );
}
