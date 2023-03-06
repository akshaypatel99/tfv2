import React from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

export const QueryBoundaries = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<QueryErrorResetBoundary>
		{({ reset }) => (
			<ErrorBoundary
				onReset={reset}
				FallbackComponent={ErrorView}>
				<React.Suspense fallback={<LoadingView />}>
					{children}
				</React.Suspense>
			</ErrorBoundary>
		)}
	</QueryErrorResetBoundary>
);

// Loading
const LoadingView = () => <h3>Loading...</h3>;

// Error
const ErrorView = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<div>
			<div>{error.message}</div>
			<button
				title='Retry'
				onClick={resetErrorBoundary}
			/>
		</div>
	);
};
