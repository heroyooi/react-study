import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
})

const databaseURL = 'https://react-firebase-90ace.firebaseio.com';

const Words = ({ classes }) => {
  const [words, setWords] = useState({});
  const [dialog, setDialog] = useState(false);
  const [word, setWord] = useState('');
  const [weight, setWeight] = useState('');  

  useEffect(() => {
    getWords();
  }, []);

  const getWords = async () => {
    const res = await fetch(`${databaseURL}/words.json`).then(res => {
      return res.json();
    });
    setWords(res);
  };
  
  const deleteWords = (id) => {
    return fetch(`${databaseURL}/words/${id}.json`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(() => {
      let nextState = {...words};
      delete nextState[id];
      setWords(nextState);
    });    
  }

  const handleDialogToggle = () => {
    setDialog(prev => !prev);
  }
  const handleChangeWord = (e) => {
    setWord(e.target.value);
  }
  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  }

  const handleSubmit = () => {
    handleDialogToggle();
    if (!word && !weight) {
      return;
    }
    postWord({word: word, weight: weight});
  }
  const postWord = (word) => {
    return fetch(`${databaseURL}/words.json`, {
      method: 'POST',
      body: JSON.stringify(word)
    }).then((res) => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then((data) => {
      let nextState = {...words};
      nextState[data.name] = word;
      setWords(nextState);
      setWord('');
      setWeight('');
    });
  }

  const handleDelete = (id) => {
    deleteWords(id);
  }

  return (
    <div>
      {Object.keys(words).map(id => {
        const word = words[id];
        return (
          <div key={id}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  가중치: {word.weight}
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h5" component="h2">
                      {word.word}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={() => handleDelete(id)}>삭제</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        )
      })}
      <Fab color="primary" className={classes.fab} onClick={handleDialogToggle}>
        <AddIcon />
      </Fab>
      <Dialog open={dialog} onClose={handleDialogToggle}>
        <DialogTitle>단어 추가</DialogTitle>
        <DialogContent>
          <TextField label="단어" text="text" name="word" value={word} onChange={handleChangeWord} /><br />
          <TextField label="가중치" text="text" name="weight" value={weight} onChange={handleChangeWeight} /><br />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>추가</Button>
          <Button variant="outlined" color="primary" onClick={handleDialogToggle}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default withStyles(styles)(Words);