export const baseURL: string = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;

export type Request = {
		title: string,
		fetchUrl: string
}

export type Requests = Request[]

export const requests: Requests = [
	{
		title: 'NETFLIX ORIGINALS',
		fetchUrl: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
	},
	{
		title: 'Trending Now',
		fetchUrl: `/trending/all/week?api_key=${API_KEY}`,
	},
	{
		title: 'Now Playing in Cinemas',
		fetchUrl: `/movie/now_playing?api_key=${API_KEY}`,
	},
	{
		title: 'Top 20 Films in UK',
		fetchUrl: `/movie/popular?api_key=${API_KEY}&region=GB`,
	},
	{
		title: 'Action',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	},
	{
		title: 'Animation',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
	},
	{
		title: 'Comedy',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	},
	{
		title: 'Crime',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
	},
	{
		title: 'Documentary',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	},
	{
		title: 'Drama',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
	},
	{
		title: 'Family',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
	},
	{
		title: 'History',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=36`,
	},
	{
		title: 'Horror',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	},
	{
		title: 'Science Fiction',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
	},
	{
		title: 'Thriller',
		fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
	},
];

export async function getShowcase() {
	const response = await fetch(`${baseURL}${requests[0].fetchUrl}`, { method: 'GET' })
	
	if (!response.ok) {
		throw new Error(`HTTP error, status: ${response.status} ${response.statusText}`)
	}

	const data = await response.json();

	return data;
}

export async function getTitles(fetchUrl: string) {
	const response = await fetch(`${baseURL}${fetchUrl}`, { method: 'GET' })
	
	if (!response.ok) {
		throw new Error(`HTTP error, status: ${response.status} ${response.statusText}`)
	}

	const data = await response.json();
	return data;
}

export type Movie = {
	backdrop_path: string | null,
	id: number,
	media_type?: string,
	name?: string,
	original_name?: string,
	original_title?: string,
	overview: string,
	poster_path: string | null,
	title?: string,
	type?: string
}