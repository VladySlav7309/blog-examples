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

  if (!res.ok) {
    console.log("Error statusText: ", res.statusText);
    throw new Error("Failed to fetch posts");
  }

  const r = await res.json();
  console.log("r", r);
  return r;
};

export const usePosts = () =>
  useAuthQuery<BaseAuthQueryKey, Post[], Error>(
    ["posts", undefined],
    fetchPosts
  );
