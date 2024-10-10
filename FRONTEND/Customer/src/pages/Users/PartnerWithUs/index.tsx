import React, { useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Breadscrumb from 'components/Common/Breadscrumb';
import { USER_PATH } from 'configurations/paths/paths';
import { BreadscrumWrap } from 'pages/common/style/BreadscrumbWrap';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import * as colors from 'constants/colors';
import { ContainerWrap } from './styles';
import PartnerWithUs1 from 'assets/pics/partner-with-us/partner-with-us1.svg';
import PartnerWithUs2 from 'assets/pics/partner-with-us/partner-with-us2.svg';
import PartnerWithUs3 from 'assets/pics/partner-with-us/partner-with-us3.svg';
import ReadMoreReadLess from 'pages/common/ReadMoreReadLess/ReadMoreReadLess';
import { ButtonPrimary } from 'pages/common/style/Button';
import { ICONS } from 'configurations/icons';
import { theme } from 'theme';
import { useNavigate } from 'react-router-dom';

export default function PartnerWithUs() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate()
  useEffect(() => {
    // Change title
    document.title = 'Partner With Us - EcoCupid';
  }, []);
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <Box>
      <BreadscrumWrap>
        <Breadscrumb
          options={[
            {
              label: 'Home',
              url: USER_PATH.HOME,
            },
            {
              label: 'Partner with us',
              url: '',
            },
          ]}
        />
      </BreadscrumWrap>
      <TextHeaderUnderlineStyled
        margin={'0 auto'}
        color={colors.primary1}
        fontSize={!isMobile ? '60px' : ''}
      >
        Partner with us
      </TextHeaderUnderlineStyled>
      <ContainerWrap>
        <Box className="content-item">
          <Box className="content-item_left">
            <Typography variant="h1" fontWeight={500} color={colors.primary1}>
              I want to share my project
            </Typography>
            <Box height={24}></Box>
            <Typography variant="h3" fontWeight={700} color={colors.darkBlue600}>
              EcoCupid - Find your match today!
            </Typography>
            <Box height={8}></Box>
            <ReadMoreReadLess>
              Be part of EcoCupid’s Southeast Asian environmental community. Get ready to connect with potential allies, friends, partners, and more. Tell us who you are and stand a chance to be featured with us. Everyone has a story that deserves to be told, especially if you’ve just started and need all the help you can get. EcoCupid wants you to be heard.
            </ReadMoreReadLess>
            <Box height={10}></Box>
            <ButtonPrimary onClick={() => { openInNewTab("https://forms.gle/9wdWaL6p7hbRWHaa6") }} severity="primary" padding={'10px 28px'} borderradius={40}>
              Start &nbsp;
              <ICONS.IconArrowRight />
            </ButtonPrimary>
          </Box>
          <Box className="content-item_right">
            <img style={{ width: "auto" }} src={PartnerWithUs1} alt="" />
          </Box>
        </Box>
        <Box className="content-item-reverse">
          <Box className="content-item_left">
            <Typography variant="h1" fontWeight={500} color={colors.primary1}>
              I want to collaborate
            </Typography>
            <Box height={24}></Box>
            <Typography variant="h3" fontWeight={700} color={colors.darkBlue600}>
              EcoCupid - We heard you! Let’s talk.
            </Typography>
            <Box height={8}></Box>
            <ReadMoreReadLess>
              Do we share the same eco-dream? Do you like our work? Let’s join hands and make Southeast Asia’s environment better. We offer media content, media skills training, and media strategy and proposal services, all custom-tailored for environmental projects. Why? Because we understand and care about the environment. EcoCupid wants you to succeed.
            </ReadMoreReadLess>
            <Box height={10}></Box>
            <ButtonPrimary onClick={() => { openInNewTab("https://forms.gle/9wdWaL6p7hbRWHaa6") }} severity="primary" padding={'10px 28px'} borderradius={40}>
              Start &nbsp;
              <ICONS.IconArrowRight />
            </ButtonPrimary>
          </Box>
          <Box className="content-item_right">
            <img style={{ width: "auto" }} src={PartnerWithUs2} alt="" />
          </Box>
        </Box>

        <Box className="content-item">
          <Box className="content-item_left">
            <Typography variant="h1" fontWeight={500} color={colors.primary1}>
              I want to fund a CSR project
            </Typography>
            <Box height={24}></Box>
            <Typography variant="h3" fontWeight={700} color={colors.darkBlue600}>
              EcoCupid - We know who can.
            </Typography>
            <Box height={8}></Box>
            <ReadMoreReadLess>
              Take advantage of EcoCupid’s ever-growing environmental community. We know amazing, sustainable, and unique eco-projects in every country across Southeast Asia. Join us and get ready to connect with real people on the ground who need support. EcoCupid makes it easier for you to make a greener impact for our community. Find your right eco-match today!
            </ReadMoreReadLess>
            <Box height={10}></Box>
            <ButtonPrimary onClick={() => { openInNewTab("https://forms.gle/9wdWaL6p7hbRWHaa6") }} severity="primary" padding={'10px 28px'} borderradius={40}>
              Start &nbsp;
              <ICONS.IconArrowRight />
            </ButtonPrimary>
          </Box>
          <Box className="content-item_right">
            <img style={{ width: "auto" }} src={PartnerWithUs3} alt="" />
          </Box>
        </Box>
      </ContainerWrap>
    </Box>
  );
}
