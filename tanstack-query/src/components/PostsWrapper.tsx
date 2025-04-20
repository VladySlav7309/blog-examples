import { usePosts } from "../hooks/use-posts";

export const PostsWrapper = () => {
  const query = usePosts();
  if (query.error) {
    throw query.error;
  }

  return <pre>{JSON.stringify(query.data?.[0], null, 2)}</pre>;
};
