import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { lazy } from "react";

const PostsWrapper = lazy(() =>
  import("./components/PostsWrapper").then((module) => ({
    default: module.PostsWrapper,
  }))
);
const resetBoundaryFallback = ({
  resetErrorBoundary,
}: FallbackProps): ReactNode => (
  <div>
    There was an error!
    <button onClick={() => resetErrorBoundary()}>Try again</button>
  </div>
);

export const App = () => {
  return (
    <>
      {/* 🛠️ rendering error boundary like this inside the QueryErrorResetBoundary is quite handy,
      since resetting the boundary will trigger all errored-out queries to reload again */}
      <QueryErrorResetBoundary>
        {/* 🚨 wrapping our component in a error boundary to ensure that errors thrown in case
        query fails to load are properly caught and don't break other parts of the app */}
        {({ reset }) => (
          <ErrorBoundary fallbackRender={resetBoundaryFallback} onReset={reset}>
            {/* 💡 this suspense will catch both the loading of the component itself + the loading of the suspended queries inside the component */}
            <Suspense fallback={<div>Loading...</div>}>
              <PostsWrapper />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};
