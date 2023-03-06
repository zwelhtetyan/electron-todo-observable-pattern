export default function IssueDetail({
  params: { issueId },
}: {
  params: { issueId: string };
}) {
  return <div>IssueDetail for {issueId}</div>;
}
