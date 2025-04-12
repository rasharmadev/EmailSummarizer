'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import GmailAuth from '@/app/gmail-auth';
import {useEffect, useState} from 'react';

export default function Home() {
  const [gmailToken, setGmailToken] = useState<string | null>(null);

  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      setGmailToken(localStorage.getItem('gmail_access_token'));
    }
  }, []);

  const handleAuthSuccess = (token: string) => {
    setGmailToken(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gmail_access_token', token);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>NextGen Starter</CardTitle>
          <CardDescription>
            A Next.js starter with Tailwind CSS, TypeScript, and Shadcn UI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!gmailToken ? (
            <GmailAuth onAuthSuccess={handleAuthSuccess} />
          ) : (
            <p>Gmail Authorized!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
