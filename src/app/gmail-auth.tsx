'use client';

import {useEffect, useState} from 'react';

const GMAIL_CLIENT_ID = process.env.NEXT_PUBLIC_GMAIL_CLIENT_ID;
const GMAIL_REDIRECT_URI = process.env.NEXT_PUBLIC_GMAIL_REDIRECT_URI;

interface GmailAuthProps {
  onAuthSuccess: (token: string) => void;
}

export default function GmailAuth({onAuthSuccess}: GmailAuthProps) {
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!GMAIL_CLIENT_ID || !GMAIL_REDIRECT_URI) {
      console.error(
        'Missing environment variables: NEXT_PUBLIC_GMAIL_CLIENT_ID or NEXT_PUBLIC_GMAIL_REDIRECT_URI'
      );
      return;
    }

    const generateAuthUrl = () => {
      const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GMAIL_CLIENT_ID}&redirect_uri=${GMAIL_REDIRECT_URI}&response_type=code&scope=${scopes.join(
        ' '
      )}&access_type=offline`;
      setAuthUrl(authUrl);
    };

    generateAuthUrl();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      const fetchToken = async () => {
        try {
          const response = await fetch('/api/gmail/authorize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({code}),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.token) {
            localStorage.setItem('gmail_access_token', data.token);
            onAuthSuccess(data.token);
          } else {
            console.error('Failed to retrieve token:', data);
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };
      fetchToken();
    }
  }, [onAuthSuccess]);

  const handleAuthClick = () => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  return (
    <div>
      {authUrl ? (
        <button onClick={handleAuthClick}>Authorize Gmail Account</button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
