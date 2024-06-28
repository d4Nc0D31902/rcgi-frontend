import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";

const ImportUser = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handleDownloadTemplate = async () => {
  //   try {
  //     const downloadUrl = process.env.PUBLIC_URL + "/Employee Import Template.xlsx";
  //     const response = await fetch(downloadUrl);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(new Blob([blob]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "Employee Import Template.xlsx");
  //     document.body.appendChild(link);
  //     link.click();

  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Error downloading template:", error);
  //     setError("Error downloading template.");
  //   }
  // };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/import-users`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("File uploaded successfully.", data);
      toast.success("File uploaded successfully.");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error while uploading file:", error);
      setError(error.response.data.message);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ height: "100vh", padding: "50px" }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Import Users
        </Typography>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            sx={{ mb: 2, borderRadius: "50px" }}
          >
            Select File
          </Button>
          <Tooltip title="Download Excel Template" placement="top">
            <IconButton
            //  onClick={handleDownloadTemplate}
             >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </label>

        <Box mt={2}>
          {file && (
            <Card>
              <CardContent>
                <Typography variant="body1">{file.name}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => setFile(null)}>Remove</Button>
              </CardActions>
            </Card>
          )}
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Box>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={handleUpload}
            disabled={loading || !file}
            fullWidth
            sx={{ borderRadius: "50px" }}
            startIcon={
              loading ? <CircularProgress size={20} /> : <CloudUpload />
            }
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ImportUser;
