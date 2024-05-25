import { getKeywords } from "../utilities/Keywords";
import { React } from "react";
import {
  MenuItem,
  FormControl,
  TextField,
  ListItemText,
  OutlinedInput,
  Checkbox,
} from "@mui/material";

const keywordsList = getKeywords();

function KeywordsList({ keywords, setKeywords }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleKeywordsChange = (e) => {
    let newList =
      typeof e.target.value === "string" ? value.split(",") : e.target.value;
    setKeywords(newList);
  };

  return (
    <div>
      <FormControl fullWidth>
        <TextField
          id="keywordsSelect"
          label="Keywords"
          select
          SelectProps={{
            multiple: true,
            value: keywords,
            onChange: handleKeywordsChange,
            input: <OutlinedInput label="Keywords" />,
            renderValue: (selected) => selected.join(", "),
            MenuProps: MenuProps,
          }}
          variant="outlined"
        >
          {keywordsList.map((keyword) => (
            <MenuItem key={keyword} value={keyword}>
              <Checkbox checked={keywords.indexOf(keyword) > -1} />
              <ListItemText primary={keyword} />
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </div>
  );
}

export default KeywordsList;
