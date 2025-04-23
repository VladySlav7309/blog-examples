import {
  queries,
  Queries,
  render,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
} from "@testing-library/react";
import { Container } from "react-dom/client";
import { PropsWithChildren, ReactNode, Suspense } from "react";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/auth-context";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const resetBoundaryFallback = ({
  resetErrorBoundary,
}: FallbackProps): ReactNode => (
  <div>
    There was an error!
    <button onClick={() => resetErrorBoundary()}>Try again</button>
  </div>
);

const renderWrapper = ({ children }: PropsWithChildren) => (
  <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={resetBoundaryFallback}
              onReset={reset}
            >
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </AuthProvider>
  </>
);

const customRender = <
  Q extends Queries = typeof queries,
  RenderContainer extends Container = HTMLElement,
  BaseElement extends Container = Container
>(
  ui: ReactNode,
  options: Omit<RenderOptions<Q, RenderContainer, BaseElement>, "wrapper">
) => {
  return render(ui, {
    wrapper: renderWrapper,
    ...options,
  });
};

const customRenderHook = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  RenderContainer extends Container = HTMLElement,
  BaseElement extends Container = Container
>(
  render: (initialProps: Props) => Result,
  options?:
    | Omit<RenderHookOptions<Props, Q, RenderContainer, BaseElement>, "wrapper">
    | undefined
): RenderHookResult<Result, Props> => {
  return renderHook(render, {
    wrapper: renderWrapper,
    ...options,
  });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
export { customRenderHook as renderHook };
