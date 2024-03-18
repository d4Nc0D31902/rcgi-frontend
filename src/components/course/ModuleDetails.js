import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getModuleDetails, clearErrors } from "../../actions/moduleActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteChapter } from "../../actions/chapterActions";
import { deleteLesson } from "../../actions/lessonActions"; // Import the deleteLesson action
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ModuleDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, module } = useSelector(
    (state) => state.moduleDetails
  );

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    dispatch(getModuleDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  const handleDelete = (chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      dispatch(deleteChapter(chapterId)).then(() => {
        toast.success("Chapter deleted successfully");
        navigate("/admin/courses");
      });
    }
  };

  const handleDeleteLesson = (lessonId) => {
    // Implement handleDeleteLesson function
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      dispatch(deleteLesson(lessonId)).then(() => {
        toast.success("Lesson deleted successfully");
        navigate("/admin/courses");
      });
    }
  };

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <Fragment>
      <MetaData title={module.title} />
      <div className="row">
        <div className="col-12 col-lg-5 mt-5">
          <h3>{module.title}</h3>
          <p className="mt-2">{module.description}</p>{" "}
          {isAdmin && (
            <Link
              to={`/admin/module/${id}/chapter/new`}
              className="btn btn-primary"
            >
              Add Chapter
            </Link>
          )}
          <div>
            {module.chapters &&
              module.chapters.map((chapter, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`chapter-${index}-content`}
                    id={`chapter-${index}-header`}
                  >
                    <div>
                      <Link to={`/admin/chapterDetails/${chapter._id}`}>
                        {chapter.title}
                      </Link>
                      {isAdmin && (
                        <Link to={`/admin/chapter/${chapter._id}`}>
                          <IconButton color="primary" size="small">
                            <EditOutlinedIcon fontSize="inherit" />
                          </IconButton>
                        </Link>
                      )}
                      {isAdmin && (
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(chapter._id)}
                        >
                          <DeleteOutlineOutlinedIcon fontSize="inherit" />
                        </IconButton>
                      )}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex}>
                        <Link to={`/admin/lessonDetails/${lesson._id}`}>
                          <p>{lesson.title}</p>
                        </Link>
                        {isAdmin && (
                          <Link to={`/admin/lesson/${lesson._id}`}>
                            <IconButton color="primary" size="small">
                              <EditOutlinedIcon fontSize="inherit" />
                            </IconButton>
                          </Link>
                        )}
                        {isAdmin && (
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteLesson(lesson._id)}
                          >
                            <DeleteOutlineOutlinedIcon fontSize="inherit" />
                          </IconButton>
                        )}
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModuleDetails;
