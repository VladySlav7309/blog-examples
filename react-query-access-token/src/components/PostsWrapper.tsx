import { usePosts } from "../hooks/use-posts";

export const PostsWrapper = () => {
  const query = usePosts();
  // 🚨 We manually throw query.error here because React Query's useSuspenseQuery
  // will only throw 'hard errors' i.e., errors when no data was previously loaded
  // Adjust based on your needs. I find it however that in most apps we would want to throw
  // in case we fail to load something, regardless of whether previous load was successful or not.
  if (query.error) {
    throw query.error;
  }

  if (query.isLoading || query.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <pre
      style={{
        width: "100%",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {JSON.stringify(query.data?.[0], null, 2)}
    </pre>
  );
};
