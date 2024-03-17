import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateLesson, // Updated import
  getLessonDetails, // Updated import
  clearErrors,
} from "../../actions/lessonActions"; // Updated import
import { UPDATE_LESSON_RESET } from "../../constants/lessonConstants"; // Updated import

const UpdateLesson = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const { error, lesson } = useSelector((state) => state.lessonDetails); // Updated state name
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.lesson); // Updated state name
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
    if (lesson && lesson._id !== id) {
      dispatch(getLessonDetails(id)); // Updated action
    } else {
      setTitle(lesson.title);
      setContent(lesson.content);
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
      successMsg("Lesson updated successfully");
      dispatch({ type: UPDATE_LESSON_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, lesson, id]); // Updated dependencies

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    dispatch(updateLesson(lesson._id, formData)); // Updated action
  };

  return (
    <Fragment>
      <MetaData title={"Update Lesson"} />
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
                <h1 className="mb-4">Update Lesson</h1>
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
                  <label htmlFor="content_field">Content</label>
                  <textarea
                    className="form-control"
                    id="content_field"
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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

export default UpdateLesson;
