import { Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import React from "react";
import { useStyles } from "./InfoBarStyles";
function InfoBar({ username }) {
  const users = useSelector((state) => state.UsersReducer.users);
  const classes = useStyles();
  return (
    <Paper className={classes.info_container}>
      <Typography className={classes.header} gutterBottom>
        Online
      </Typography>

      {users.map((user, i) =>
        user.username === username ? (
          <Typography variant="subtitle2" key={i}>
            <b>{user.username} (YOU)</b>
          </Typography>
        ) : (
          <Typography variant="subtitle2" key={i}>
            {user.username}
          </Typography>
        )
      )}
    </Paper>
  );
}

export default InfoBar;
