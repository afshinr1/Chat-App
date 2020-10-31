import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  info_container: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
      width: "30%",
    },

    overflow: "auto",
    textAlign: "center",
    height: "100%",

    color: "#FFFFFF",
    backgroundColor: "#1139FF",
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
    },
    textTransform: "Capitalize",
    textDecoration: "underline",
  },
  user: {
    textDecoration: "underline",
    fontSize: "1rem",
    color: "#F9F2EE",
  },
}));
