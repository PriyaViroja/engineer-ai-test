import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });
});

const HeaderComponent = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Posts
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
