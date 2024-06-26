import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  clearErrors,
  deleteUser,
  deactivateUser,
  reactivateUser,
} from "../../actions/userActions";
import {
  DELETE_USER_RESET,
  DEACTIVATE_USER_RESET,
  REACTIVATE_USER_RESET,
} from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);
  const { isDeactivated, isReactivated } =
    useSelector((state) => state.user) || {};

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(allUsers());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeactivated) {
      successMsg("User deactivated successfully");
      console.log("User deactivated:", isDeactivated);
      dispatch({ type: DEACTIVATE_USER_RESET });
    }
    if (isReactivated) {
      successMsg("User reactivated successfully");
      console.log("User reactivated:", isReactivated);
      dispatch({ type: REACTIVATE_USER_RESET });
    }
    if (isDeleted) {
      successMsg("User deleted successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const toggleUserActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      await dispatch(reactivateUser(id));
      successMsg("User Reactivated Successfully");
      console.log("User reactivated:", id);
    } else {
      await dispatch(deactivateUser(id));
      successMsg("User Deactivated Successfully");
      console.log("User deactivated:", id);
    }
    dispatch(allUsers());
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150, // Set specific width to make it overflow
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 200,
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
          width: 100,
        },
        {
          label: "Company",
          field: "company",
          sort: "asc",
          width: 150,
        },
        {
          label: "Employee ID",
          field: "employee_id",
          sort: "asc",
          width: 150,
        },
        {
          label: "Branch",
          field: "branch",
          sort: "asc",
          width: 150,
        },
        {
          label: "Actions",
          field: "actions",
          width: 200,
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        employee_id: user.employee_id,
        branch: user.branch,
        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className={`btn ${
                user.status === "inactive" ? "btn-success" : "btn-danger"
              } py-1 px-2 ml-2`}
              onClick={() =>
                toggleUserActivation(user._id, user.status === "inactive")
              }
            >
              <i
                className={`fa ${
                  user.status === "inactive"
                    ? "fa-check-circle"
                    : "fa-times-circle"
                }`}
              ></i>
            </button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Users"} />
      <div className="row" style={{ marginRight: "120px" }}>
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="my-5" style={{ color: "black" }}>
                All Users
              </h1>
            </div>
            <div className="table-responsive">
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setUsers()}
                  className="px-3"
                  bordered
                  striped
                  hover
                  responsive
                />
              )}
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
