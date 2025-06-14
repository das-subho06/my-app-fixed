import { Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Modal({ open, close, onaction }) {
  if (!open) return null;

  return(
    
         <Dialog open={open} id="dialog" >
      
    <DialogTitle id="alert-dialog-title">
          {"Delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
          onaction();
        }} disableRipple color='success' variant='outlined'>Yes</Button>
          <Button onClick={close} disableRipple variant='outlined' color='error'>
            No
          </Button>
        </DialogActions>
        
        </Dialog>
        
 
  )
}