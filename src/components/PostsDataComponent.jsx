import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import JSONPretty from "react-json-pretty";

const PostsDataComponent = ({ postDataContainer, handleClose }) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={postDataContainer.open}
    >
      <DialogTitle id="simple-dialog-title">Post Details</DialogTitle>
      {postDataContainer && (
        <DialogContent>
          <JSONPretty
            id="json-pretty"
            data={JSON.stringify(postDataContainer.Data)}
          ></JSONPretty>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default PostsDataComponent;
