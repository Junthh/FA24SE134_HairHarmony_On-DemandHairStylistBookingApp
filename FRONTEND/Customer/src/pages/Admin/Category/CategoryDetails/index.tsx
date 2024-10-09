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
import InputDropZone from 'pages/common/InputDropZone/InputDropZone';
import TextAreaElement from 'components/Form/TextAreaElement/TextAreaElement';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { useLocation } from 'react-router-dom';
import { showToast } from 'components/Common/Toast';
import { categoryService } from 'services/category.service';
import { DataServiceError, DataServiceSuccess } from 'models/ServiceResponse.model';
import { CategoryForm } from 'models/Category.model';

export default function CategoryDetails() {
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

  useEffect(() => {
    //update
    const pId = detachParamID(location.pathname, '/admin/category/');
    if (pId && pId !== '' && pId !== 'create') {
      fetchData(pId);
    }
  }, []);

  const fetchData = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const resService: DataServiceSuccess | DataServiceError | any = await categoryService.find(
        id,
      );
      const data: CategoryForm = resService.data;
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

  const handlePublish = handleSubmit(async (formData: CategoryForm) => {
    // console.log(formData);
    try {
      dispatch(setLoading(true));
      if (dataUpated) {
        const resService: DataServiceSuccess | DataServiceError | any =
          await categoryService.update(dataUpated.id, formData);
        if (resService.success) {
          setForm(resService.data);
          showToast('success', 'Update success.');
        } else {
          showToast('error', 'Update failed.');
        }
      } else {
        const resService: DataServiceSuccess | DataServiceError | any =
          await categoryService.create(formData);
        if (resService.success) {
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

  const handleCancel = () => {
    reset();
    showToast('info', 'Form has been cleaned.');
  };

  const setForm = (data: CategoryForm) => {
    setDataUpdated(data);
    setValue('name', data.name);
    setValue('color', data.color);
    setValue('desc', data.desc);
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
          {dataUpated ? 'Update' : 'Create New'} Category
        </Typography>
        <FormContainer formContext={formContext}>
          <Grid container spacing={2} py={2}>
            <Grid item xs={12}>
              <TextFieldElement
                placeholder="Name"
                label="Name"
                name="name"
                control={control}
              ></TextFieldElement>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  '& .MuiOutlinedInput-root': {
                    width: 50,
                  },
                }}
              >
                <TextFieldElement
                  placeholder="Color code"
                  label="Color code"
                  name="color"
                  type="color"
                  control={control}
                ></TextFieldElement>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextAreaElement
                placeholder="Description"
                label="Description"
                name="desc"
                rows={8}
                control={control}
                options={[]}
              ></TextAreaElement>
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
