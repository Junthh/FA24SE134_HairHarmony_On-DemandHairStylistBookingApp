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
import { BodyContentWarp } from 'pages/Admin/Styles/common';
import TagElement from 'pages/Admin/Article/components/TagElement';
import InputDropZone from 'pages/common/InputDropZone/InputDropZone';
import { debounce, random } from 'lodash';
import { projectService } from 'services/project.service';
import {
  DataServiceError,
  DataServiceSuccess,
  OptionServiceSuccess,
} from 'models/ServiceResponse.model';
import { writerService } from 'services/writer.service';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { useLocation } from 'react-router-dom';
import { videoService } from 'services/video.service';
import { VideoForm } from 'models/Video.model';
import { showToast } from 'components/Common/Toast';
import TextAreaElement from 'components/Form/TextAreaElement/TextAreaElement';
import { fileToBase64 } from 'utils/helper';

export default function VideoDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const schema = Yup.object().shape<any>({
    title: Yup.string().required('Title is require.'),
    projectId: Yup.string().required('Project is require.'),
    // writerId: Yup.string().required('Writer is require.')
  });
  const formContext = useForm<any>({
    defaultValues: {
      isYoutube: true,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = formContext;

  /**
   * Begin
   */
  const [dataUpated, setDataUpdated] = useState(null);
  const acceptTypeFile = { 'image/png': [], 'image/jpeg': [] };
  const [fileResetCode, setFileRestCode] = useState('none');
  const [tagResetCode, setTagResetCode] = useState('none');
  const [file, setFile] = useState(null);
  const [projectOptions, setProjectOptions] = useState([]);
  const [writerOptions, setWriterOptions] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    Promise.all([fetchWriter(), fetchProject()])
      .then(([writerOtp, projectOtp]) => {
        //update
        const pId = detachParamID(location.pathname, '/admin/video/');
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

  const fetchData = async (id: string, writerOtp: Array<any>, projectOtp: Array<any>) => {
    try {
      dispatch(setLoading(true));
      const resService: DataServiceSuccess | DataServiceError | any = await videoService.find(id);
      const data: VideoForm = resService.data;
      if (resService.success) {
        setForm(data, writerOtp, projectOtp);
      }
    } catch (error) {
      // console.error('Error', error);
      return Promise.reject(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

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
      // console.error('Error', error);
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

  const handlePublish = handleSubmit(async (formData: VideoForm) => {
    try {
      dispatch(setLoading(true));
      if (!file && !dataUpated) {
        showToast('error', 'Thumbnail is requierd.');
        return;
      }

      // cover case update
      if (file) {
        const base64 = await fileToBase64(file);
        if (base64) {
          formData.thumbnail = base64;
        }
      }

      if (formData.isYoutube === undefined) {
        formData.isYoutube = false;
      }
      // if (file && !formData.isYoutube) {
      //   formData.video = file;
      // } else {
      //   delete formData.video;
      // }
      if (dataUpated) {
        const resService: DataServiceSuccess | DataServiceError | any = await videoService.update(
          dataUpated.id,
          formData,
        );
        if (resService.success) {
          handleResetFile();
          setForm(resService.data);
          showToast('success', 'Update successed.');
        } else {
          showToast('error', 'Update failed.');
        }
      } else {
        const resService: DataServiceSuccess | DataServiceError | any = await videoService.create(
          formData,
        );
        if (resService.success) {
          handleResetFile();
          setTagResetCode('reset' + random(1, 100));
          reset();
          showToast('success', 'Create successed.');
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

  const setForm = (data: any, writerOtp: Array<any> = [], projectOtp: Array<any> = []) => {
    setDataUpdated(data);
    setFile(null);
    setValue('isFeature', data.isFeature);
    setValue('title', data.title);

    const proId = data.project && data.project.id ? data.project.id : null;
    const arrAvailableProId = projectOptions.length ? projectOptions : projectOtp;
    setValue('projectId', checkItemIdInOptions(proId, arrAvailableProId));

    const wrtId = data.writer && data.writer.id ? data.writer.id : null;
    const arrAvailableWrtId = writerOptions.length ? writerOptions : writerOtp;
    setValue('writerId', checkItemIdInOptions(wrtId, arrAvailableWrtId));
    setValue('isYoutube', data.isYoutube);
    setValue('youtubeUrl', data.youtubeUrl);
    setValue('detail', data.detail);
    setValue('tags', data.tags);
    setValue('shortDesc', data.shortDesc);
  };

  const handleResetFile = () => {
    setFile(null);
    if (dataUpated) {
      setDataUpdated({ ...dataUpated, videoUrl: null });
    }
    setFileRestCode('reset' + random(1, 100));
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

  const handleCancel = () => {
    handleResetFile();
    setTagResetCode('reset' + random(1, 100));
    reset();
    showToast('info', 'Form has been cleaned.');
  };

  const handleGetFile = (files: Array<File>) => {
    setFile(files[0] || null);
  };

  const detachParamID = (path: string, needExcept: string): string => {
    return path.split(needExcept)[1];
  };

  useEffect(() => {
    const val = getValues('isYoutube');
    setValue('isYoutube', val);
  }, [watch('isYoutube')]);

  /**
   * End
   */

  return (
    <ContainerDetailsWrap>
      <ButtonBack />
      <BodyContentWarp>
        <Typography variant="h4" fontWeight={700}>
          {dataUpated ? 'Update' : 'Create New'} Video
        </Typography>
        <FormContainer formContext={formContext}>
          <Grid container spacing={2} py={2}>
            <Grid item xs={12} ml={1}>
              <Typography fontSize={18}>Thumbnail</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box width={200} height={200}>
                {/* <Typography fontSize={'18px'}>Thumbnail</Typography> */}
                <InputDropZone
                  onChangeFile={handleGetFile}
                  acceptFileType={acceptTypeFile}
                  mediaType={'image'}
                  mediaUrl={dataUpated && dataUpated.thumbnailUrl ? dataUpated.thumbnailUrl : null}
                  resetFile={fileResetCode}
                />
              </Box>
            </Grid>
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
            {/* <Grid item xs={12}>
              <AutocompleteElement
                placeholder="Select writer"
                label="Writer (*)"
                name="writerId"
                control={control}
                options={writerOptions}
              ></AutocompleteElement>
            </Grid> */}
            {/* <Grid item xs={12} ml={1}>
              <SwitchElement label="Use link youtube" name="isYoutube" control={control}></SwitchElement>
            </Grid> */}
            <Grid item xs={12}>
              <TextFieldElement
                placeholder="Link youtube"
                label="Link youtube"
                name="youtubeUrl"
                control={control}
              ></TextFieldElement>
            </Grid>
            {/* {getValues('isYoutube')
              ?
              <Grid item xs={12}>
                <TextFieldElement
                  placeholder="Link youtube"
                  label="Link youtube"
                  name="youtubeUrl"
                  control={control}
                ></TextFieldElement>
              </Grid>
              :
              <Grid item xs={12} height={200}>
                <InputDropZone
                  onChangeFile={handleGetFile}
                  acceptFileType={acceptTypeFile}
                  mediaType={'video'}
                  mediaUrl={dataUpated && dataUpated.videoUrl ? dataUpated.videoUrl : null}
                  resetFile={fileResetCode}
                />
              </Grid>
            } */}
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
