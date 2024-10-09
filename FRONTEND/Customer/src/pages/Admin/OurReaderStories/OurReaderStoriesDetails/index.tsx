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
import TagElement from '../components/TagElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import { BodyContentWarp } from 'pages/Admin/Styles/common';
import InputDropZone from 'pages/common/InputDropZone/InputDropZone';
import {
  DataServiceError,
  DataServiceSuccess,
  OptionServiceSuccess,
} from 'models/ServiceResponse.model';
import { showToast } from 'components/Common/Toast';
import { random } from 'lodash';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { useLocation } from 'react-router-dom';
import { writerService } from 'services/writer.service';
import { projectService } from 'services/project.service';
import { ourReaderStoryService } from 'services/ourReaderStory.service';
import { OurReaderStoryForm } from 'models/OurReaderStory.model';
import TextAreaElement from 'components/Form/TextAreaElement/TextAreaElement';
import { fileToBase64 } from 'utils/helper';

export default function OurReaderStoriesDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const schema = Yup.object().shape<any>({
    title: Yup.string().required('Title is require.'),
    projectId: Yup.string().required('Project is require.'),
    writerId: Yup.string().required('Writer is require.'),
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
  const [tagResetCode, setTagResetCode] = useState('none');
  const [file, setFile] = useState(null);
  const acceptTypeFile = { 'image/png': [], 'image/jpeg': [] };
  const [projectOptions, setProjectOptions] = useState([]);
  const [writerOptions, setWriterOptions] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    Promise.all([fetchWriter(), fetchProject()])
      .then(([writerOtp, projectOtp]) => {
        //update
        const pId = detachParamID(location.pathname, '/admin/our-reader-stories/');
        if (pId && pId !== '' && pId !== 'create') {
          fetchData(pId, writerOtp, projectOtp);
        }
      })
      .catch((err) => {
        showToast('error', 'Load data failed.');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  const fetchWriter = async () => {
    try {
      const resService: OptionServiceSuccess | DataServiceError | any =
        await writerService.options();
      if (resService.success) {
        setWriterOptions(resService.data);
        return Promise.resolve(resService.data);
      }
      return Promise.resolve([]);
    } catch (error) {
      console.error('Error', error);
      return Promise.reject(error);
    }
  };

  const fetchProject = async () => {
    try {
      const resService: OptionServiceSuccess | DataServiceError | any =
        await projectService.options();
      if (resService.success) {
        setProjectOptions(resService.data);
        return Promise.resolve(resService.data);
      }
      return Promise.resolve([]);
    } catch (error) {
      console.error('Error', error);
      return Promise.reject(error);
    }
  };

  const fetchData = async (id: string, writerOtp: Array<any> = [], projectOtp: Array<any> = []) => {
    try {
      dispatch(setLoading(true));
      const resService: DataServiceSuccess | DataServiceError | any =
        await ourReaderStoryService.find(id);
      const data: OurReaderStoryForm = resService.data;
      if (resService.success) {
        setForm(data, writerOtp, projectOtp);
      }
    } catch (error) {
      console.error('Error', error);
      showToast('error', 'Load data failed.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePublish = handleSubmit(async (formData: OurReaderStoryForm) => {
    try {
      dispatch(setLoading(true));
      if (file) {
        const base64 = await fileToBase64(file);
        if (base64) {
          formData.image = base64;
        }
      }
      if (dataUpated) {
        const resService: DataServiceSuccess | DataServiceError | any =
          await ourReaderStoryService.update(dataUpated.id, formData);
        if (resService.success) {
          handleResetFile();
          setForm(resService.data);
          showToast('success', 'Update success.');
        } else {
          showToast('error', 'Update failed.');
        }
      } else {
        const resService: DataServiceSuccess | DataServiceError | any =
          await ourReaderStoryService.create(formData);
        if (resService.success) {
          handleResetFile();
          setTagResetCode('reset' + random(1, 100));
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
    setTagResetCode('reset' + random(1, 100));
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

  const detachParamID = (path: string, needExcept: string): string => {
    return path.split(needExcept)[1];
  };

  const setForm = (data: any, writerOtp: Array<any> = [], projectOtp: Array<any> = []) => {
    setDataUpdated(data);
    setFile(null);
    setValue('isFeature', data.isFeature);
    setValue('title', data.title);
    setValue('detail', data.detail);
    setValue('tags', data.tags);
    setValue('shortDesc', data.shortDesc);

    const proId = data.project && data.project.id ? data.project.id : null;
    const arrAvailableProId = projectOptions.length ? projectOptions : projectOtp;
    setValue('projectId', checkItemIdInOptions(proId, arrAvailableProId));

    const wrtId = data.writer && data.writer.id ? data.writer.id : null;
    const arrAvailableWrtId = writerOptions.length ? writerOptions : writerOtp;
    setValue('writerId', checkItemIdInOptions(wrtId, arrAvailableWrtId));
  };

  const checkItemIdInOptions = (itemId: string, list: Array<any>) => {
    if (list.length === 0) {
      return null;
    }
    const items: any = list.filter((item: any) => {
      return item.value === itemId;
    });
    if (items.length === 0) {
      return null;
    }
    return items[0].value;
  };
  /**
   * End
   */

  return (
    <ContainerDetailsWrap>
      <ButtonBack />
      <BodyContentWarp>
        <Typography variant="h4" fontWeight={700}>
          {dataUpated ? 'Update' : 'Create New'} Story
        </Typography>
        <FormContainer formContext={formContext}>
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
          <Grid container spacing={2} py={2}>
            <Grid item xs={12} ml={1}>
              <SwitchElement label="Feature" name="isFeature" control={control}></SwitchElement>
            </Grid>
            <Grid item xs={12}>
              <TextFieldElement
                placeholder="Title"
                label="Title (*)"
                name="title"
                control={control}
              ></TextFieldElement>
            </Grid>
            <Grid item xs={12}>
              <AutocompleteElement
                placeholder="Select project"
                label="Project name (*)"
                name="projectId"
                control={control}
                options={projectOptions}
              ></AutocompleteElement>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <AutocompleteElement
                placeholder="Select writer"
                label="Writer (*)"
                name="writerId"
                control={control}
                options={writerOptions}
              ></AutocompleteElement>
            </Grid>
            <Grid item xs={12}>
              <TextAreaElement
                placeholder="Short description"
                label="Short description"
                name="shortDesc"
                rows={4}
                control={control}
                options={[]}
              ></TextAreaElement>
            </Grid>
            <Grid item xs={12}>
              <EditorElement
                placeholder="Description"
                label="Details"
                name="detail"
                control={control}
              ></EditorElement>
            </Grid>
            <Grid item xs={12}>
              <TagElement formContext={formContext} rerender={tagResetCode} />
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
