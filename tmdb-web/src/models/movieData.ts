interface MovieData {
  id: number,
  title: string,
  release_date: Date,
  overview: string,
  poster_path: string,
  adult: boolean,
  genre_ids: number[],
  original_title: string,
  original_language: string,
  backdrop_path: string,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number
}

export default MovieData