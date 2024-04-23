import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />

          <Typography variant="h2" align="center" mt={5} mb={3}>
            My Profile
          </Typography>

          <Grid container justifyContent="center" spacing={3}>
            {/* Avatar and Edit Profile Button */}
            <Grid item xs={12} md={3} align="center">
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Avatar
                  alt={user.name}
                  src={user.avatar.url}
                  sx={{ width: 150, height: 150, marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  component={Link}
                  to="/me/update"
                  sx={{ width: "100%", borderRadius: 20 }}
                >
                  Edit Profile
                </Button>
              </Paper>
            </Grid>
            {/* User Info */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                  Full Name
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.name}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Email Address
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.email}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Company
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.company}
                </Typography>
                <Divider sx={{ marginTop: 2 }} />
                <Button
                  variant="contained"
                  component={Link}
                  to="/password/update"
                  sx={{ width: "100%", marginTop: 2, borderRadius: 20 }}
                >
                  Change Password
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
