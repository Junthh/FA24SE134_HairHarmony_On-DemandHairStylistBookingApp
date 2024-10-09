import React, { useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Breadscrumb from 'components/Common/Breadscrumb';
import { USER_PATH } from 'configurations/paths/paths';
import { BreadscrumWrap } from 'pages/common/style/BreadscrumbWrap';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import {
  BodyAboutUsWrap1,
  EcoCupidDoStyled,
  GuidingPrinciplesStyled,
  MainConcept,
  OurTeamStyled,
  PastAndFutureStyled,
  TheNameEcoStyled,
} from './styled';
import * as colors from 'constants/colors';
import ImageAboutUs1 from 'assets/pics/aboutus/image-about-us1.svg';
import ImageEcocupidLogoLarge from 'assets/pics/logo/ecocupid-large.png';
import ImageVision from 'assets/pics/icons/vision.svg';
import ImageMission from 'assets/pics/icons/mission.svg';
import ImageFuture from 'assets/pics/icons/future.svg';
import IconUsersThree from 'assets/pics/icons/icon-users-three.svg';
import IconPenNib from 'assets/pics/icons/icon-penNib.svg';
import IconBooxOpenText from 'assets/pics/icons/icon-book-open-text.svg';
import ImageAboutUs2 from 'assets/pics/aboutus/image-about-us2.png';
import BoxOurTeam from './components/BoxOurTeam';
import { ICONS } from 'configurations/icons';
import EcoCommunity from './components/EcoCommunity';
import { theme } from 'theme';
import ImageComponent from 'components/Common/Image/ImageComponent';
import { IMAGES } from 'configurations/images';

export default function AboutUs() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Change title
    document.title = `About Us - EcoCupid`;
  }, []);

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
              label: 'About Us',
              url: '',
            },
          ]}
        />
      </BreadscrumWrap>
      <BodyAboutUsWrap1>
        <Box className="left">
          {!isMobile && (
            <TextHeaderUnderlineStyled color={colors.primary1} fontSize={'60px'}>
              What do we see?
            </TextHeaderUnderlineStyled>
          )}
          <img src={ImageAboutUs1} alt="" />
        </Box>
        <Box className="right">
          {isMobile && (
            <TextHeaderUnderlineStyled color={colors.primary1}>
              What do we see?
            </TextHeaderUnderlineStyled>
          )}
          <Box className="right-item">
            <Typography variant="h4">
              Many eco-projects in{' '}
              <Typography
                variant="h4"
                fontWeight={700}
                component={'span'}
                color={colors.darkBlue900}
              >
                Southeast Asia
              </Typography>{' '}
              can change the world but they couldn’t tell the world about it.
            </Typography>
          </Box>
          <Box className="right-item">
            <Typography variant="h4">
              Environmentalists may be saving the planet, but they’re not always good at selling themselves.
            </Typography>
          </Box>
          <Box className="right-item">
            <Typography variant="h4">
              Without the right guidance, eco-projects from{' '}
              <Typography
                variant="h4"
                fontWeight={700}
                component={'span'}
                color={colors.darkBlue900}
              >
                Southeast Asia
              </Typography>{' '}
              risk losing their context, ambitions, and impact when translated to a wider and more generalised English-speaking audience.
            </Typography>
          </Box>
        </Box>
      </BodyAboutUsWrap1>
      <MainConcept>
        <Box className="left">
          <TextHeaderUnderlineStyled color={colors.primary1} fontSize={!isMobile ? '60px' : ''}>
            Main Concept
          </TextHeaderUnderlineStyled>
          <Box>
            <Typography variant="h4" color={colors.darkBlue600} lineHeight={1.8}>
              Meet EcoCupid – your go-to platform for connecting with eco-projects in Southeast
              Asia. We write and film their green ideas on our social platforms, and train
              environmentalists to spread their love for the environment beyond language and country
              borders.
            </Typography>
            <Box height={40}></Box>
            <Typography variant="h4" color={colors.darkBlue600} lineHeight={1.8}>
              EcoCupid is Southeast Asia’s environmentalist-focused social network platform that
              curates inspirational eco-projects and educational content through multilingual media.
              We are an environmental media project.
            </Typography>
          </Box>
        </Box>
        <Box className="right">
          <img src={ImageEcocupidLogoLarge} alt="" />
        </Box>
      </MainConcept>
      <PastAndFutureStyled>
        <Box className="content">
          {!isMobile ? (
            <TextHeaderUnderlineStyled color={colors.primary1} fontSize={'60px'}>
              Our past & future
            </TextHeaderUnderlineStyled>
          ) : (
            <>
              <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
                Our past &{' '}
              </TextHeaderUnderlineStyled>
              <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
                {' '}
                future
              </TextHeaderUnderlineStyled>
            </>
          )}

          <Box className="content-vision">
            <img src={ImageVision} alt="" />
            <Box className="content-vision_item">
              <Typography variant="h3" fontWeight={500} color={colors.primary1}>
                Vision
              </Typography>
              <Box height={24}></Box>
              <Typography variant="h1" fontSize={42} fontWeight={500} color={colors.darkBlue900}>
                Become Southeast Asia’s leading environmental community through media
              </Typography>
            </Box>
          </Box>
          <Box className="content-mission">
            <img src={ImageMission} alt="" />
            <Box className="content-mission_item">
              <Typography variant="h3" fontWeight={500} color={colors.primary1}>
                Vision
              </Typography>
              <Box height={24}></Box>
              <Typography variant="h1" fontSize={42} fontWeight={500} color={colors.darkBlue900}>
                Build a social platform that connects eco-projects in Southeast Asia through
                multilingual written, video, & graphic media content that educate audiences to
                protect the environment
              </Typography>
            </Box>
          </Box>
          <Box className="content-future">
            <Box className="content-future_item">
              <Typography variant="h3" fontWeight={500} color={colors.primary1}>
                Future
              </Typography>
              <Box height={24}></Box>
              <Typography variant="h1" fontSize={42} fontWeight={500} color={colors.darkBlue900}>
                Build a media agency and create a geodatabase of all the amazing eco-projects and
                leaders in Southeast Asia
              </Typography>
            </Box>
            <img src={ImageFuture} alt="" />
          </Box>
        </Box>
      </PastAndFutureStyled>
      <GuidingPrinciplesStyled>
        {!isMobile ? (
          <TextHeaderUnderlineStyled
            color={colors.primary5}
            background={'#002D23'}
            fontSize={'60px'}
          >
            Our guiding principles
          </TextHeaderUnderlineStyled>
        ) : (
          <>
            <TextHeaderUnderlineStyled
              margin={'0 auto'}
              color={colors.primary5}
              background={'#002D23'}
            >
              Our guiding{' '}
            </TextHeaderUnderlineStyled>
            <TextHeaderUnderlineStyled
              margin={'0 auto'}
              color={colors.primary5}
              background={'#002D23'}
            >
              {' '}
              principles
            </TextHeaderUnderlineStyled>
          </>
        )}
        <Box className="content-wrap">
          <Box className="content">
            <img width={60} height={60} src={IconUsersThree} alt="" />
            <Box className="content-item">
              <Typography variant="h3" fontWeight={700} color={colors.white}>
                Connect
              </Typography>
              <Box height={8}></Box>

              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue50}>
                aspiring and early-stage environmentalists and their projects across Southeast Asia
                together and invite collaborations with philanthropic, consulting, and business
                institutions.
              </Typography>
            </Box>
          </Box>
          <Box className="content">
            <img width={60} height={60} src={IconPenNib} alt="" />
            <Box className="content-item">
              <Typography variant="h3" fontWeight={700} color={colors.white}>
                Create
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue50}>
                the voices of ambitious, impactful, and local Eco-Heroes in Southeast Asia through
                multilingual written, video, and graphic media content.
              </Typography>
            </Box>
          </Box>
          <Box className="content">
            <img width={60} height={60} src={IconBooxOpenText} alt="" />
            <Box className="content-item">
              <Typography variant="h3" fontWeight={700} color={colors.white}>
                Educate
              </Typography>
              <Box height={8}></Box>

              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue50}>
                through educating our audiences across multiple languages and demographics about
                environmental information and solutions that inspire individual action.
              </Typography>
            </Box>
          </Box>
        </Box>
      </GuidingPrinciplesStyled>
      <TheNameEcoStyled>
        <Box className="content-left">
          <img width={"100%"} height={"100%"} src={ImageAboutUs2} alt="" />
        </Box>
        <Box className="content">
          {!isMobile ? (
            <TextHeaderUnderlineStyled color={colors.primary1} fontSize={'60px'}>
              Why the name EcoCupid?
            </TextHeaderUnderlineStyled>
          ) : (
            <Box>
              <TextHeaderUnderlineStyled color={colors.primary1}>
                Why the name{' '}
              </TextHeaderUnderlineStyled>
              <TextHeaderUnderlineStyled color={colors.primary1}>
                {' '}
                EcoCupid?
              </TextHeaderUnderlineStyled>
            </Box>
          )}

          <Typography variant="h2" color={colors.primary1}>
            We had a pen, and we had a burger. On a greasy Burger King® serviette, EcoCupid was
            born. (We are not sponsored by Burger King®)
          </Typography>
          <Typography variant="h2" color={colors.primary1}>
            <span> ‘Eco’</span> because we want to make positive change for the environment
          </Typography>
          <Typography variant="h2" color={colors.primary1}>
            <span> ‘Cupid’</span> because we’re all looking for love and we want a similar platform
            for the environment
          </Typography>
        </Box>
      </TheNameEcoStyled>
      <OurTeamStyled>
        <TextHeaderUnderlineStyled
          color={colors.primary5}
          background={'#002D23'}
          fontSize={!isMobile ? '60px' : ''}
        >
          Our team
        </TextHeaderUnderlineStyled>
        {/* <Typography variant="h4" color={colors.white}>
          We have a journalist, documentary film-maker, programmer, business developer, and a
          designer from different ASEAN countries. Round portraits with names and connect to the
          LinkedIn
        </Typography> */}
        <BoxOurTeam />
      </OurTeamStyled>
      <EcoCupidDoStyled>
        {!isMobile ? (
          <TextHeaderUnderlineStyled color={colors.primary1} fontSize={'60px'}>
            What can EcoCupid do for YOU?
          </TextHeaderUnderlineStyled>
        ) : (
          <Box>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              What can{' '}
            </TextHeaderUnderlineStyled>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              {' '}
              EcoCupid do for
            </TextHeaderUnderlineStyled>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              {' '}
              YOU?
            </TextHeaderUnderlineStyled>
          </Box>
        )}
        <Box height={16}></Box>
        <Box className="content-item">
          {/* <ICONS.IconSparkle /> */}
          <Box className="image-bg" >
            <ImageComponent src={IMAGES.DoForYou1} />
          </Box>
          <Box height={28}></Box>
          <Typography variant="h2" fontWeight={700} color={colors.darkBlue900}>
            Feature articles and films
          </Typography>
          <Box height={8}></Box>
          <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue600}>
            We want to tell your environmental story through professional written and video media. Our professional video team consists of an international award-winning producer. We also have an environmental researcher that understands and cares deeply about science and the environment. So, EcoCupid media will have good production and accurate science. Guaranteed.
          </Typography>
        </Box>
        <Box className="content-item">
          <Box className="image-bg" >
            <ImageComponent src={IMAGES.DoForYou2} />
          </Box>
          {/* <ICONS.IconSmiley /> */}
          <Box height={28}></Box>
          <Typography variant="h2" fontWeight={700} color={colors.darkBlue900}>
            Media upskilling for environmentalists
          </Typography>
          <Box height={8}></Box>
          <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue600}>
            We can share our media skills with young environmental leaders across Southeast Asia. All of us at EcoCupid are leading environmentalists ourselves. We want to give back to society by guiding you there. We’ve all been there once.
          </Typography>
        </Box>
        <Box className="content-item">
          <Box className="image-bg" >
            <ImageComponent src={IMAGES.DoForYou3} />
          </Box>
          {/* <ICONS.IconTree /> */}
          <Box height={28}></Box>
          <Typography variant="h2" fontWeight={700} color={colors.darkBlue900}>
            Connect with environmentalists friends across Southeast Asia
          </Typography>
          <Box height={8}></Box>
          <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue600}>
            Join us and get to know more people flighting for the environment just like you in other countries within Southeast Asia. Our network can help you to reach out to unlikely friends and partners that you can learn from and collaborate someday.
          </Typography>
        </Box>
      </EcoCupidDoStyled>
      <EcoCommunity />
    </Box>
  );
}
