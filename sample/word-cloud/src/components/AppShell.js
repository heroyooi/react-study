import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 'auto'
  }
}

const AppShell = ({ classes, children }) => {
  const [toggle, setToggle] = useState(false);
  const handleDrawerToggle = () => {
    setToggle(prev => !prev);
  }
  return (
    <div>
      <div className={styles.root}>
        <AppBar position="static">
          <IconButton className={classes.menuButton} color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </AppBar>
        <Drawer open={toggle}>
          <MenuItem onClick={handleDrawerToggle}>
            <Link component={RouterLink} to="/">
              홈 화면
            </Link>
          </MenuItem>
          <MenuItem onClick={handleDrawerToggle}>
            <Link component={RouterLink} to="/texts">
              텍스트 관리
            </Link>
          </MenuItem>
          <MenuItem onClick={handleDrawerToggle}>
            <Link component={RouterLink} to="/words">
              단어 관리
            </Link>
          </MenuItem>
        </Drawer>
      </div>
      <div id="content" style={{margin: 'auto', marginTop: '20px'}}>{children}</div>
    </div>
  )
};

export default withStyles(styles)(AppShell);