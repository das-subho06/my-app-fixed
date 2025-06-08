import { Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Modal({ open, close, onaction }) {
  if (!open) return null;

  return (
    <div>
      <Typography variant='h3'>Are you sure you want to delete this task?</Typography>
      <Button variant="contained"
        onClick={() => {
          onaction();
        }}
      >
        Yes
      </Button>
    </div>
  );
}