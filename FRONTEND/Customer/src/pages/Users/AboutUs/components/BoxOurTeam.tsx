import React from 'react';
import ImageOurTeam1 from 'assets/pics/aboutus/image-our-team1.png';
import ImageOurTeam2 from 'assets/pics/aboutus/image-our-team2.png';
import ImageOurTeam3 from 'assets/pics/aboutus/image-our-team3.png';
import ImageOurTeam4 from 'assets/pics/aboutus/image-our-team4.png';
import ImageOurTeam5 from 'assets/pics/aboutus/image-our-team5.png';
import ImageOurTeam6 from 'assets/pics/aboutus/image-our-team6.png';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import { ICONS } from 'configurations/icons';
import * as colors from 'constants/colors';
import ReadMoreReadLess from 'pages/common/ReadMoreReadLess/ReadMoreReadLess';
import { theme } from 'theme';
export const BoxOurTeamStyled = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '16px 0px',
  position: 'relative',
  padding: '32px',
  '& .text': {
    color: colors.darkBlue100,
    '& span': {
      color: colors.white,
    },
  },
  '& a': {
    color: colors.primary,
  },
  '& .icon-linkedin': {
    position: 'absolute',
    right: '60px',
    top: '35px',
    [theme.breakpoints.down('md')]: {
      right: '35px',
      top: '35px',
    },
  },
  '& li': {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: "'\u2022'",
      color: colors.darkBlue100,
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
    },
  },
});
export default function BoxOurTeam() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const OurTeamData = [
    {
      image: ImageOurTeam1,
      linkedIn: 'https://www.linkedin.com/in/bryanyongboou',
      jobTitle: 'Editor in chief and videographer',
      fullname: 'Bryan Yong - Malaysia',
      description:
        "Bryan is environmental journalist and researcher with a background in oceanography and experience volunteering with youth environmental NGOs in Malaysia, he brings curiosity and enthusiasm to discover Southeast Asia's environmental movement through his stories. Bryan is an avid traveller and loves local food the most.",
    },
    {
      image: ImageOurTeam2,
      linkedIn: 'https://www.linkedin.com/in/wewemin',
      jobTitle: 'Content Marketing Manager and Video Producer',
      fullname: 'Weeraya Vichayaprasertkul (Min) - Thailand',
      description:
        'Within 4 years since she’s started her career, Min had won global awards for her documentary work. She is currently a documentary film mentor for EJN grantees at Internews. Min also works on media campaigns with Siriraj Hospital, the oldest hospital in Thailand, to push for health policy movements. She was a producer, creative, and social media admin of the Thailand Education Partnership Facebook Page that drives the education movement in Thailand. She believes that communicating environmental stories through fun and love is a powerful tool that drives the environmental movement. She is a cat and food lover.',
    },
    {
      image: ImageOurTeam3,
      linkedIn: 'https://www.linkedin.com/in/pranavkrishnaprasad',
      jobTitle: 'Business Development',
      fullname: 'Pranav Krishna Prasad- Singapore',
      // description: [{
      //   label: "Entrepreneur | Student | Environmentalist"
      // },
      // {
      //   label: "Founder & CEO of ShareRight"
      // },
      // { label: "Chief Growth Officer of Flint" }
      // ],
      // isShowList: true
      description:
        'Pranav is a multi talented entrepreneur and environmentalist. He is the founder and CEO of ShareRight and the Chief Growth Officer of Flint.',
    },
    {
      image: ImageOurTeam4,
      linkedIn: 'https://www.linkedin.com/in/nguyen-thanh-huy-huynh',
      jobTitle: 'Web Developer & Storyteller',
      fullname: 'huy',
      description:
        'Huy always keeps moving around, he is cycling all around South East Asia to search and feature hidden environmental projects. For 6 years, he has been acting as the founder and co-founder of 5 social projects and participating in many others. His 7 years of experience in programming also allows him to support EcoCupid as the Web Developer. During his endless journeys, he is a vagabond artist, a metal vocalist, a curious learner and a crazy hiker.',
    },
    // {
    //   image: ImageOurTeam5,
    //   linkedIn: "",
    //   jobTitle: "Art director",
    //   fullname: "Thannathon Nameephol (Taotoei)",
    //   description: "Taotoei is a medical Illustration student at Medical Illustration, Faculty of Medicine, Khon Kaen University, Thailand.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate veniam impedit illum sint quibusdam, eum nulla facilis. Illum nam sapiente magnam dignissimos autem sunt vero totam sed quam facilis! Laudantium!"
    // },
    {
      image: ImageOurTeam6,
      linkedIn: '',
      jobTitle: '',
      fullname: 'Jim - Cat Environmental Officer (CEO)',
      description:
        'Born in 2020, Thailand. Jim has always attended every EcoCupid meeting. If there is a typo on the EcoCupid website, blame it on her.',
    },
  ];
  return (
    <Grid container spacing={2}>
      {OurTeamData.map((item: any, index) => {
        return (
          <Grid item xs={!isMobile ? 4 : 12} key={index}>
            <BoxOurTeamStyled>
              <img width={320} height={320} src={item.image} alt="" />
              <a href={item.linkedIn}>
                <ICONS.IconLinkedIn className="icon-linkedin" />
              </a>
              <Box height={16}></Box>
              <Typography
                color={colors.primary}
                variant="label1"
                fontWeight={500}
                textTransform={'uppercase'}
              >
                {item.jobTitle}
              </Typography>
              <Typography color={colors.white} variant="h3" fontWeight={700}>
                {item.fullname}
              </Typography>
              {item?.isShowList ? (
                <ReadMoreReadLess limit={4} showList children={item.description} />
              ) : (
                <ReadMoreReadLess limit={150}>{item.description}</ReadMoreReadLess>
              )}
            </BoxOurTeamStyled>
          </Grid>
        );
      })}
    </Grid>
  );
}
