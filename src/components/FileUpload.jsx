import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Popup from "reactjs-popup";
import { useFlight } from "../Contexts/Flights";

const FileUpload = () => {
  const [image, setImage] = useState(null);
  const { uploadImage } = useFlight();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image != null) {
      uploadImage(image);
    }
  };
  return (
    <div>
      <Popup
        trigger={
          <label htmlFor="icb">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera style={{ fontSize: "3rem" }} />
            </IconButton>
          </label>
        }
        position="right center"
      >
        <input
          type="file"
          id="icb"
          className="d-none"
          onChange={handleChange}
        />

        {image ? (
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={() => handleUpload()}
          >
            Upload
          </Button>
        ) : null}
      </Popup>
    </div>
  );
};

export default FileUpload;
