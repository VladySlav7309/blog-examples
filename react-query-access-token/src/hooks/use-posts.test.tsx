import { useAuth } from "@/context/auth-context";
import { renderHook, waitFor } from "@/test-utils";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { usePosts } from "./use-posts";
// 🛠️ Using `msw` we set up a mock server
import { MockServerData, server } from "@/mocks/server";

// 🚨 Here mock all imports of this module
// this will get hoisted to the top of this file and as such, usePosts hook that imports
// `useAuthQuery` that imports `useAuth` will be mocked as well!
vi.mock("@/context/auth-context");

const mocks = vi.hoisted(() => ({
  getAccessToken: vi.fn(),
}));

// 🛠️ .mocked is but a handy typescript utility, doesn't make useAuth a mock
// simply helps with types
// we took care of mocking useAuth with vi.mock above
vi.mocked(useAuth).mockReturnValue({
  getAccessToken: mocks.getAccessToken,
});

describe("usePosts", () => {
  // 🛠️ start server before all test cases, stop it after all test cases
  // reset handlers after each test case
  // this way we can set up custom handlers for each test case
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();

    // 🛠️ cleans out mock state, but doesn't affect implementation
    // this way we don't loose the return value, configured by the .mocked.mockReturnValue above
    vi.clearAllMocks();
  });
  afterAll(() => server.close());

  it("should return data when the query is successful", async () => {
    mocks.getAccessToken.mockResolvedValueOnce("mocked-access-token");
    const { result } = renderHook(() => usePosts());

    // 🛠️ declarative way of making the test wait for the query to finish
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(mocks.getAccessToken).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(MockServerData.posts);
  });

  it("should return error if failed to acquire token", async () => {
    const error = new Error("Failed to acquire token");
    mocks.getAccessToken.mockRejectedValueOnce(error);
    const { result } = renderHook(() => usePosts());

    expect(mocks.getAccessToken).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(result.current.error).toBe(error);
    });
  });
});
