import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  TablePagination,
  Divider,
  LinearProgress,
} from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer } from 'components/Form/FormContainer';
import { BoxHeaderSearch } from '../Styles/common';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import { ButtonPrimary } from 'pages/common/style/Button';
import * as colors from 'constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectCredentialInfo, setLoading } from 'redux/Reducer';
import { feedbackService } from 'services/feedback.service';
const FeedbackStyled = styled(Box)({
  padding: '20px 40px',
  '& .card-feedback': {
    border: `1px solid ${colors.grey2}`,
    padding: 20,
    display: 'flex',
    gap: 10,
    '& .content': {
      width: '65%',
    },
  },
  '& .card-right_header': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    '&-top': {
      display: 'flex',
      alignItems: 'center',
      gap: 15,
      padding: '20px 20px',
      background: '#2D3748',
      color: 'white',
      width: '100%',
      '&_content': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  },
  '& .card-right_bottom': {
    marginTop: 40,
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    padding: 20,
    borderRadius: '15px',
  },
});
//
const BoxDot = styled(Box)({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#56f09f',
  marginRight: 8,
});
export default function Feedback() {
  const dispatch = useDispatch();
  const [paging, setPaging] = useState({
    size: 10,
    page: 0,
    total: 0,
  });
  const credentialInfo = useSelector(selectCredentialInfo);
  const [rows, setRows] = useState([]);
  const schema = Yup.object().shape<any>({});
  const formSearch = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = formSearch;
  const getFeedbackByStylist = useCallback(
    ({ size, page, stylistId }: any) => {
      dispatch(setLoading(true));
      feedbackService
        .list({ pageSize: size, pageIndex: page + 1, stylistId })
        .then((resultList: any) => {
          setPaging((prev) => ({
            ...prev,
            total: resultList.paging.total,
          }));
          setRows(resultList.data);
          dispatch(setLoading(false));
        });
    },
    [paging.size, paging.page, credentialInfo.Id],
  );
  useEffect(() => {
    if (credentialInfo.Id) {
      getFeedbackByStylist({
        size: paging.size,
        page: paging.page,
        stylistId: credentialInfo.Id,
      });
    }
  }, [getFeedbackByStylist]);
  return (
    <FeedbackStyled>
      <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left">
            <TextFieldElement
              name="keySearch"
              control={control}
              placeholder="Search"
              InputProps={{
                startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
              }}
              //   onKeyUp={handleKeyup}
            />
            <ButtonPrimary
              severity="primary"
              padding={'7px 14px'}
              //   onClick={() => navigate(`${STATE.CREATE}`)}
            >
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
            </ButtonPrimary>
            <Box width={'50%'}></Box>
          </Box>
          <Box className="search-right"></Box>
        </BoxHeaderSearch>
      </FormContainer>
      <Box height={40}></Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box className="card-feedback">
            <Avatar></Avatar>
            <Box className="content">
              <Typography variant="h4" fontWeight={700}>
                Tom Cruise
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, itaque unde ea quia
                voluptate omnis ex! Illum reiciendis, illo velit, tempore debitis explicabo iusto,
                nisi laudantium accusamus ad delectus minus.
              </Typography>
            </Box>
            <Typography variant="small1" color={colors.grey2}>
              May 26, 2023
            </Typography>
            <Box margin={'auto'}>
              <ButtonPrimary severity="cancel" padding={'10px 20px'}>
                Chi tiết
              </ButtonPrimary>
            </Box>
          </Box>
          <Box className="card-feedback">
            <Avatar></Avatar>
            <Box className="content">
              <Typography variant="h4" fontWeight={700}>
                Tom Cruise
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, itaque unde ea quia
                voluptate omnis ex! Illum reiciendis, illo velit, tempore debitis explicabo iusto,
                nisi laudantium accusamus ad delectus minus.
              </Typography>
            </Box>
            <Typography variant="small1" color={colors.grey2}>
              May 26, 2023
            </Typography>
            <Box margin={'auto'}>
              <ButtonPrimary severity="cancel" padding={'10px 20px'}>
                Chi tiết
              </ButtonPrimary>
            </Box>
          </Box>
          <Box className="card-feedback">
            <Avatar></Avatar>
            <Box className="content">
              <Typography variant="h4" fontWeight={700}>
                Tom Cruise
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, itaque unde ea quia
                voluptate omnis ex! Illum reiciendis, illo velit, tempore debitis explicabo iusto,
                nisi laudantium accusamus ad delectus minus.
              </Typography>
            </Box>
            <Typography variant="small1" color={colors.grey2}>
              May 26, 2023
            </Typography>
            <Box margin={'auto'}>
              <ButtonPrimary severity="cancel" padding={'10px 20px'}>
                Chi tiết
              </ButtonPrimary>
            </Box>
          </Box>
          <Box className="card-feedback">
            <Avatar></Avatar>
            <Box className="content">
              <Typography variant="h4" fontWeight={700}>
                Tom Cruise
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, itaque unde ea quia
                voluptate omnis ex! Illum reiciendis, illo velit, tempore debitis explicabo iusto,
                nisi laudantium accusamus ad delectus minus.
              </Typography>
            </Box>
            <Typography variant="small1" color={colors.grey2}>
              May 26, 2023
            </Typography>
            <Box margin={'auto'}>
              <ButtonPrimary severity="cancel" padding={'10px 20px'}>
                Chi tiết
              </ButtonPrimary>
            </Box>
          </Box>
          <Box className="card-feedback">
            <Avatar></Avatar>
            <Box className="content">
              <Typography variant="h4" fontWeight={700}>
                Tom Cruise
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, itaque unde ea quia
                voluptate omnis ex! Illum reiciendis, illo velit, tempore debitis explicabo iusto,
                nisi laudantium accusamus ad delectus minus.
              </Typography>
            </Box>
            <Typography variant="small1" color={colors.grey2}>
              May 26, 2023
            </Typography>
            <Box margin={'auto'}>
              <ButtonPrimary severity="cancel" padding={'10px 20px'}>
                Chi tiết
              </ButtonPrimary>
            </Box>
          </Box>
          <Box>
            {' '}
            <TablePagination
              component="div"
              count={100}
              page={1}
              onPageChange={() => {}}
              rowsPerPage={10}
              onRowsPerPageChange={() => {}}
            />
          </Box>
        </Grid>

        <Grid item xs={4} display={'flex'} flexDirection={'column'} gap={20}>
          <Box>
            <Box className="card-right_header">
              <Box className="card-right_header-top">
                <Box className="card-right_header-top_content">
                  <Typography variant="label1">Average Time</Typography>
                  <Typography variant="body1">5.32%</Typography>
                </Box>
                <Divider
                  sx={{ borderColor: colors.white, height: 50 }}
                  variant="fullWidth"
                  orientation="vertical"
                ></Divider>
                <Box className="card-right_header-top_content">
                  <Typography variant="label1">Completion Rate</Typography>
                  <Typography variant="body1">84.32%</Typography>
                </Box>
                <Divider
                  sx={{ borderColor: colors.white, height: 50 }}
                  variant="fullWidth"
                  orientation="vertical"
                ></Divider>
                <Box className="card-right_header-top_content">
                  <Typography variant="label1">Average Time</Typography>
                  <Typography variant="body1">5.32%</Typography>
                </Box>
              </Box>
              <Box height={25}></Box>
              <Typography variant="h1" fontWeight={700}>
                94%
                <span style={{ fontWeight: 400, fontSize: 24 }}> Tổng đánh giá</span>
              </Typography>
              <Box height={25}></Box>
            </Box>
            <Box className="card-right_bottom">
              <Typography variant="h3" fontWeight={700}>
                {' '}
                Average Rating
              </Typography>
              <Typography variant="body2" color={colors.grey2}>
                40 answers
              </Typography>
              <Divider variant="fullWidth"></Divider>
              <Box height={10}></Box>
              <Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography variant="body2" fontWeight={600}>
                    <BoxDot />
                    Bad
                  </Typography>
                  <Typography variant="body2" color={colors.grey2}>
                    40%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={40} />
              </Box>
              <Box height={10}></Box>
              <Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography variant="body2" fontWeight={600}>
                    <BoxDot />
                    Bad
                  </Typography>
                  <Typography variant="body2" color={colors.grey2}>
                    40%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={40} />
              </Box>
              <Box height={10}></Box>
              <Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography variant="body2" fontWeight={600}>
                    <BoxDot />
                    Bad
                  </Typography>
                  <Typography variant="body2" color={colors.grey2}>
                    40%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={40} />
              </Box>
              <Box height={10}></Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FeedbackStyled>
  );
}
