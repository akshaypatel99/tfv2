import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import YouTube from 'react-youtube';
import { QueryBoundaries } from './QueryBoundaries';
import { getTrailer, rowOpts } from '../util/youtube';
import { Movie, Request, getTitles } from '../util/tmdb';
import './Row.css';

const Row = ({ title, fetchUrl }: Request) => {
	const [trailerUrl, setTrailerUrl] = useState<string>('');

	const { data: movies } = useQuery({
		queryKey: [`${title}`],
		queryFn: async () => getTitles(fetchUrl),
	});

	const trailerHandler = (movie: Movie) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			getTrailer(movie)
				.then((key) => setTrailerUrl(key))
				.catch((error) => console.log(error));
		}
	};

	return (
		<div className='Row'>
			<div className='Row__title'>
				<h2>{title}</h2>
			</div>
			<QueryBoundaries>
				<div className='Row__container'>
					{movies
						? movies.results?.map((movie: Movie) => (
								<img
									key={movie?.id}
									onClick={() => trailerHandler(movie)}
									className='Row__poster'
									src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
									alt={movie?.title}
								/>
						  ))
						: null}
				</div>

				{trailerUrl && (
					<YouTube
						videoId={trailerUrl}
						opts={rowOpts}
					/>
				)}
			</QueryBoundaries>
		</div>
	);
};

export default Row;
