import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import * as colors from 'constants/colors';
import PartnerWithUs4 from 'assets/pics/partner-with-us/partner-with-us4.svg';
import ReadMoreReadLess from 'pages/common/ReadMoreReadLess/ReadMoreReadLess';
import { ICONS } from 'configurations/icons';
import { theme } from 'theme';
import styled from '@emotion/styled';
import { ProjectModel } from 'models/ProjectModel';
import { PostTypeEnum } from 'models/Posts.model';
import { useNavigate } from 'react-router';
import { USER_PATH } from 'configurations/paths/paths';

const BoxArticleDocumentStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  '& .content-description': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #2A5D4F',
    borderRadius: '24px',
    overflow: 'hidden',
    height: '100%',

    '& .content-description_img': {
      padding: '2px',
      '&:hover': {
        cursor: 'pointer',
      },
      '& img': {
        width: '100%',
        height: '400px',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
    },
    '&_body': {
      padding: '16px',
      background: colors.primary4,
      width: '100%',
      '& .text': {
        color: colors.darkBlue900,
        lineHeight: 1.8,
        fontSize: 18,
        fontWeight: 400,
        '& span': {
          color: colors.primary1,
          fontWeight: 700,
        },
      },
    },
  },
  '& .content-social': {
    marginTop: 26,
    '&_icon': {
      display: 'flex',
      alignItems: 'center',
      gap: '0px 20px',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'space-between',
      },
    },
  },
});

interface ProjectDocumentProps {
  project: ProjectModel;
  type: PostTypeEnum.Post | PostTypeEnum.Video;
}

export default function ProjectDocument({ project, type }: ProjectDocumentProps) {
  const navigate = useNavigate();
  return (
    <>
      {project ? (
        <BoxArticleDocumentStyled>
          <Box className="content-description">
            <Box
              className="content-description_img"
              onClick={() => {
                project &&
                  navigate(`/${USER_PATH.SEARCH}?country=${project.country}&project=${project.id}`);
              }}
            >
              <img className="image-fit-center" src={project?.imageUrl} alt="" />
            </Box>
            <Box className="content-description_body">
              <Typography variant="label1" color={'#D87EB1'} textTransform={'uppercase'}>
                {project?.qtyArticle + project?.qtyVideo} Articles & documentaries
              </Typography>
              <Box height={16}></Box>
              <Typography
                fontSize={24}
                fontWeight={700}
                lineHeight={'140%'}
                color={colors.darkBlue600}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecorationLine: 'underline',
                  },
                }}
                onClick={() => {
                  project &&
                    navigate(
                      `/${USER_PATH.SEARCH}?country=${project.country}&project=${project.id}`,
                    );
                }}
              >
                {project?.title}
              </Typography>
              <Box height={4}></Box>
              <Typography
                color={colors.darkBlue600}
                fontSize={18}
                lineHeight={'180%'}
                fontWeight={700}
              >
                Description
              </Typography>
              {project?.detail && (
                <ReadMoreReadLess limit={100}>{project?.detail}</ReadMoreReadLess>
              )}
            </Box>
          </Box>
          <Box className="content-social">
            <Typography color={colors.darkBlue500} variant="body1" fontWeight={700}>
              Follow EcoCupid
            </Typography>
            <Box height={10}></Box>
            <Box className="content-social_icon" color={colors.primary1}>
              <Link color={colors.primary1} href="https://www.facebook.com/EcoCupid">
                <ICONS.IconFacebook />
              </Link>
              <Link color={colors.primary1} href="https://www.instagram.com/ecocupid">
                <ICONS.IconInstagram />
              </Link>
              <Link color={colors.primary1} href="https://youtube.com/@ecocupid">
                <ICONS.IconYoutube />
              </Link>
              <Link color={colors.primary1} href="https://www.tiktok.com/@ecocupid">
                <ICONS.IconTiktok />
              </Link>
              <Link color={colors.primary1} href="https://www.linkedin.com/company/86826173">
                <ICONS.IconLinkedIn />
              </Link>
              {/* <Link color={colors.primary1} href="#">
                <ICONS.IconEnvelope />
              </Link> */}
              <Link color={colors.primary1} href="https://twitter.com/EcoCupidASEAN">
                <ICONS.IconTwitter />
              </Link>
            </Box>
          </Box>
        </BoxArticleDocumentStyled>
      ) : (
        ''
      )}
    </>
  );
}
