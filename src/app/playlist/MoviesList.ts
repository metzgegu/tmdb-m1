import {MovieResponse} from '../tmdb-data/Movie';

export interface MoviesList {
  name?: string;
  description?: string;
  movies?: MovieResponse[];
  id: string;
}
