// import axios from './axios';
import { Movie, baseURL } from "./tmdb";

export const rowOpts = {
	height: '390',
	width: '100%',
	playerVars: {
		autoplay: 1,
	},
};

export const showCaseOpts = {
	height: '400',
	width: '640',
	playerVars: {
		autoplay: 1,
	},
};

const API_KEY = import.meta.env.VITE_API_KEY;

export const getTrailer = (movie: Movie) => {
	if (movie?.type === 'tv' || movie?.id < 130000) {
		async function fetchTvTrailer() {
			const response = await fetch(
				`${baseURL}/tv/${movie?.id}/videos?api_key=${API_KEY}&language=en-US`, { method: 'GET'}
			);

			if (!response.ok) {
				throw new Error(`HTTP error, status: ${response.status} ${response.statusText}`)
			}
			
			const data = await response.json();
			const found = data.results.find(
				(element: any) => element.type === 'Trailer'
			);
			const key = found.key;
			return key;
		}
		return fetchTvTrailer();
	} else {
		async function fetchMovieTrailer() {
			const response = await fetch(
				`${baseURL}/movie/${movie?.id}/videos?api_key=${API_KEY}&language=en-US`, { method: 'GET'}
			);

			if (!response.ok) {
				throw new Error(`HTTP error, status: ${response.status} ${response.statusText}`)
			}
			
			const data = await response.json();
			const found = data.results.find(
				(element: any) => element.type === 'Trailer'
			);
			const key = found.key;
			return key;
		}
		return fetchMovieTrailer();
	}
};