import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import YouTube from 'react-youtube';
import { QueryBoundaries } from './QueryBoundaries';
import { getTrailer, showCaseOpts } from '../util/youtube';
import { Movie, getShowcase } from '../util/tmdb';
import './Showcase.css';

const Showcase = () => {
	const [trailerUrl, setTrailerUrl] = useState<string>('');
	const [movieIndex, setMovieIndex] = useState<number>(0);

	const { data: movies } = useQuery({
		queryKey: ['NETFLIX ORIGINALS'],
		queryFn: async () => getShowcase(),
	});

	useEffect(() => {
		let interval: any;
		if (movies && trailerUrl.length === 0) {
			interval = setInterval(() => {
				let random = Math.floor(
					Math.random() * movies.results.length
				);
				setMovieIndex(random);
			}, 12000);
		} else if (trailerUrl.length > 0) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [trailerUrl]);

	const trailerHandler = (movie: Movie) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			getTrailer(movie)
				.then((key) => setTrailerUrl(key))
				.catch((error) => console.log(error));
		}
	};

	function shorten(text: string, max: number) {
		return text && text.length > max
			? text
					.slice(0, max)
					.split(' ')
					.slice(0, -1)
					.join(' ')
					.concat('...')
			: text;
	}

	return (
		<header className='Showcase__container'>
			<QueryBoundaries>
				{movies ? (
					<div
						className='Showcase'
						style={{
							backgroundSize: 'cover',
							backgroundImage: `url("https://image.tmdb.org/t/p/original${movies.results[movieIndex]?.backdrop_path}")`,
							backgroundPosition: 'center center',
						}}>
						<div className='Showcase__contents'>
							<div className='Showcase__text'>
								<h1 className='Showcase__title'>
									{movies.results[movieIndex]?.title ||
										movies.results[movieIndex]?.name ||
										movies.results[movieIndex]?.original_name}
								</h1>

								<div className='Showcase__buttons'>
									<button
										className='Showcase__button'
										onClick={() =>
											trailerHandler(movies.results[movieIndex])
										}>
										Play
									</button>
									<button className='Showcase__button'>
										More Info
									</button>
								</div>
								<p className='Showcase__description'>
									{shorten(movies.results[movieIndex]?.overview, 200)}
								</p>
							</div>
						</div>

						<div className='Showcase__player'>
							{trailerUrl && (
								<YouTube
									videoId={trailerUrl}
									opts={showCaseOpts}
								/>
							)}
						</div>

						<div className='Showcase__fadeBottom' />
					</div>
				) : null}
			</QueryBoundaries>
		</header>
	);
};

export default Showcase;
