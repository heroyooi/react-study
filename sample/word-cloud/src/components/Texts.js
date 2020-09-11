import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import Link from '@material-ui/core/Link';
import TextTruncate from 'react-text-truncate';

const styles = theme => ({
  hidden: {
    display: 'none'
  },
  fab: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
})

const databaseURL = 'https://react-firebase-90ace.firebaseio.com';

const Texts = ({ classes }) => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [texts, setTexts] = useState({});
  const [textName, setTextName] = useState('');
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    getTexts();
  }, []);

  const getTexts = async () => {
    const res = await fetch(`${databaseURL}/texts.json`).then(res => {
      return res.json();
    });
    setTexts(res == null ? {} : res);
  };

  const postText = (text) => {
    return fetch(`${databaseURL}/texts.json`, {
      method: 'POST',
      body: JSON.stringify(text)
    }).then((res) => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then((data) => {
      let nextState = {...texts};
      nextState[data.name] = text;
      setTexts(nextState);
    });
  }

  const deleteTexts = (id) => {
    return fetch(`${databaseURL}/texts/${id}.json`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(() => {
      let nextState = {...texts};
      delete nextState[id];
      setTexts(nextState);
    });    
  }

  const handleDelete = (id) => {
    deleteTexts(id);
  }

  const handleDialogToggle = () => {
    setDialog(prev => !prev);
    setFileName('');
    setFileContent('');
    setTextName('');
  }
  const handleChangeTextName = (e) => {
    setTextName(e.target.value);
  }
  const handleSubmit = () => {
    handleDialogToggle();
    if (!textName && !fileContent) {
      return;
    }
    postText({textName: textName, textContent: fileContent});
  }
  const handleFileChange = (e) => {
    let reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      setFileContent(text);
    }
    reader.readAsText(e.target.files[0], "UTF-8");
    setFileName(e.target.value);
  }

  return (
    <div>
      {Object.keys(texts).map(id => {
        const text = texts[id];
        return (
          <Card key={id}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                내용: {text.textContent.substring(0, 24) + '...'}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5" component="h2">
                    {text.textName.substring(0, 14) + '...'}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Link component={RouterLink} to={`detail/${id}`}>
                    <Button variant="contained" color="primary">보기</Button>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" onClick={() => handleDelete(id)}>삭제</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )
      })}
      <Fab color="primary" className={classes.fab} onClick={handleDialogToggle}>
        <AddIcon />
      </Fab>
      <Dialog open={dialog} onClose={handleDialogToggle}>
        <DialogTitle>텍스트 추가</DialogTitle>
        <DialogContent>
          <TextField label="텍스트 이름" type="Text" name="TextName" value={textName} onChange={handleChangeTextName} /><br /><br />
          <input className={classes.hidden} accept="text/plain" id="raised-button-file" type="file" file={file} value={fileName} onChange={handleFileChange} />
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="primary" component="span" name="file">
              {fileName === '' ? ".txt 파일 선택" : fileName}
            </Button>
          </label>
          <TextTruncate
            line={1}
            truncateText="..."
            text={fileContent}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>추가</Button>
          <Button variant="outlined" color="primary" onClick={handleDialogToggle}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default withStyles(styles)(Texts);