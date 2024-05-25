import { React, useState } from "react";
import { Box, Button, FormControl, TextField, Stack } from "@mui/material";
import KeywordsList from "./KeywordsList";

function ExperienceForm({ handleSubmit, keywords, setKeywords }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [image, setImage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleFakeSubmit = (e) => {
    console.log(e.target);
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      encType="multipart/form-data"
      alignItems="stretch"
      display="block"
      noValidate
      autoComplete="off"
      margin={10}
      padding={10}
      border={"3px solid #364958"}
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        <FormControl fullWidth={true} variant="filled" display="inline">
          <TextField
            id="titleInput"
            label="Title"
            type="text"
            onChange={handleTitleChange}
            value={title}
          />
        </FormControl>

        <FormControl fullWidth={true} variant="filled" display="inline">
          <TextField
            id="descriptionInput"
            label="Description"
            type="text"
            multiline={true}
            inputProps={{ style: { height: "65px" } }}
            onChange={handleDescriptionChange}
            value={description}
          />
        </FormControl>

        <FormControl fullWidth={true} variant="filled" display="inline">
          <TextField
            id="locationInput"
            label="Location"
            type="text"
            onChange={handleLocationChange}
            value={location}
          />
        </FormControl>

        <FormControl sx={{ m: 1 }}>
          <KeywordsList keywords={keywords} setKeywords={setKeywords} />
        </FormControl>

        <FormControl sx={{ m: 1 }}>
          <TextField
            id="imageUpload"
            label="Image Upload"
            type="file"
            name="uploaded_file"
            InputLabelProps={{ shrink: true }}
            value={image}
            onChange={handleImageChange}
          />
        </FormControl>

        <Button
          type="submit"
          variant="outlined"
          sx={{
            backgroundColor: "#364958",
            color: "white",
            borderRadius: "7px",
          }}
        >
          Create Experience
        </Button>
      </Stack>
    </Box>
  );
}

export default ExperienceForm;
