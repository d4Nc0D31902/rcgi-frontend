import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import UserSalesChart from "./UserSalesChart";
import MonthlySalesChart from "./MonthlySalesChart";
import ProductSalesChart from "./ProductSalesChart";
import UserCompanyChart from "./UserCompanyChart";
import UserEnrollmentChart from "./UserEnrollmentChart";
import { useTheme } from "@mui/material/styles";
import { Grid, Box, Stack, Typography, Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";

import { allUsers, userSales } from "../../actions/userActions";
import { allEnrollments } from "../../actions/enrollmentActions";
import {
  monthlySalesChart,
  productSalesChart,
} from "../../actions/chartActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );
  const { customerSales } = useSelector((state) => state.customerSales);
  const { salesPerMonth } = useSelector((state) => state.salesPerMonth);
  const { productSales } = useSelector((state) => state.productSales);
  const { enrollments } = useSelector((state) => state.allEnrollments);

  const theme = useTheme();

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
    dispatch(userSales());
    dispatch(monthlySalesChart());
    dispatch(productSalesChart());
    dispatch(allEnrollments());
  }, [dispatch]);

  const roleCounts = users
    ? users.reduce((acc, user) => {
        if (user.status === "active") {
          acc[user.role] = (acc[user.role] || 0) + 1;
        }
        return acc;
      }, {})
    : {};

  const getRoleLabel = (role) => {
    switch (role) {
      case "user":
        return "Employees";
      case "admin":
        return "HR";
      default:
        return role;
    }
  };
  return (
    <Fragment>
      <Box
        sx={{
          [theme.breakpoints.only("xs")]: {
            p: "20px",
          },
          [theme.breakpoints.only("sm")]: {
            p: "20px",
          },
          [theme.breakpoints.only("md")]: {
            p: "20px",
            marginRight: "120px",
          },
          [theme.breakpoints.only("lg")]: {
            p: "20px",
            marginRight: "120px",
          },
          [theme.breakpoints.only("xl")]: {
            p: "20px",
            marginRight: "120px",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard
            </Typography>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <MetaData title={"Admin Dashboard"} />
                <Grid
                  container
                  spacing={2}
                  sx={{
                    [theme.breakpoints.only("xs")]: {
                      marginBottom: "20px",
                    },
                    [theme.breakpoints.only("sm")]: {
                      marginBottom: "20px",
                    },
                    [theme.breakpoints.only("md")]: {
                      marginBottom: "20px",
                    },
                    [theme.breakpoints.only("lg")]: {
                      marginBottom: "20px",
                    },
                    [theme.breakpoints.only("xl")]: {
                      marginBottom: "20px",
                    },
                  }}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <Card
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2} alignItems="center">
                          {Object.entries(roleCounts).map(([role, count]) => (
                            <Box key={role}>
                              <Typography variant="h6" component="div">
                                <b>{getRoleLabel(role)}:</b> {count}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Card
                      sx={{ backgroundColor: "success.main", color: "white" }}
                    >
                      <CardContent>
                        <Stack
                          spacing={2}
                          alignItems="center"
                          textAlign="center"
                        >
                          <Typography variant="h6" component="div">
                            Number of Enrollments
                            <br />
                            <b>{enrollments && enrollments.length}</b>
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Box mt={4}>
                  <Typography variant="h5" component="h2" align="center">
                    Employee Companies
                  </Typography>
                  <Box sx={{ border: 1, borderColor: "grey.400", p: 2, mt: 2 }}>
                    <UserCompanyChart userData={users} />
                  </Box>
                </Box>
              </Fragment>
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Dashboard;
