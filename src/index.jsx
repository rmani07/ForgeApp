import api, { route } from "@forge/api";
import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState } from "@forge/ui";
import { storage, startsWith } from '@forge/api';

await storage.query()
  // Filter the response to only keys that start with the string 'value' test testsetsets asdf
  .where('key', startsWith('value'))

  // Limit the result size to 10 values
  .limit(10)

  // Use the cursor provided (returned from a previous invocation)
  .cursor('...')

  // Get a list of results
  .getMany();

const fetchCommentsForIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};

const App = () => {
  const context = useProductContext();
  const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));

  console.log(`Number of comments on this issue: ${comments.length}`);

  return (
    <Fragment>
      <Text>Hello world!</Text>
      <Text>
        Number of comments on this issue: {comments.length}
      </Text>
  </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
