import { useState } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Stack } from "@mui/material";
import Movie from "../movieCard";
import AddToFavoritesIcon from '../cardIcons/addToFavorites'
import Typography from "@mui/material/Typography";


function SimpleDialog(props) {
  const { onClose, selectedValue, open, outputList, title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h4" component="p">
          {title} is known for:
        </Typography>
      </DialogTitle>
      <Stack sx={{ pt: 0, width: "100%" }} direction="row" spacing={3} justifyContent="center">
        {outputList.map((o) => (
          o ?
          <Movie key={o.id} movie={o} width={270} action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />
          }} />
          : null
        ))}
      </Stack>
    </Dialog>
  );
}

export default function DialogButton( props ) {
  const { text, outputList, title } =props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(outputList[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} size="large" sx={{ justifyContent: 'center', margin: 'auto'}}>
        {text}
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        outputList={outputList}
        title={title}
      />
    </>
  );
}