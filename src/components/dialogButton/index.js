import { useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { Stack } from "@mui/material";
import Movie from "../movieCard";
import AddToFavoritesIcon from '../cardIcons/addToFavorites'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Zoom from '@mui/material/Zoom';


function SimpleDialog(props) {
  const { onClose, selectedValue, open, outputList, title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Zoom in={open}>
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
    </Dialog></Zoom>
  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

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