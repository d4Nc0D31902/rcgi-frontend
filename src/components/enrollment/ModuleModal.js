import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import html2canvas from "html2canvas";

const ModuleModal = ({ open, handleClose }) => {
  const { user } = useSelector((state) => state.auth);
  const certificateRef = useRef(null);

  const handleDownloadImage = async () => {
    if (certificateRef.current) {
      certificateRef.current.style.display = "block";

      const canvas = await html2canvas(certificateRef.current, {
        scale: 1, 
        useCORS: true, 
      });

      certificateRef.current.style.display = "none";

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "Certicate.jpg";
      link.click();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} style={{ borderRadius: "30px" }}>
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
        <Typography variant="body1">CONGRATULATIONS, WELL DONE!</Typography>
        <div
          ref={certificateRef}
          style={{
            display: "none", // Initially hidden
            position: "relative",
            textAlign: "center",
            marginTop: 20,
            width: "800px", // Adjust width as needed
            height: "auto", // Adjust height as needed
          }}
        >
          <img
            src="/images/Cert.jpg"
            alt="Certificate"
            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
          />
          <Typography
            variant="h5"
            style={{
              position: "absolute",
              top: "34%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {user.name}
          </Typography>
        </div>
        <Button
          variant="contained"
          color="error"
          onClick={handleDownloadImage}
          style={{ marginTop: 20, borderRadius: "20px" }}
        >
          Download Certificate
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleModal;
