import React from 'react';
import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import songReducer from './reducer';

export const SongContext = React.createContext({
  song: {
    id: '04832f6d-382b-42dc-8bac-1cd3e03af42e',
    title: 'Petal Fortune',
    artist: 'PERC%NT',
    thumbnail: 'http://img.youtube.com/vi/NaYS4eKYhjc/0.jpg',
    url: 'https://www.youtube.com/watch?v=NaYS4eKYhjc',
    duration: 230
  },
  isPlaying: false
})

function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {/* {greaterThanSm && <Header />} */}
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSm ? 80 : 10
          }} 
          item 
          xs={12} 
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid 
          style={
            greaterThanMd ? {
            position: 'fixed',
            width: '100%',
            right: 0,
            top: 70
          } : {
            position: 'fixed',
            width: '100%',
            left: 0,
            bottom: 0
          }}
          item xs={12} md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
