import React from 'react';
import { TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },
  dialog: {
    textAlign: 'center'
  },
  thumbnail: {
    width: '90%'
  }
}));

function AddSong(){
  const [dialog, setDialog] = React.useState(false);
  const classes = useStyles();
  function handleCloseDialog(){
    setDialog(false);
  }

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img 
            src="https://i1.sndcdn.com/artworks-000670470790-ej1gvb-t500x500.jpg" 
            alt="Song thumbnail" 
            className={classes.thumbnail}  
          />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
          />
          <TextField
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
          />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button variant="outlined" color="primary">Add Song</Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput} 
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
    </div>
  );
}

export default AddSong;