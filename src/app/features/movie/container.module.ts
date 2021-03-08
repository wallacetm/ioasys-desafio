import { ContainerModule } from 'inversify';
import { MovieService } from './interfaces';
import { DefaultMovieService } from './default-movie.service';
import { TYPES } from '../../core/containers/types';

const MovieContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<MovieService>(TYPES.CONTAINER_DEFAULT_MOVIE_SERVICE).to(DefaultMovieService);
});

export { MovieContainerModule };