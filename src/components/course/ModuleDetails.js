import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getModuleDetails,
  clearErrors,
  reorderModule,
} from "../../actions/moduleActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  deleteChapter,
  reorderChapterItems,
} from "../../actions/chapterActions";
import { deleteLesson } from "../../actions/lessonActions";
import { deleteQuiz } from "../../actions/quizActions";
import { deleteForum } from "../../actions/forumActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import BookIcon from "@mui/icons-material/Book";
import ForumIcon from "@mui/icons-material/Forum";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ModuleDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, module } = useSelector(
    (state) => state.moduleDetails
  );

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (module) {
      setChapters(module.chapters);
    }
  }, [module]);

  useEffect(() => {
    dispatch(getModuleDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  const handleDelete = (chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      dispatch(deleteChapter(chapterId)).then(() => {
        dispatch(getModuleDetails(id));
        toast.success("Chapter deleted successfully");
      });
    }
  };

  const handleDeleteQuiz = (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuiz(quizId)).then(() => {
        dispatch(getModuleDetails(id));
        toast.success("Quiz deleted successfully");
      });
    }
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      dispatch(deleteLesson(lessonId)).then(() => {
        dispatch(getModuleDetails(id));
        toast.success("Lesson deleted successfully");
      });
    }
  };

  const handleDeleteForum = (forumId) => {
    if (window.confirm("Are you sure you want to delete this Forum?")) {
      dispatch(deleteForum(forumId)).then(() => {
        dispatch(getModuleDetails(id));
        toast.success("Forum deleted successfully");
      });
    }
  };

  const onDragEnd = (result) => {
    try {
      if (!result.destination) return;

      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;

      const updatedChapters = [...chapters];
      const [removed] = updatedChapters.splice(sourceIndex, 1);
      updatedChapters.splice(destinationIndex, 0, removed);

      setChapters(updatedChapters);

      const chapterOrder = updatedChapters.map((chapter) => chapter._id);
      dispatch(reorderModule(id, { chaptersOrder: chapterOrder }));
      dispatch(getModuleDetails(id));
    } catch (error) {
      console.error("Error reordering items:", error);
    }
  };

  const onChapterDragEnd = (result, chapterId) => {
    try {
      if (!result.destination) {
        return;
      }

      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;

      const chapterIndex = chapters.findIndex((ch) => ch._id === chapterId);

      const reorderedItems = Array.from(chapters[chapterIndex].lessons);

      const [removed] = reorderedItems.splice(sourceIndex, 1);
      reorderedItems.splice(destinationIndex, 0, removed);

      const updatedChapters = [...chapters];
      updatedChapters[chapterIndex].lessons = reorderedItems;

      setChapters(updatedChapters);

      dispatch(
        reorderChapterItems(chapterId, { lessonsOrder: reorderedItems })
      );
    } catch (error) {
      console.error("Error reordering items:", error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Typography variant="h2">{error}</Typography>;

  return (
    <Fragment>
      <MetaData title={module.title} />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
            <div style={{ marginBottom: "20px" }}>
              {module.images && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                >
                  {module.images.map((image, index) => (
                    <img
                      src={image.url}
                      alt={`Image ${index}`}
                      key={index}
                      style={{
                        width: "20%",
                        maxHeight: "200px",
                        margin: "10px 0",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="h3" mt={2}>
              {module.title}
            </Typography>
            <Typography variant="body1" mt={2}>
              {module.description}
            </Typography>
            {isAdmin && (
              <>
                <Button
                  variant="outlined"
                  color="success"
                  component={Link}
                  to={`/admin/module/${id}/chapter/new`}
                  mt={2}
                  style={{ marginTop: "20px" }}
                  startIcon={<BookIcon />}
                >
                  Add Chapter
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={`/admin/module/${id}/forum/new`}
                  mt={2}
                  style={{ marginTop: "20px", marginLeft: "10px" }}
                  startIcon={<ForumIcon />}
                >
                  Add Forum
                </Button>
              </>
            )}
            <Divider style={{ margin: "20px 0" }} />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable-chapters">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {module.chapters &&
                      module.chapters.map((chapter, index) => {
                        const isLastChapter =
                          index === module.chapters.length - 1;
                        return (
                          <Draggable
                            key={chapter._id}
                            draggableId={chapter._id}
                            index={index}
                          >
                            {(provided) => (
                              <Accordion
                                key={index}
                                defaultExpanded={true}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls={`chapter-${index}-content`}
                                  id={`chapter-${index}-header`}
                                >
                                  <div>
                                    <Typography
                                      variant="subtitle1"
                                      component={Link}
                                      to={`/admin/chapterDetails/${chapter._id}`}
                                      style={{
                                        color: "black",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {chapter.title}
                                    </Typography>
                                    {isAdmin && (
                                      <IconButton
                                        color="primary"
                                        size="small"
                                        component={Link}
                                        to={`/admin/chapter/${chapter._id}`}
                                      >
                                        <EditOutlinedIcon fontSize="inherit" />
                                      </IconButton>
                                    )}
                                    {isAdmin && (
                                      <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() =>
                                          handleDelete(chapter._id)
                                        }
                                      >
                                        <DeleteOutlineOutlinedIcon fontSize="inherit" />
                                      </IconButton>
                                    )}
                                  </div>
                                </AccordionSummary>
                                <AccordionDetails
                                  style={{ backgroundColor: "lightgray" }}
                                >
                                  <DragDropContext
                                    onDragEnd={(result) =>
                                      onChapterDragEnd(result, chapter._id)
                                    }
                                  >
                                    <Droppable
                                      droppableId={`chapter-${chapter._id}-lessons`}
                                    >
                                      {(provided) => (
                                        <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                        >
                                          {chapter.lessons.map(
                                            (lesson, lessonIndex) => (
                                              <Draggable
                                                key={lesson._id}
                                                draggableId={lesson._id}
                                                index={lessonIndex}
                                              >
                                                {(provided) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                  >
                                                    <Typography
                                                      variant="body1"
                                                      component={Link}
                                                      to={`/admin/lessonDetails/${lesson._id}`}
                                                      style={{
                                                        color: "black",
                                                        textDecoration: "none",
                                                      }}
                                                    >
                                                      {lesson.title}
                                                    </Typography>
                                                    {isAdmin && (
                                                      <IconButton
                                                        color="primary"
                                                        size="small"
                                                        component={Link}
                                                        to={`/admin/lesson/${lesson._id}`}
                                                      >
                                                        <EditOutlinedIcon fontSize="inherit" />
                                                      </IconButton>
                                                    )}
                                                    {isAdmin && (
                                                      <IconButton
                                                        color="error"
                                                        size="small"
                                                        onClick={() =>
                                                          handleDeleteLesson(
                                                            lesson._id
                                                          )
                                                        }
                                                      >
                                                        <DeleteOutlineOutlinedIcon fontSize="inherit" />
                                                      </IconButton>
                                                    )}
                                                  </div>
                                                )}
                                              </Draggable>
                                            )
                                          )}
                                          {provided.placeholder}
                                        </div>
                                      )}
                                    </Droppable>
                                  </DragDropContext>
                                </AccordionDetails>
                                {isLastChapter && module.forum && (
                                  <AccordionDetails
                                    style={{ backgroundColor: "lightgray" }}
                                  >
                                    {module.forum.map((forum, forumIndex) => (
                                      <div key={forumIndex}>
                                        <Typography
                                          variant="body1"
                                          component={Link}
                                          to={`/forumDetails/${forum._id}`}
                                          style={{
                                            color: "black",
                                            textDecoration: "none",
                                          }}
                                        >
                                          {forum.title}
                                        </Typography>
                                        {isAdmin && (
                                          <IconButton
                                            color="primary"
                                            size="small"
                                            component={Link}
                                            to={`/admin/forum/${forum._id}`}
                                          >
                                            <EditOutlinedIcon fontSize="inherit" />
                                          </IconButton>
                                        )}
                                        {isAdmin && (
                                          <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                              handleDeleteForum(forum._id)
                                            }
                                          >
                                            <DeleteOutlineOutlinedIcon fontSize="inherit" />
                                          </IconButton>
                                        )}
                                      </div>
                                    ))}
                                  </AccordionDetails>
                                )}
                                <AccordionDetails
                                  style={{ backgroundColor: "lightgray" }}
                                >
                                  <DragDropContext
                                    onDragEnd={(result) =>
                                      onChapterDragEnd(result, chapter._id)
                                    }
                                  >
                                    <Droppable
                                      droppableId={`chapter-${chapter._id}-quizzes`}
                                    >
                                      {(provided) => (
                                        <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                        >
                                          {chapter.quizzes.map(
                                            (quiz, quizIndex) => (
                                              <Draggable
                                                key={quiz._id}
                                                draggableId={quiz._id}
                                                index={quizIndex}
                                              >
                                                {(provided) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                  >
                                                    <Typography
                                                      variant="body1"
                                                      component={Link}
                                                      to={`/admin/quizDetails/${quiz._id}`}
                                                      style={{
                                                        color: "black",
                                                        textDecoration: "none",
                                                      }}
                                                    >
                                                      {quiz.title}
                                                    </Typography>
                                                    {isAdmin && (
                                                      <IconButton
                                                        color="primary"
                                                        size="small"
                                                        component={Link}
                                                        to={`/admin/quiz/${quiz._id}`}
                                                      >
                                                        <EditOutlinedIcon fontSize="inherit" />
                                                      </IconButton>
                                                    )}
                                                    {isAdmin && (
                                                      <IconButton
                                                        color="error"
                                                        size="small"
                                                        onClick={() =>
                                                          handleDeleteQuiz(
                                                            quiz._id
                                                          )
                                                        }
                                                      >
                                                        <DeleteOutlineOutlinedIcon fontSize="inherit" />
                                                      </IconButton>
                                                    )}
                                                  </div>
                                                )}
                                              </Draggable>
                                            )
                                          )}
                                          {provided.placeholder}
                                        </div>
                                      )}
                                    </Droppable>
                                  </DragDropContext>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ModuleDetails;
