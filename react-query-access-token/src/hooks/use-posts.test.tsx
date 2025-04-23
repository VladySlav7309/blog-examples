import { renderHook, waitFor } from "@/test-utils";
import { QueryClient } from "@tanstack/react-query";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { MockServerData, server } from "../mocks/server";
import { usePosts } from "./use-posts";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

describe("usePosts", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return data when the query is successful", async () => {
    const { result } = renderHook(() => usePosts());

    // Wait for the Suspense fallback to resolve
    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });

    // Assert the query result
    // expect(result.current.isSuccess).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toEqual(MockServerData.posts);
  });
});
