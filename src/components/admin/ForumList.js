import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getForums,
  deleteForum,
  clearErrors,
} from "../../actions/forumActions";
import {
  CLEAR_ERRORS,
  DELETE_FORUM_REQUEST,
} from "../../constants/forumConstants";

const ForumsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, forums } = useSelector((state) => state.forums);
  const { isDeleted } = useSelector((state) => state.forum);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getForums());
    if (error) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/admin/forums");
      dispatch({ type: DELETE_FORUM_REQUEST });
    }
  }, [dispatch, error]);

  const setForums = () => {
    const truncateBody = (body, maxLength) => {
      const strippedBody = body.replace(/<[^>]*>?/gm, "");
      if (strippedBody.length > maxLength) {
        return strippedBody.substring(0, maxLength) + "...";
      }
      return strippedBody;
    };

    const data = {
      columns: [
        {
          label: "Title",
          field: "title",
          sort: "asc",
        },
        {
          label: "Body",
          field: "body",
          sort: "asc",
        },
        {
          label: "Thread",
          field: "reply",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    forums.forEach((forum) => {
      data.rows.push({
        title: forum.title,
        body: truncateBody(forum.body, 20),
        reply: forum.reply.length + " Threads",
        actions: (
          <Fragment>
            <Link
              to={`/forumDetails/${forum._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteForumHandler(forum._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteForumHandler = (id) => {
    dispatch(deleteForum(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Forums"} />
      <div className="row" style={{ marginRight: "120px", padding: "20px" }}>
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Forums</h1>
            <div className="table-responsive">
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setForums()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              )}
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ForumsList;
