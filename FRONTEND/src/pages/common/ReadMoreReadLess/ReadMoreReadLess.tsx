import styled from '@emotion/styled';
import { useState } from 'react';
import * as colors from 'constants/colors';
import { Box, Typography } from '@mui/material';
import { ButtonPrimary } from '../style/Button';
export const ReadMoreReadLessStyle = styled(`span`)({
  color: colors.primary,
  cursor: 'pointer',
});
type ReadMoreReadLessProps = {
  children: string | any;
  limit?: number;
  showList?: boolean;
  showReadMoreBtn?: boolean;
};
export default function ReadMoreReadLess({
  children,
  limit = 300,
  showList = false,
  showReadMoreBtn = false,
}: ReadMoreReadLessProps) {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return showList ? (
    isReadMore ? (
      <Box>
        <ol>
          {children?.slice(0, limit).map((item: any, index: number) => {
            if (index === limit - 1) {
              return (
                <li key={index}>
                  <Typography
                    className="text"
                    fontSize={18}
                    fontWeight={700}
                    lineHeight={'180%'}
                    color={colors.b9}
                  >
                    {item?.label?.slice(0, 25) + '...'}{' '}
                    {!showReadMoreBtn ? (
                      <ReadMoreReadLessStyle onClick={toggleReadMore}>
                        {isReadMore ? 'Learn more' : ' Show less'}
                      </ReadMoreReadLessStyle>
                    ) : null}
                  </Typography>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Typography
                    className="text"
                    fontSize={18}
                    fontWeight={700}
                    lineHeight={'180%'}
                    color={colors.b9}
                  >
                    {item.label}
                  </Typography>
                </li>
              );
            }
          })}
        </ol>{' '}
        {showReadMoreBtn ? (
          <>
            <Box height={24}></Box>
            <ButtonPrimary
              padding={'12px 20px'}
              severity="transparent"
              variant="outlined"
              onClick={toggleReadMore}
            >
              {isReadMore ? 'Learn more' : ' Show less'}
            </ButtonPrimary>
          </>
        ) : null}
      </Box>
    ) : (
      <Box>
        <ol>
          {children.map((item: any, index: number) => {
            if (index === children.length - 1) {
              return (
                <li key={index}>
                  <Typography
                    className="text"
                    fontSize={18}
                    fontWeight={700}
                    lineHeight={'180%'}
                    color={colors.b9}
                  >
                    {isReadMore ? item?.label?.slice(0, 25) + '...' : item.label}
                    {!showReadMoreBtn ? (
                      <ReadMoreReadLessStyle onClick={toggleReadMore}>
                        {isReadMore ? 'Learn more' : ' Show less'}
                      </ReadMoreReadLessStyle>
                    ) : null}
                  </Typography>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Typography
                    className="text"
                    fontSize={18}
                    fontWeight={700}
                    lineHeight={'180%'}
                    color={colors.b9}
                  >
                    {item.label}
                  </Typography>
                </li>
              );
            }
          })}
        </ol>
        {showReadMoreBtn ? (
          <>
            <Box height={24}></Box>
            <ButtonPrimary
              padding={'12px 20px'}
              severity="transparent"
              variant="outlined"
              onClick={toggleReadMore}
            >
              {isReadMore ? 'Learn more' : ' Show less'}
            </ButtonPrimary>
          </>
        ) : null}
      </Box>
    )
  ) : (
    <Box>
      <Typography
        className="text"
        fontSize={18}
        fontWeight={700}
        lineHeight={'180%'}
        color={colors.b9}
      >
        {isReadMore && text.length > limit ? text?.slice(0, limit) + '...' : text + ' '}
        {!showReadMoreBtn && text.length > limit ? (
          <ReadMoreReadLessStyle onClick={toggleReadMore}>
            {isReadMore ? 'View more' : ' Show less'}
          </ReadMoreReadLessStyle>
        ) : null}
      </Typography>
      {showReadMoreBtn ? (
        <>
          <Box height={24}></Box>
          {text.length > limit ? (
            <ButtonPrimary
              padding={'12px 20px'}
              severity="transparent"
              variant="outlined"
              onClick={toggleReadMore}
            >
              {isReadMore ? 'View more' : ' Show less'}
            </ButtonPrimary>
          ) : (
            <></>
          )}
        </>
      ) : null}
    </Box>
  );
}
