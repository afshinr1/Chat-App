import { Typography, makeStyles } from "@material-ui/core";
import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./Header.css";

const useStyles = makeStyles(() => ({
  icon: {
    color: "#0F0",
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <div className={`header`}>
      <div className="leftInnerContainer">
        <FiberManualRecordIcon className={classes.icon} />
        <Typography variant="h5">Chat Away</Typography>
      </div>
    </div>
  );
}

export default Header;
