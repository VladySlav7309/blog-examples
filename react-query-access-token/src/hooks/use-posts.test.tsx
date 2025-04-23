import { renderHook, screen, waitFor } from "@/test-utils";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { MockServerData, server } from "../mocks/server";
import { usePosts } from "./use-posts";

describe("usePosts", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return data when the query is successful", async () => {
    const { result } = renderHook(() => usePosts());

    /* 🛠️ in case you're using regular query you'd assert result.current.isLoading to equal true */
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toEqual(MockServerData.posts);
  });
});
