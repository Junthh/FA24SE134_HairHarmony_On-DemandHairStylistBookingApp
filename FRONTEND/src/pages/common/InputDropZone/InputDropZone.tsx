import { Box, Typography } from '@mui/material';
import { showToast } from 'components/Common/Toast';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InputDropZoneStyled } from './styles';
import { isEmpty } from 'lodash';
import FileDropZoneImage from 'assets/pics/icons/icon-file-image.svg';
import Button from 'components/Common/Button';
import { ButtonPrimary } from '../style/Button';
import CustomPlayer from 'react-player';
import './video.css';

type InputDropZoneProps = {
  onChangeFile: (files: File | Array<File>) => void;
  acceptFileType?: any;
  mediaType: 'image' | 'video';
  mediaUrl: any;
  resetFile: string;
};

export default function InputDropZone({
  onChangeFile,
  acceptFileType = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'application/pdf': [],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
  },
  mediaType = 'image',
  mediaUrl,
  resetFile = 'none',
}: InputDropZoneProps) {
  const [files, setFiles] = useState<any>([]);
  const { acceptedFiles, getRootProps, getInputProps, open, isDragActive } = useDropzone({
    maxFiles: 1,
    maxSize: 50000000,
    accept: acceptFileType,
    onDrop: (acceptedFiles, fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === 'file-invalid-type') {
            showToast('warning', 'Invalid file!');
          }
          if (err.code === 'file-too-large') {
            showToast('warning', 'File can be more than 5MB!');
          }
        });
      });
    },
  });
  useEffect(() => {
    if (!isEmpty(acceptedFiles)) {
      setFiles(acceptedFiles);
      onChangeFile(acceptedFiles as any);
    }
  }, [acceptedFiles]);

  //reset
  useEffect(() => {
    if (resetFile !== 'none') {
      setFiles([]);
    }
  }, [resetFile]);

  const mediaElement = (type: string, src: string, heightPx: string = '180') => {
    if (type === 'image') {
      return <img src={src} color="#004737" alt="" width="185px" height={`${heightPx}px`} />;
    }
    const isHidden = !mediaUrl && files.length === 0;
    return (
      !isHidden && (
        <CustomPlayer
          url={src}
          controls
          config={{
            youtube: {
              playerVars: {
                rel: 0,
              },
            },
          }}
        />
      )
    );
  };

  return (
    <InputDropZoneStyled>
      <Box
        {...getRootProps({ className: 'dropzone' })}
        className={isDragActive ? 'container-drag_active' : 'container-drag'}
      >
        <input {...getInputProps()} />
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px 0px' }}
        >
          {/* {mediaUrl && files.length === 0
            ? mediaElement(mediaType, mediaUrl)
            : (mediaUrl || !mediaUrl) && files.length > 0
              ? mediaElement(mediaType, URL.createObjectURL(files[0]))
              : mediaElement(mediaType, FileDropZoneImage, '120')
          } */}
          {mediaUrl && files.length === 0
            ? mediaElement(mediaType, URL.createObjectURL(mediaUrl))
            : files.length > 0
            ? mediaElement(mediaType, URL.createObjectURL(files[0]))
            : mediaElement(mediaType, FileDropZoneImage, '120')}
          {files.length > 0 ? (
            <aside>
              <span>
                {files.length > 0 &&
                  files.map((file: any) => (
                    <span key={file.path}>{/* {file.path} - {file.size} bytes */}</span>
                  ))}
              </span>
            </aside>
          ) : (
            !mediaUrl && <Typography variant="body2">Click or drop file to here. </Typography>
          )}
          {/* <ButtonPrimary
            padding={'0px 4px'}
            severity="primary"
            sx={{
              textTransform: 'none',
            }}
          >
            <Typography variant="body2" fontWeight={600} padding={'4px 8px'}>
              Choose file
            </Typography>
          </ButtonPrimary> */}
        </Box>
      </Box>
    </InputDropZoneStyled>
  );
}
