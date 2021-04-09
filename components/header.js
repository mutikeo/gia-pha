import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { store } from './store';
import { withAuthSync, fetcher, logout } from '../utils/auth';
import Loader from 'react-loader-spinner';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ExitToApp from '@material-ui/icons/ExitToApp';
import PersonAdd from '@material-ui/icons/PersonAdd';
import DoubleArrow from '@material-ui/icons/DoubleArrow';
import Home from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  hiUsername: {
    fontSize: 15
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = () => {
  const { state: storeState, dispatch } = useContext(store);
  const [mounted, setMounted] = useState(false);
  const { data: userSv } = useSWR(mounted ? '/api/profile' : '', fetcher);

  const classes = useStyles();

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    setMounted(true);
    if (userSv) {
      dispatch({ type: 'SET_PROFILE', user: user });
    }
  }, [userSv]);

  const handleLogout = async () => {
    await logout();
    dispatch({ type: 'SET_PROFILE', user: null });
  };

  return (
    <>
      {
        storeState.loading &&
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          className="loading-loader"
        />
      }
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              TRẦN KHẮC CHI III
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Tìm kiếm..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Link href="/">
                  <Home />
                </Link>
              </IconButton>
                {
                  !storeState.user &&
                  <IconButton color="inherit">
                    <Link href="/login">
                      <DoubleArrow />
                    </Link>
                  </IconButton>
                }
                {storeState.user &&
                  <>
                    <IconButton color="inherit" className={classes.hiUsername}>
                      {`Chào ${storeState.user}`}
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                      <Link href="/signup">
                        <PersonAdd />
                      </Link>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={handleLogout}
                    >
                      <ExitToApp />
                    </IconButton>
                  </>
                }

            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  )
};

export default React.memo(withAuthSync(Header));
