import React from "react";

//firebase
// import app, { stroage } from "../../firebase";

//components

// contexts
// import { useAuth } from "../../contexts/AuthContext";

//hook
import { useGetAllSkills } from "../../hooks/getAllSkills";

//mui
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function Admin() {
  const classes = useStyles();

  const allskill = useGetAllSkills();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="10%">Name</TableCell>
            <TableCell align="right" width="10%">
              Experiance
            </TableCell>
            <TableCell align="right" width="10%">
              Platform
            </TableCell>
            <TableCell align="right" width="10%">
              Website
            </TableCell>
            <TableCell align="right" width="10%">
              Description
            </TableCell>
            <TableCell align="right" width="10%">
              ID
            </TableCell>

            <TableCell align="right" width="10%">
              Cover Photo
            </TableCell>

            <TableCell align="right" width="10%">
              Color Palette
            </TableCell>
            <TableCell align="right" width="20%">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allskill.map((skill) => (
            <TableRow key={skill.skillID}>
              <TableCell component="th" scope="row" width="10%">
                {skill.skillName}
              </TableCell>
              <TableCell align="right" scope="row" width="10%">
                {skill.skillLevel}
              </TableCell>
              <TableCell align="right" scope="row" width="10%">
                {skill.skillPlatform}
              </TableCell>
              <TableCell align="right" scope="row" width="10%">
                {skill.skillWebsite}
              </TableCell>
              <TableCell align="right" scope="row" width="10%">
                {skill.skillDescription}
              </TableCell>
              <TableCell align="right" scope="row" width="10%">
                {skill.skillID}
              </TableCell>

              <TableCell align="right" scope="row" width="10%">
                <img
                  src={skill.skillCoverPhoto}
                  alt=""
                  style={{ height: 100 }}
                />
              </TableCell>

              <TableCell align="right" scope="row" width="10%">
                {skill.skillColorPalette}
              </TableCell>
              <TableCell align="right" scope="row" width="20%">
                Delete | Update
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
