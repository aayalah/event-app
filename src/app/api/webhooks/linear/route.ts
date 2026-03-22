import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();

  // Verify Linear webhook signature
  const signature = req.headers.get('linear-signature');
  if (process.env.LINEAR_WEBHOOK_SECRET) {
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }
    const hmac = crypto.createHmac('sha256', process.env.LINEAR_WEBHOOK_SECRET);
    const digest = hmac.update(body).digest('hex');
    if (digest !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  const payload = JSON.parse(body);

  // Only handle issue creation events
  if (payload.type !== 'Issue' || payload.action !== 'create') {
    return NextResponse.json({ ok: true });
  }

  const issue = payload.data;
  const branch = `${issue.identifier.toLowerCase()}-${issue.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)}`;

  const repoOwner = process.env.GITHUB_REPO_OWNER;
  const repoName = process.env.GITHUB_REPO_NAME;
  const githubToken = process.env.GITHUB_TOKEN_WEBHOOK;

  if (!repoOwner || !repoName || !githubToken) {
    console.error('Missing required env vars: GITHUB_REPO_OWNER, GITHUB_REPO_NAME, GITHUB_TOKEN_WEBHOOK');
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'linear-issue',
        client_payload: {
          issue_id: issue.identifier,
          title: issue.title,
          description: issue.description ?? '',
          url: issue.url,
          branch,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to trigger GitHub Action:', error);
    return NextResponse.json({ error: 'Failed to trigger workflow' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
