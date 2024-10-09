import { Box, Chip, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import { ButtonPrimary } from 'pages/common/style/Button';
import React, { memo, useCallback, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

function TagElement({ formContext, rerender = 'none' }) {
  const { control, getValues, setValue } = formContext;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'tags',
  });
  const hanldeAdd = () => {
    append({
      tag: getValues('tagName'),
    });
    setValue('tagName', '');
  };
  const hanldeRemove = useCallback(
    (rowIndex: number) => {
      remove(rowIndex);
    },
    [remove],
  );

  useEffect(() => {
    if(rerender.includes('reset')) {
      remove();
    }
  }, [rerender])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextFieldElement
          name="tagName"
          control={control}
          label="Tag"
          placeholder="Tag"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ButtonPrimary
                  severity="transparent"
                  padding={'4px 0px'}
                  onClick={() => hanldeAdd()}
                >
                  Add
                </ButtonPrimary>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} display={'flex'} flexWrap={'wrap'} gap={'8px 8px'}>
        {fields.map((item: any, index) => {
          return (
            <Chip
              key={index}
              sx={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1.4,
                color: '#D87EB1',
                border: '1px solid rgba(216, 126, 177, 0.2)',
              }}
              label={item.tag}
              variant="outlined"
              deleteIcon={<ICONS.IconXCircle width={20} height={20} />}
              onDelete={() => hanldeRemove(index)}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}

export default memo(TagElement);
