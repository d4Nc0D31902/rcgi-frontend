import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";

const ModuleModal = ({ open, handleClose }) => {
  const { user } = useSelector((state) => state.auth);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const text = `Congratulations ${user.name}! Well done on completing the Module!`;
    doc.text(text, 10, 10);
    doc.save("module_completion_certificate.pdf");
  };

  return (
    <Dialog open={open} onClose={handleClose} style={{ borderRadius: "20px" }}>
      <DialogTitle>
        <Typography variant="h6" style={{ fontWeight: "bold", color: "#333" }}>
          Congratulations!
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          I would like to congratulate you on completing the course. You can now
          get the hard copy of acknowledgement form by showing and using this as
          a proof that you have completed the course in HR.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleDownloadPDF}
          style={{ marginTop: 20, borderRadius: "20px" }}
          endIcon={<PictureAsPdfIcon />}
        >
          Download
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleModal;
