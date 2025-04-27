import { BaseAuthQueryKey, useAuthQuery } from "./use-auth-query";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchPosts = async (_: unknown, token: string): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 💡 Remove this 'if' to check how the UI looks when query breaks
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export const usePosts = () =>
  useAuthQuery<BaseAuthQueryKey, Post[], Error>(
    ["posts", undefined],
    fetchPosts
  );
