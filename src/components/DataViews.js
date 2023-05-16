import React from 'react';
import MovieList from './MovieList';
import MovieSearch from './MovieSearch';
import MovieDetails from './MovieDetails';
import GenreList from './GenreList';
import PersonDetails from './PersonDetails';
import PersonList from './PersonList';
import PersonSearch from './PersonSearch';

function DataViews(props) {

  let view = props.view;
  let search = props.data;
  const setView = props.viewChanger;

  // When props.view is set, the corresponding component will be displayed
  if (props.view === 'movielist') {
    return (
      <div>
        <MovieList view="view" viewChanger={setView} />
      </div>
    );
  } else if (props.view === 'moviesearch') {
    return (
      <div>
        <MovieSearch view="view" viewChanger={setView} data={search} />
      </div>
    );
  } else if (props.view === 'personlist') {
    return (
      <div>
        <PersonList view="view" viewChanger={setView} />
      </div>
    );
  } else if (props.view === 'personsearch') {
    return (
      <div>
        <PersonSearch view="view" viewChanger={setView} data={search} />
      </div>
    );
  }  else if (view.view === 'moviedetails') {
    return (
      <div>
        <MovieDetails view="view" viewChanger={setView} data={view.data} />
      </div>
    );
  } else if (view.view === 'genrelist') {
    return (
      <div>
        <GenreList view="view" viewChanger={setView} data={view.data} />
      </div>
    );
  } else if (view.view === 'persondetails') {
    return (
      <div>
        <PersonDetails view="view" viewChanger={setView} data={view.data} />
      </div>
    );
  }
}

export default DataViews;