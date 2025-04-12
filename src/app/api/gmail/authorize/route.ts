import {google} from 'googleapis';
import {NextResponse} from 'next/server';

const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const GMAIL_REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;

if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REDIRECT_URI) {
  console.error(
    'Missing environment variables: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, or GMAIL_REDIRECT_URI'
  );
}

const oauth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI
);

export async function POST(request: Request) {
  try {
    const {code} = await request.json();
    const {tokens} = await oauth2Client.getToken(code);
    return NextResponse.json({token: tokens.access_token});
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return NextResponse.json({error: 'Failed to authorize'}, {status: 500});
  }
}
'