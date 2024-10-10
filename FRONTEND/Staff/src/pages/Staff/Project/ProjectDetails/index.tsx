import React, { useEffect, useState } from 'react';
import ButtonBack from 'pages/common/ButtonBack/ButtonBack';
import { ContainerDetailsWrap } from 'pages/common/style/ContainerWrap';
import { Box, Grid, Typography } from '@mui/material';
import { FormContainer } from 'components/Form/FormContainer';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SwitchElement from 'components/Form/SwitchElement/SwitchElement';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import SelectElement from 'components/Form/SelectElement/SelectElement';
import EditorElement from 'components/Form/EditorElement/EditorElement';
import AutocompleteElement from 'components/Form/AutocompleteElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import { BodyContentWarp } from 'pages/Staff/Styles/common';
import InputDropZone from 'pages/common/InputDropZone/InputDropZone';
import { countries } from 'models/Country.model';
import { showToast } from 'components/Common/Toast';
import { random } from 'lodash';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setLoading } from 'redux/Reducer';
import { projectService } from 'services/project.service';
import { DataServiceError, DataServiceSuccess } from 'models/ServiceResponse.model';
import { ProjectForm } from 'models/ProjectModel';
import TextAreaElement from 'components/Form/TextAreaElement/TextAreaElement';
import { fileToBase64 } from 'utils/helper';

export default function ProjectDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const schema = Yup.object().shape<any>({
    title: Yup.string().required('Title is require.'),
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
    reset,
    handleSubmit,
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
    const pId = detachParamID(location.pathname, '/admin/project/');
    if (pId && pId !== '' && pId !== 'create') {
      fetchData(pId);
    }
  }, []);

  const fetchData = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const resService: DataServiceSuccess | DataServiceError | any = await projectService.find(id);
      const data: ProjectForm = resService.data;
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

  const handlePublish = handleSubmit(async (formData: ProjectForm) => {
    try {
      dispatch(setLoading(true));
      if (file) {
        const base64 = await fileToBase64(file);
        if (base64) {
          formData.image = base64;
        }
      }
      if (dataUpated) {
        const resService: DataServiceSuccess | DataServiceError | any = await projectService.update(
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
        const resService: DataServiceSuccess | DataServiceError | any = await projectService.create(
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
      console.error('Error', error);
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

  const setForm = (data: ProjectForm) => {
    setDataUpdated(data);
    setFile(null);
    setValue('title', data.title);
    setValue('country', data.country);
    setValue('detail', data.detail);
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
          {dataUpated ? 'Update' : 'Create New'} Project
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
                placeholder="Title (*)"
                label="Title"
                name="title"
                control={control}
              ></TextFieldElement>
            </Grid>
            <Grid item xs={12}>
              <AutocompleteElement
                placeholder="Select country"
                label="Project country (*)"
                name="country"
                control={control}
                options={countries}
              ></AutocompleteElement>
            </Grid>
            <Grid item xs={12}>
              <TextAreaElement
                placeholder="Description"
                label="Details"
                name="detail"
                rows={8}
                control={control}
              ></TextAreaElement>
              {/* <EditorElement
                placeholder="Description"
                label="Details"
                name="detail"
                control={control}
              ></EditorElement> */}
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
