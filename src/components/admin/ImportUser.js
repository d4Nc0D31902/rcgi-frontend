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
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ImportUser = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    <Container maxWidth="md" sx={{ height: "100vh" }}>
      <Paper
        elevation={3}
        sx={{ padding: 2, border: "2px solid black", marginTop: "150px" }}
      >
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
            sx={{ mb: 2 }}
          >
            Select File
          </Button>
        </label>
        <Box mt={2}>
          {file && (
            <Card>
              <CardContent>
                {/* <Typography variant="subtitle1">Selected File:</Typography> */}
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
            sx={{ borderRadius: "20px" }}
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
