'use client';

export default function IssueDetailError({ error }: { error: Error }) {
  return <div>IssueDetailError: {error.message}</div>;
}
