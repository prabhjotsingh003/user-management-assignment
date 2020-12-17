import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Avatar, Grid, Paper, Typography, withStyles } from "@material-ui/core";
import { deleteUser, getUserList } from "../../service/UserService";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class UsersList extends React.Component {
  constructor() {
    super();
    this.state = {
      userList: [],
    };
  }

  componentDidMount = () => {
    this.loadUserList();
  };

  loadUserList = () => {
    const me = this;
    getUserList()
      .then((rs) => {
        if (rs.data && rs.data.length > 0) {
          me.setState({ userList: rs.data });
        } else {
          me.setState({ userList: [] });
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  delUser = (id) => {
    const me = this;
    if (window.confirm("Are you sure? Do you want to delete this record?")) {
      deleteUser(id)
        .then((rs) => {
          me.loadUserList();
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  ediUser = (id) => {
    this.props.history.push("/editUser/" + id);
  };

  render() {
    const { classes } = this.props;
    const { userList } = this.state;
    if (userList.length === 0) {
      return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          No users found.
        </Typography>
      );
    }
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            User List
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {row.imageUrl ? (
                      <Avatar alt={row.name} src={row.imageUrl} />
                    ) : (
                      <Avatar
                        alt={row.name}
                        src="https://homepages.cae.wisc.edu/~ece533/images/monarch.png"
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => this.ediUser(row._id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => this.delUser(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Grid item>
          <Link to="/" variant="body2">
            {"Login"}
          </Link>{" "}
          {" | "}
          <Link to="/registration" variant="body2">
            {"User Registration"}
          </Link>
        </Grid>
      </Grid>
    );
  }
}

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
});

export default withStyles(useStyles)(UsersList);
