import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { setToken } from '../api';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { fetchMe, openAuth } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = params.get('token');
    const err = params.get('error');
    if (err || !token) {
      setError('Google login failed. Please try again.');
      openAuth('login');
      return;
    }
    setToken(token);
    fetchMe().then((u) => {
      if (u) navigate('/dashboard', { replace: true });
      else {
        setError('Google login failed. Please try again.');
        openAuth('login');
      }
    });
  }, [params, fetchMe, navigate, openAuth]);

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center gap-4 px-4">
      <div className="animate-spin h-8 w-8 border-2 border-ping border-t-transparent rounded-full" />
      <p className="text-sm text-gray-500">
        {error || 'Signing you in with Google…'}
      </p>
    </div>
  );
};

export default GoogleCallback;
