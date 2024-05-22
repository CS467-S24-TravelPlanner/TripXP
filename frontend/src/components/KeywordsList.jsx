import { getKeywords } from "../utilities/Keywords";
import { React } from "react";
import { InputLabel, MenuItem, ListItemText, Select, OutlinedInput, Checkbox } from "@mui/material";


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
        let newList = typeof e.target.value === "string" ? value.split(",") : e.target.value;
        setKeywords(newList)
      };

    return (
        <div>
        <InputLabel id="keywords-label">Keywords</InputLabel>
          <Select
            labelId="keywords-label"
            id="keywordsSelect"
            multiple
            fullWidth
            value={keywords}
            onChange={handleKeywordsChange}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {keywordsList.map((keyword) => (
              <MenuItem key={keyword} value={keyword}>
                <Checkbox checked={keywords.indexOf(keyword) > -1} />
                <ListItemText primary={keyword} />
              </MenuItem>
            ))}
          </Select>
          </div>
    )
};

export default KeywordsList;