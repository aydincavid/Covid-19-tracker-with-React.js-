import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { day } from "../../api/index";

import { makeStyles } from "@material-ui/core/styles";

//var number;
export function DayPicker(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();
  if (!props.country)
    return (
      <div className={classes.root}>
        <h2>In The Last {props.dayNum} Days</h2>
        <ButtonGroup
          style={{ marginBottom: "1rem" }}
          variant="contained"
          size="large"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            onClick={(e) => {
              props.handleNumberChange(10);
            }}
          >
            10 Days
          </Button>
          <Button
            onClick={(e) => {
              props.handleNumberChange(Number(50));
            }}
          >
            50 Days
          </Button>
          <Button
            onClick={(e) => {
              props.handleNumberChange(100);
            }}
          >
            100 Days
          </Button>
          <Button
            onClick={(e) => {
              props.handleNumberChange(day);
            }}
          >
            All
          </Button>
        </ButtonGroup>
      </div>
    );
  else {
    return <div></div>;
  }
}

export default DayPicker;
