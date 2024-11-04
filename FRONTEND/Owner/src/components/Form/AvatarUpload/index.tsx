import React, { useState, useEffect, memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, IconButton, Avatar, CircularProgress, Button } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AvatarUpload = ({ src, control, name }) => {
  const [image, setImage] = useState(src || null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };

      // Simulate file upload progress
      setLoading(true);
      setProgress(0);
      const uploadProgress = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(uploadProgress);
            setLoading(false);
            return 100;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 200);
    }
  };

  useEffect(() => {
    if (src) setImage(src);
  }, [src]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box position="relative" display="inline-flex">
            {loading ? (
              <CircularProgress variant="determinate" value={progress} size={120} />
            ) : (
              <Avatar
                src={image}
                alt="Avatar"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '1px solid #ccc',
                }}
              />
            )}
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                color: 'black',
                backgroundColor: '#ffffff',
                '&:hover': {
                  backgroundColor: '#ffffff',
                },
              }}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => {
                  handleFileChange(event);
                  field.onChange(event.target.files[0]); // Pass the file to the form field
                }}
              />
              <PhotoCamera />
            </IconButton>
          </Box>
        </Box>
      )}
    />
  );
};
export default memo(AvatarUpload);
