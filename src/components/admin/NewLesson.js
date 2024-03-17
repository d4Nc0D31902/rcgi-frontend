import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getChapterDetails, // Changed from getModuleDetails to getChapterDetails
  addLesson,
  clearErrors,
} from "../../actions/chapterActions"; // Changed from moduleActions to chapterActions

const AddLesson = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapterId } = useParams(); // Changed from moduleId to chapterId

  const { loading, error, success } = useSelector((state) => state.addLesson);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/courses");
      message("Lesson created successfully");
    }
  }, [dispatch, error, success, navigate]);

  useEffect(() => {
    dispatch(getChapterDetails(chapterId)); // Changed from getModuleDetails to getChapterDetails
  }, [dispatch, chapterId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("chapterId", chapterId); // Changed from moduleId to chapterId

    await dispatch(addLesson(chapterId, formData));

    if (!error && success) {
      message("Lesson created successfully");
      navigate(`/admin/courses`); // Changed from moduleId to chapterId
    }
  };

  return (
    <Fragment>
      <MetaData title={"New Lesson"} />
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
                <h1 className="mb-4">New Lesson</h1>
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
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default AddLesson;
