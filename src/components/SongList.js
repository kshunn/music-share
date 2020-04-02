import React from 'react';
import { CircularProgress, Card, CardMedia, CardContent, Typography, CardActions, IconButton, makeStyles } from '@material-ui/core';
import { PlayArrow, Save, Pause } from '@material-ui/icons';
import { useSubscription } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/subscriptions';
import { SongContext } from '../App';

function SongList(){
  const { data, loading, error } = useSubscription(GET_SONGS);


  if(loading){
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
      }}>
        <CircularProgress />
      </div>
    );
  }
  if(error) return <div>Error fetching songs</div>
  return (
    <div>
      {data.songs.map(song => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(3)
  },
  songInfoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  songInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  thumbnail: {
    objectFit: 'cover',
    width: 140,
    height: 140
  }
}));

function Song({ song }) {
  const { id } = song;
  const classes = useStyles();
  const { state, dispatch } = React.useContext(SongContext);
  const { title, artist, thumbnail } = song;
  const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false);

  React.useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);

  function handleTogglePlay(){
    dispatch({ type: "SET_SONG", payload: { song }});
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  return <Card className={classes.container}>
    <div className={classes.songInfoContainer}>
      <CardMedia className={classes.thumbnail} image={thumbnail} />
      <div className={classes.songInfo}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" component="p" color="textSecondary">
            {artist}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleTogglePlay} size="small" color="primary">
            {currentSongPlaying ? <Pause/> : <PlayArrow/>}
          </IconButton>
          <IconButton size="small" color="secondary">
            <Save />
          </IconButton>
        </CardActions>
      </div>
    </div>
  </Card>;
}

export default SongList;