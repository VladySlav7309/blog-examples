import { BaseAuthQueryKey, useAuthSuspenseQuery } from "./use-auth-query";

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

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export const usePosts = () =>
  useAuthSuspenseQuery<BaseAuthQueryKey, Post[], Error>(
    ["posts", undefined],
    fetchPosts
  );
