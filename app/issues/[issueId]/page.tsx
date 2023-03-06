export default async function IssueDetail({
  params: { issueId },
}: {
  params: { issueId: string };
}) {
  const wait = () =>
    new Promise((resolve, reject) => setTimeout(() => resolve('done'), 1000));

  // await wait();

  // throw new Error('error is here');

  return <div>IssueDetail for {issueId}</div>;
}
