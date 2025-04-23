import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const MockServerData = {
  posts: [
    { id: 1, title: "Post 1", content: "Content of post 1" },
    { id: 2, title: "Post 2", content: "Content of post 2" },
  ],
};

export const server = setupServer(
  http.get(/.*\/posts/gi, () => {
    return HttpResponse.json(MockServerData.posts, {
      status: 200,
    });
  })
);
