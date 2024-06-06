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
        acc[user.role] = (acc[user.role] || 0) + 1;
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
      <div className="row" style={{ marginRight: "120px" }}>
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin Dashboard"} />
              {/* <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Number of Employees
                        <br /> <b>{users && users.length}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        {/* Number of Users */}
                        {/* <br /> */}
                        {Object.entries(roleCounts).map(([role, count]) => (
                          <div key={role}>
                            <b>{getRoleLabel(role)}:</b> {count}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Number of Enrollments
                        <br /> <b>{enrollments && enrollments.length}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Fragment>
                <div className="chart-container">
                  <h2 className="chart-label">Employee Companies</h2>
                  <div className="chart-border">
                    <UserCompanyChart userData={users} />
                  </div>
                </div>
              </Fragment>
              {/* <Fragment>
                <div className="chart-container">
                  <h2 className="chart-label">Employee Enrollments</h2>
                  <div className="chart-border">
                    <UserEnrollmentChart enrollmentData={enrollments} />
                  </div>
                </div>
              </Fragment> */}

              {/* <Fragment>
                <UserSalesChart data={customerSales} />
              </Fragment>
              <Fragment>
                <MonthlySalesChart data={salesPerMonth} />
              </Fragment>
              <Fragment>
                <ProductSalesChart data={productSales} />
              </Fragment> */}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
