import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateChapter,
  getChapterDetails,
  clearErrors,
} from "../../actions/chapterActions"; // Updated import
import { UPDATE_CHAPTER_RESET } from "../../constants/chapterConstants"; // Updated import

const UpdateChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { error, chapter } = useSelector((state) => state.chapterDetails); // Updated state name
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.chapter); // Updated state name
  let { id } = useParams();
  let navigate = useNavigate();
  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  useEffect(() => {
    if (chapter && chapter._id !== id) {
      dispatch(getChapterDetails(id)); // Updated action
    } else {
      setTitle(chapter.title);
      setDescription(chapter.description);
    }
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      navigate("/admin/courses");
      successMsg("Chapter updated successfully");
      dispatch({ type: UPDATE_CHAPTER_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, chapter, id]); // Updated dependencies

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    dispatch(updateChapter(chapter._id, formData)); // Updated action
  };

  return (
    <Fragment>
      <MetaData title={"Update Chapter"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Update Chapter</h1>
                <div className="form-group">
                  <label htmlFor="title_field">Title</label>
                  <input
                    type="text"
                    id="title_field"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateChapter;
