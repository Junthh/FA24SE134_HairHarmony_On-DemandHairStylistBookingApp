import React, { useEffect, useState } from 'react';
import ButtonBack from 'pages/common/ButtonBack/ButtonBack';
import { ContainerDetailsWrap } from 'pages/common/style/ContainerWrap';
import { Box, Grid, Typography } from '@mui/material';
import { FormContainer } from 'components/Form/FormContainer';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import { BodyContentWarp } from 'pages/Staff/Styles/common';
import InputDropZone from 'pages/common/InputDropZone/InputDropZone';
import TextAreaElement from 'components/Form/TextAreaElement/TextAreaElement';
import { writerService } from 'services/writer.service';
import { WriterForm } from 'models/Writer.model';
import { DataServiceError, DataServiceSuccess } from 'models/ServiceResponse.model';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { useLocation } from 'react-router-dom';
import { random } from 'lodash';
import { showToast } from 'components/Common/Toast';
import { fileToBase64 } from 'utils/helper';

export default function WriterDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const schema = Yup.object().shape<any>({
    name: Yup.string().required('Name is require.'),
  });
  const formContext = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = formContext;
  /**
   * Begin
   */
  const [dataUpated, setDataUpdated] = useState(null);
  const [fileResetCode, setFileRestCode] = useState('none');
  const [file, setFile] = useState(null);
  const acceptTypeFile = { 'image/png': [], 'image/jpeg': [] };

  useEffect(() => {
    //update
    const pId = detachParamID(location.pathname, '/admin/writer/');
    if (pId && pId !== '' && pId !== 'create') {
      fetchData(pId);
    }
  }, []);

  const fetchData = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const resService: DataServiceSuccess | DataServiceError | any = await writerService.find(id);
      const data: WriterForm = resService.data;
      if (resService.success) {
        setForm(data);
      }
    } catch (error) {
      console.error('Error', error);
      showToast('error', 'Load data failed.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePublish = handleSubmit(async (formData: WriterForm) => {
    try {
      dispatch(setLoading(true));
      if (file) {
        const base64 = await fileToBase64(file);
        if (base64) {
          formData.image = base64;
        }
      }
      if (dataUpated) {
        const resService: DataServiceSuccess | DataServiceError | any = await writerService.update(
          dataUpated.id,
          formData,
        );
        if (resService.success) {
          handleResetFile();
          setForm(resService.data);
          showToast('success', 'Update success.');
        } else {
          showToast('error', 'Update failed.');
        }
      } else {
        const resService: DataServiceSuccess | DataServiceError | any = await writerService.create(
          formData,
        );
        if (resService.success) {
          handleResetFile();
          reset();
          showToast('success', 'Create success.');
        } else {
          showToast('error', 'Create failed.');
        }
      }
    } catch (error) {
      // console.error('Error', error);
      showToast('error', 'Submit failed.');
    } finally {
      dispatch(setLoading(false));
    }
  });

  const handleGetFile = (files: Array<File>) => {
    setFile(files[0] || null);
  };

  const handleCancel = () => {
    handleResetFile();
    reset();
    showToast('info', 'Form has been cleaned.');
  };

  const handleResetFile = () => {
    setFile(null);
    if (dataUpated) {
      setDataUpdated({ ...dataUpated, imageUrl: null });
    }
    setFileRestCode('reset' + random(1, 100));
  };

  const setForm = (data: WriterForm) => {
    setDataUpdated(data);
    setFile(null);
    setValue('name', data.name);
    setValue('desc', data.desc);
    setValue('link', data.link);
    setValue('email', data.email);
  };

  const detachParamID = (path: string, needExcept: string): string => {
    return path.split(needExcept)[1];
  };
  /**
   * End
   */
  return (
    <ContainerDetailsWrap>
      <ButtonBack />
      <BodyContentWarp>
        <Typography variant="h4" fontWeight={700}>
          {dataUpated ? 'Update' : 'Create New'} Writer
        </Typography>
        <FormContainer formContext={formContext}>
          <Grid container spacing={2} py={2}>
            <Grid item xs={12}>
              <Box width={200} height={200}>
                <InputDropZone
                  onChangeFile={handleGetFile}
                  acceptFileType={acceptTypeFile}
                  mediaType={'image'}
                  mediaUrl={dataUpated && dataUpated.imageUrl ? dataUpated.imageUrl : null}
                  resetFile={fileResetCode}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextFieldElement
                placeholder="Name"
                label="Name"
                name="name"
                control={control}
              ></TextFieldElement>
            </Grid>
            <Grid item xs={12}>
              <TextAreaElement
                placeholder="Description"
                label="Description"
                name="desc"
                rows={8}
                control={control}
              ></TextAreaElement>
            </Grid>
            <Grid item xs={6}>
              <TextFieldElement
                placeholder="Linked In"
                label="Linked In URL"
                name="link"
                control={control}
              ></TextFieldElement>
            </Grid>
            <Grid item xs={6}>
              <TextFieldElement
                placeholder="Email"
                label="Email"
                name="email"
                control={control}
              ></TextFieldElement>
            </Grid>
            <Grid item xs={12} display={'flex'} gap={'0 8px'}>
              <ButtonPrimary
                severity="cancel"
                variant="outlined"
                padding={'9px 28px'}
                onClick={handleCancel}
              >
                Empty
              </ButtonPrimary>
              <ButtonPrimary severity="primary" padding={'9px 28px'} onClick={handlePublish}>
                {dataUpated ? 'Save' : 'Create'}
              </ButtonPrimary>
            </Grid>
          </Grid>
        </FormContainer>
      </BodyContentWarp>
    </ContainerDetailsWrap>
  );
}
