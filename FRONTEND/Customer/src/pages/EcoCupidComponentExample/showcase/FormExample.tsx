import { Box } from '@mui/system';
import { FormContainer } from 'components/Form/FormContainer';
import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import CheckboxGroupElement from 'components/Form/CheckboxGroupElement/CheckboxGroupElement';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import SelectElement from 'components/Form/SelectElement/SelectElement';
import CurrencyFieldElement from 'components/Form/CurrencyFieldElement/CurrencyFieldElement';
import Button from 'components/Common/Button';
import RadioGroupElement from 'components/Form/RadioGroupElement/RadioGroupElement';
import Breadscrumb from 'components/Common/Breadscrumb';
import { Dialog } from 'components/Common/Dialog';
import useModal from 'hooks/useModal';
import { DatePicker, Radio, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import DateRangePickerElement from 'components/Form/DateRangePicker/DateRangePicker';

const { RangePicker } = DatePicker;
export default function FormExample() {
  const schema = Yup.object().shape<any>({});

  const defaultValues: any = {
    amountOfSpace: 5,
    amountOfSpace2: 401,
  };

  const formContext = useForm<any>({
    defaultValues: defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = formContext;
  return (
    <>
      <FormContainer formContext={formContext}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CheckboxGroupElement
              label="National"
              name="national"
              row
              options={[
                {
                  value: 'VN',
                  label: 'Việt Nam',
                },
                {
                  value: 'SN',
                  label: 'Singapore',
                },
              ]}
            ></CheckboxGroupElement>
          </Grid>
          <Grid item xs={6}>
            <TextFieldElement label="Name" name="name" placeholder="Name"></TextFieldElement>
          </Grid>
          <Grid item xs={6}>
            <SelectElement
              label="Name"
              name="name"
              control={control}
              placeholder="Placeholder"
              options={[
                {
                  value: 'VN',
                  label: 'Việt Nam',
                },
                {
                  value: 'SN',
                  label: 'Singapore',
                },
              ]}
            ></SelectElement>
          </Grid>
          <Grid item xs={6}>
            <CurrencyFieldElement
              label="Currency"
              name="currency"
              control={control}
              placeholder="Currency"
            ></CurrencyFieldElement>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <RadioGroupElement
              label="Gender"
              name="gender"
              row
              control={control}
              options={[
                {
                  value: 'VN',
                  label: 'Việt Nam',
                },
                {
                  value: 'SN',
                  label: 'Singapore',
                },
              ]}
            ></RadioGroupElement>
          </Grid>
          <Grid item xs={6}>
            <DateRangePickerElement name="datepicker" />
          </Grid>
          <Grid item xs={6}>
            {/* <NumberDecreaseIncrease
              name="amountOfSpace"
              control={control}
              label="Amount of space"
              placeholder="Amount of space"
              direction="horizontal"
            /> */}
          </Grid>
          <Grid item xs={6}>
            {/* <NumberDecreaseIncrease
              name="amountOfSpace2"
              control={control}
              label="Amount of space"
              placeholder="Amount of space"
              direction="popover"
            /> */}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ color: 'white' }}
              onClick={() => {
                // console.log('Yup-------------------------');
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormContainer>
    </>
  );
}
FormExample.code = `
export default function FormExample() {
  const schema = Yup.object().shape<any>({});
 
  const defaultValues: any = {};

  const formContext = useForm<any>({
    defaultValues: defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    control,
    watch,
    formState: { errors },
  } = formContext;
  return (
    <>
      <FormContainer formContext={formContext}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CheckboxGroupElement
              label="National"
              name="national"
              row
              options={[
                {
                  value: 'VN',
                  label: 'Việt Nam',
                },
                {
                  value: 'SN',
                  label: 'Singapore',
                },
              ]}
            ></CheckboxGroupElement>
          </Grid>
          <Grid item xs={6}>
            <TextFieldElement label="Name" name="name" placeholder="Name"></TextFieldElement>
          </Grid>
          <Grid item xs={6}>
            <SelectElement
              label="Name"
              name="name"
              control={control}
              placeholder="Placeholder"
              options={[
                {
                  value: 'VN',
                  label: 'Việt Nam',
                },
                {
                  value: 'SN',
                  label: 'Singapore',
                },
              ]}
            ></SelectElement>
          </Grid>
          <Grid item xs={6}>
            <CurrencyFieldElement
              label="Currency"
              name="currency"
              control={control}
              placeholder="Currency"
            ></CurrencyFieldElement>
          </Grid>
          <Grid item xs={6}>
            <MultiSelectElement
              itemValue="value"
              itemLabel="label"
              showCheckbox
              label="Multi Select"
              name="work"
              control={control}
              placeholder="Placeholder"
              options={[
                {
                  value: 'VN',
                  label: 'Việt Nam',
                },
                {
                  value: 'SN',
                  label: 'Singapore',
                },
              ]}
            ></MultiSelectElement>
          </Grid>
          <Grid item xs={6}>
            <RadioGroupElement
              label="Gender"
              name="gender"
              row
              control={control}
              options={[
                {
                  value: 'VN',
                  label: 'Việt Nam',
                },
                {
                  value: 'SN',
                  label: 'Singapore',
                },
              ]}
            ></RadioGroupElement>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ color: 'white' }}
              onClick={() => {
                console.log('Yup-------------------------');
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormContainer>
      
  );
}
`;
