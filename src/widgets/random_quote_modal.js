import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const RandomQuoteModal = ({ open, handleClose, quote }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{quote.名前}</DialogTitle>
      <DialogContent>
        <DialogContentText>{quote.言葉}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>閉じる</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RandomQuoteModal;
