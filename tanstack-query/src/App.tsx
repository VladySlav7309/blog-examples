import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import "./App.css";
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
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallbackRender={resetBoundaryFallback} onReset={reset}>
            <Suspense fallback={<div>Loading...</div>}>
              <PostsWrapper />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};
