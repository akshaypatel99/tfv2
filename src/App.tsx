import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';
import Row from './components/Row';
import { requests } from './util/tmdb';
import './App.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			staleTime: 60 * (60 * 1000), // 60 mins
			cacheTime: 90 * (60 * 1000), // 90 mins
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<Navbar />
				<Showcase />
				{requests.map((req) => (
					<Row
						key={req.title}
						title={req.title}
						fetchUrl={req.fetchUrl}
					/>
				))}
			</div>
			<ReactQueryDevtools initialIsOpen={false} />{' '}
		</QueryClientProvider>
	);
}

export default App;
