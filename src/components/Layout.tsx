
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use useCallback to memoize the checkAuth function
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/login' && router.pathname !== '/signup') {
      router.push('/login');
    } else if (token) {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Initial mount effect
  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, [checkAuth]);

  // Effect for pathname changes
  useEffect(() => {
    if (mounted) {
      checkAuth();
    }
  }, [router.pathname, mounted, checkAuth]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  // Handle initial server-side rendering
  if (!mounted) {
    return null;
  }

  // Don't show header on login and signup pages
  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthPage && (
        <nav className="bg-white shadow-lg mb-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-gray-800">AI Notes</span>
                </Link>
              </div>
              {isAuthenticated && (
                <div className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isAuthPage ? '' : 'py-6'}`}>
        {children}
      </main>
    </div>
  );
}