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
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ModuleDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, module } = useSelector(
    (state) => state.moduleDetails
  );

  useEffect(() => {
    dispatch(getModuleDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <Fragment>
      <MetaData title={module.title} />
      <div className="row">
        <div className="col-12 col-lg-5 mt-5">
          <h3>{module.title}</h3>
          <p className="mt-2">{module.description}</p>{" "}
          <Link
            to={`/admin/module/${id}/chapter/new`}
            className="btn btn-primary"
          >
            Add Chapter
          </Link>
          <div>
            {module.chapters &&
              module.chapters.map((chapter, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`chapter-${index}-content`}
                    id={`chapter-${index}-header`}
                  >
                    <Typography>{chapter.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{chapter.description}</Typography>
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
