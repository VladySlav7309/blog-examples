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
import {
  createElement,
  JSXElementConstructor,
  PropsWithChildren,
  ReactNode,
  Suspense,
} from "react";
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
      /* 🛠️ in general, when testing our hooks we do not want them to retry or refetch if stale.
      These settings can be changed easily by passing a custom query client provider as a wrapper for specific tests  */
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

/* 🚨 mimicking all the same providers as we define in the App.tsx is crucial for the test environment to function as we expect it to */
const renderWrapper =
  (
    wrapper?:
      | JSXElementConstructor<{
          children: React.ReactNode;
        }>
      | undefined
  ) =>
  ({ children }: PropsWithChildren) =>
    (
      <>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary
                  fallbackRender={resetBoundaryFallback}
                  onReset={reset}
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    {wrapper
                      ? createElement(wrapper, null, children)
                      : children}
                  </Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </QueryClientProvider>
        </AuthProvider>
      </>
    );

// ❓ I didn't test these types in a production environment. Consider revising these generic arguments to tailor them to your needs
const customRender = <
  Q extends Queries = typeof queries,
  RenderContainer extends Container = HTMLElement,
  BaseElement extends Container = Container
>(
  ui: ReactNode,
  options: RenderOptions<Q, RenderContainer, BaseElement>
) => {
  return render(ui, {
    wrapper: renderWrapper(options.wrapper),
    ...options,
  });
};

// ❓ I didn't test these types in a production environment. Consider revising these generic arguments to tailor them to your needs
const customRenderHook = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  RenderContainer extends Container = HTMLElement,
  BaseElement extends Container = Container
>(
  render: (initialProps: Props) => Result,
  options?:
    | RenderHookOptions<Props, Q, RenderContainer, BaseElement>
    | undefined
): RenderHookResult<Result, Props> => {
  return renderHook(render, {
    wrapper: renderWrapper(options?.wrapper),
    ...options,
  });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
/* 🚨 by exporting our custom functions like this we hide the original exports from testing library
and allow everyone to use our custom implementation the same way they would use original functions */
export { customRender as render };
export { customRenderHook as renderHook };
