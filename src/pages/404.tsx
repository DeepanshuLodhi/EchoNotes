import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <Link href="/" className="mt-8 inline-block text-blue-600 hover:text-blue-500">
          Go back home
        </Link>
      </div>
    </div>
  );
}