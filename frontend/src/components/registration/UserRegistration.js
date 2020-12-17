import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { createUser, updateUser, getUserById } from "../../service/UserService";

class UserRegistration extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      mobile: "",
      email: "",
      password: "",
      imageUrl: "https://homepages.cae.wisc.edu/~ece533/images/monarch.png",
    };
    this.register = this.register.bind(this);
  }

  componentDidMount = () => {
    const me = this;
    if (this.props.match.params.id) {
      getUserById(this.props.match.params.id)
        .then((rs) => {
          const obj = rs.data[0];
          me.setState({
            name: obj.name,
            mobile: obj.mobile,
            email: obj.email,
            password: obj.password,
            imageUrl: obj.imageUrl,
          });
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  register(event) {
    event.preventDefault();
    const me = this;
    if (this.props.match.params.id) {
      updateUser(this.props.match.params.id, this.state)
        .then((rs) => {
          if (rs.data.success) {
            alert(rs.data.message);
            me.props.history.push("/list");
          } else {
            alert(rs.data.message);
          }
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      createUser(this.state)
        .then((rs) => {
          if (rs.data.success) {
            alert(rs.data.message);
            me.props.history.push("/list");
          } else {
            alert(rs.data.message);
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  }

  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.register}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="mobileNo"
                  name="mobile"
                  label="Mobile No"
                  value={this.state.mobile}
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Image URL"
                  type="passwurlord"
                  name="imageUrl"
                  placeholder="https://homepages.cae.wisc.edu/~ece533/images/monarch.png"
                  id="url"
                  value={this.state.imageUrl}
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default withStyles(useStyles)(UserRegistration);
