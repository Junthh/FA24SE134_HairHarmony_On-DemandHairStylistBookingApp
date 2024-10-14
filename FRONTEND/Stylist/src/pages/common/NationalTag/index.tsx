import React from 'react'
import { NationalTagStyled } from '../style/TagContent'
import Typography from '@mui/material/Typography'
import * as colors from "constants/colors"
export default function NationalTag(
  {
    label = "Vietnam",
    icon = "VN"
  }
) {
  return (
    <NationalTagStyled className='national-tag'>
      <img width={24} height={24} src={icon} alt="" />
      <Typography variant='label2' fontWeight={500} color={colors.primary1} textTransform={"uppercase"}>{label}</Typography>
    </NationalTagStyled>
  )
}
