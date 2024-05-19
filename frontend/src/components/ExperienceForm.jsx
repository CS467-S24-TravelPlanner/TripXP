import { React, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";
import KeywordsList from "./KeywordsList";


function ExperienceForm({ handleSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState([]);



  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeywordsChange = (e) => {
    setKeywords(
      typeof e.target.value === "string" ? value.split(",") : e.target.value
    );
  };

  return (
    <Box
      component="form"
      alignItems="stretch"
      display="block"
      noValidate
      autoComplete="off"
      margin={10}
      padding={10}
      border={"2px solid darkgray"}
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

        <Button type="submit" variant="outlined">
          Create Experience
        </Button>
      </Stack>
    </Box>
  );
}

export default ExperienceForm;
