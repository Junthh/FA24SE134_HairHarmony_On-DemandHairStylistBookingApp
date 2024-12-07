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
  Rating,
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
import { formatDateTime } from 'utils/datetime';
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
  const [feedbacks, setFeedbacks] = useState([]);
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
  const getAllFeedbackByStylist = useCallback(
    ({ stylistId }: any) => {
      feedbackService.list({ stylistId }).then((resultList: any) => {
        setFeedbacks(resultList.data);
      });
    },
    [credentialInfo.Id],
  );
  const getFeedbackByStylist = useCallback(
    ({ size, page, stylistId }: any) => {
      dispatch(setLoading(true));
      feedbackService
        .list({
          pageSize: size,
          pageIndex: page + 1,
          stylistId,
          sortKey: 'CreatedDate',
          sortOrder: 'DESC',
        })
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

  useEffect(() => {
    if (credentialInfo.Id) {
      getAllFeedbackByStylist({ stylistId: credentialInfo.Id });
    }
  }, [credentialInfo.Id]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPaging((prev) => ({
      ...prev,
      page: newPage,
    }));
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPaging((prev) => ({ ...prev, size: parseInt(event.target.value, 10), page: 0 }));
  };

  return (
    <FeedbackStyled>
      {/* <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left">
            <TextFieldElement
              name="keySearch"
              control={control}
              placeholder="Search"
              InputProps={{
                startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
              }}
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
      </FormContainer> */}
      {/* <Box height={40}></Box> */}
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {rows.map((row, index) => (
            <Box className="card-feedback" key={index}>
              <Avatar src={row.booking.customer.avatar} />
              <Box className="content">
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {row.booking.customer.fullName}
                  </Typography>
                  <Rating
                    sx={{
                      margin: '0 auto',
                    }}
                    precision={0.5}
                    value={row.rating}
                    readOnly
                  />
                </Box>
                <Typography variant="body2">{row.description}</Typography>
              </Box>
              <Typography variant="small1" color={colors.grey2}>
                {formatDateTime(row.createdDate)}
              </Typography>
            </Box>
          ))}
          <Box>
            <TablePagination
              component="div"
              count={paging.total}
              page={paging.page}
              rowsPerPage={paging.size}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton
              showLastButton
            />
          </Box>
        </Grid>

        {feedbacks && (
          <Grid item xs={4} display={'flex'} flexDirection={'column'} gap={20}>
            <Box>
              <Box className="card-right_bottom">
                <Typography variant="h3" fontWeight={700}>
                  Đánh giá trung bình
                </Typography>
                <Typography variant="body2" color={colors.grey2}>
                  {feedbacks.length} đánh giá
                </Typography>
                <Divider variant="fullWidth"></Divider>
                <Box height={10}></Box>
                <Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body2" fontWeight={600}>
                      <BoxDot />5 sao
                    </Typography>
                    <Typography variant="body2" color={colors.grey2}>
                      {(feedbacks.filter((feedback) => feedback.rating === 5).length /
                        feedbacks.length) *
                        100}
                      %
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (feedbacks.filter((feedback) => feedback.rating === 5).length /
                        feedbacks.length) *
                      100
                    }
                  />
                </Box>
                <Box height={10}></Box>
                <Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body2" fontWeight={600}>
                      <BoxDot />4 sao
                    </Typography>
                    <Typography variant="body2" color={colors.grey2}>
                      {(feedbacks.filter((feedback) => feedback.rating === 4).length /
                        feedbacks.length) *
                        100}
                      %
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (feedbacks.filter((feedback) => feedback.rating === 4).length /
                        feedbacks.length) *
                      100
                    }
                  />
                </Box>
                <Box height={10}></Box>
                <Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body2" fontWeight={600}>
                      <BoxDot />3 sao
                    </Typography>
                    <Typography variant="body2" color={colors.grey2}>
                      {(feedbacks.filter((feedback) => feedback.rating === 3).length /
                        feedbacks.length) *
                        100}
                      %
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (feedbacks.filter((feedback) => feedback.rating === 3).length /
                        feedbacks.length) *
                      100
                    }
                  />
                </Box>
                <Box height={10}></Box>
                <Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body2" fontWeight={600}>
                      <BoxDot />2 sao
                    </Typography>
                    <Typography variant="body2" color={colors.grey2}>
                      {(feedbacks.filter((feedback) => feedback.rating === 2).length /
                        feedbacks.length) *
                        100}
                      %
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (feedbacks.filter((feedback) => feedback.rating === 2).length /
                        feedbacks.length) *
                      100
                    }
                  />
                </Box>
                <Box height={10}></Box>
                <Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body2" fontWeight={600}>
                      <BoxDot />1 sao
                    </Typography>
                    <Typography variant="body2" color={colors.grey2}>
                      {(feedbacks.filter((feedback) => feedback.rating === 1).length /
                        feedbacks.length) *
                        100}
                      %
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (feedbacks.filter((feedback) => feedback.rating === 1).length /
                        feedbacks.length) *
                      100
                    }
                  />
                </Box>
                <Box height={10}></Box>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </FeedbackStyled>
  );
}
