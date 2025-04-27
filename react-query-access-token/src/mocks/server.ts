import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// 💡 re-exporting it here helps with assertions in our tests
export const MockServerData = {
  posts: [
    { id: 1, title: "Post 1", content: "Content of post 1" },
    { id: 2, title: "Post 2", content: "Content of post 2" },
  ],
};

export const server = setupServer(
  // 🛠️ In a real app we'd probably add handlers for specific urls in relevant tests
  // for simplicity in this app we centralize the handlers here
  http.get(/.*\/posts/gi, () => {
    return HttpResponse.json(MockServerData.posts, {
      status: 200,
    });
  })
);
