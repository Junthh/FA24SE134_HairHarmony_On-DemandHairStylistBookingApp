import React, { useEffect } from 'react';
import { AccordionDetails, AccordionSummary, Box, Typography, useMediaQuery } from '@mui/material';
import Breadscrumb from 'components/Common/Breadscrumb';
import { USER_PATH } from 'configurations/paths/paths';
import { BreadscrumWrap } from 'pages/common/style/BreadscrumbWrap';
import {
  AccordionStyled,
  BoxVolunteerstyled,
  ContainerFooter,
  ContainerVacanPosition,
} from './styles';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import * as colors from 'constants/colors';
import { ICONS } from 'configurations/icons';
import { ButtonPrimary } from 'pages/common/style/Button';
import PartnerWithUs1 from 'assets/pics/partner-with-us/partner-with-us1.svg';
import { theme } from 'theme';
export default function Volunteers() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Change title
    document.title = `Volunteers - EcoCupid`;
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
              label: 'Volunteers',
              url: '',
            },
          ]}
        />
      </BreadscrumWrap>
      <BoxVolunteerstyled>
        <Box className="card-left">
          {!isMobile ? (
            <TextHeaderUnderlineStyled color={colors.primary1} fontSize={'60px'}>
              Calling for Volunteers!
            </TextHeaderUnderlineStyled>
          ) : (
            <Box>
              <TextHeaderUnderlineStyled color={colors.primary1}>
                Calling for
              </TextHeaderUnderlineStyled>
              <TextHeaderUnderlineStyled color={colors.primary1}>
                Volunteers!
              </TextHeaderUnderlineStyled>
            </Box>
          )}

          <Typography variant="body2" fontWeight={700} color={colors.darkBlue600} lineHeight={1.8}>
            EcoCupid is growing. We need volunteers to create a greener future, together. Join us now!
          </Typography>
          <Typography variant="h2" fontWeight={700} color={colors.darkBlue900}>
            We want your help!
          </Typography>
          <Box className="content">
            <Typography variant="h4" color={colors.darkBlue700}>
              Are you a person who wants to see a better environment for Southeast Asia? Do you believe in the power of environmental storytelling for creating social change? Do you think that inspirational and educational content should be fun?
            </Typography>
            <Typography variant="h4" color={colors.darkBlue700}>
              EcoCupid is looking for volunteers who can offer at least 5 hours a week for at least 3 months. Although we offer volunteer positions, we also consider longer-term positions based on your interests and commitment. Join us and make friends from countries all over Southeast Asia!
            </Typography>
            <Typography variant="h4" color={colors.darkBlue700}>
              Sign up now to join our next season of volunteers!
            </Typography>
          </Box>
        </Box>
        <Box className="card-right">
          <Typography variant="h2" color={colors.white} fontWeight={700} textAlign={'center'}>
            Volunteer Benefits
          </Typography>
          <Box className="content-item">
            <Box width={30} height={40}>
              <ICONS.IconCertificate />
            </Box>
            <Typography variant="body2" color={colors.white} fontWeight={700} lineHeight={1.8}>
              Certificate from YSEALI – U.S. Mission to ASEAN, the U.S. government’s signature program to strengthen leadership development and networking in Southeast Asia.
            </Typography>
          </Box>
          {/* <Box className="content-item">
            <Box width={30} height={40}>
              <ICONS.IconStar width={30} height={30} />
            </Box>
            <Typography variant="body2" color={colors.white} fontWeight={700} lineHeight={1.8}>
              Souvenir from EcoCupid.
            </Typography>
          </Box> */}
          <Box className="content-item">
            <Box width={30} height={40}>
              <ICONS.IconGlobeHemisphereWest />
            </Box>
            <Typography variant="body2" color={colors.white} fontWeight={700} lineHeight={1.8}>
              Be part of a solution to create a greener future for Southeast Asia..
            </Typography>
          </Box>
          <Box className="content-item">
            <Box width={30} height={40}>
              <ICONS.IconUsers />
            </Box>
            <Typography variant="body2" color={colors.white} fontWeight={700} lineHeight={1.8}>
              Connect and work with various environmental organisations, such as NGOs, governments, private sector, and academia.
            </Typography>
          </Box>
          <Box className="content-item">
            <Box width={30} height={40}>
              <ICONS.IconSmiley />
            </Box>
            <Typography variant="body2" color={colors.white} fontWeight={700} lineHeight={1.8}>
              Have friends from countries all over Southeast Asia. Be nice and they may host you when you travel in their countries.
            </Typography>
          </Box>
          <Box className="content-item">
            <Box width={30} height={40}>
              <ICONS.IconChatCircle />
            </Box>
            <Typography variant="body2" color={colors.white} fontWeight={700} lineHeight={1.8}>
              Practice and improve your English and creative media skills.
            </Typography>
          </Box>
        </Box>
      </BoxVolunteerstyled>
      <ContainerVacanPosition>
        <Typography variant="h4" fontWeight={700} color={colors.darkBlue400} pl={1}>
          Vacant Positions
        </Typography>
        <Box height={24}></Box>
        <AccordionStyled defaultExpanded={true}>
          <AccordionSummary expandIcon={<ICONS.IconCaretDown />}>
            <Box className="header-accordion">
              <Typography variant="h2" fontWeight={700} color={colors.primary1}>
                Content Creator
              </Typography>
              <ButtonPrimary onClick={() => openInNewTab("https://forms.gle/SmmqXURzo8YzJuu48")} severity="primary" padding={'10px 28px'} borderradius={40}>
                SIGN UP NOW <ICONS.IconArrowRight />
              </ButtonPrimary>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                You will:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                Create written, short-form, or graphic content in English that promotes environmental awareness and connects audiences across Southeast Asia with eco-projects that deserve attention.
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We need you to:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                🤝 Raise awareness on environmental issues and news throughout Southeast Asia <br />
                🤝 Break down and rewrite difficult-to-understand educational content into creative content <br />
                🤝 Produce at least 5 pieces of media content designed and developed for EcoCupid social media
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We want a Content Creator who:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                💚 Creative and a bit crazy, or super crazy!<br />
                💚 Excited to work on impromptu projects that respond to current events and trending topics.<br />
                💚 English good enough to speak and write to audiences across Southeast Asia.<br />
                💚 Willing to learn and incorporate feedback.<br />
                <br />
                The ideal candidate does not require an environmental or media background, but must be eager to communicate tedious and complicated information about environmental issues through creative and attention-grabbing methods. Experience in creating written, video, and graphic content is encouraged, although this is not a requirement. To apply, please complete our volunteer application survey, submit your CV and at least one example of your previous work.
              </Typography>
            </Box>
          </AccordionDetails>
        </AccordionStyled>
        <Box height={24}></Box>
        <AccordionStyled>
          <AccordionSummary expandIcon={<ICONS.IconCaretDown />}>
            <Box className="header-accordion">
              <Typography variant="h2" fontWeight={700} color={colors.primary1}>
                Eco-Heroes Scout
              </Typography>
              <ButtonPrimary onClick={() => openInNewTab("https://forms.gle/SmmqXURzo8YzJuu48")} severity="primary" padding={'10px 28px'} borderradius={40}>
                SIGN UP NOW <ICONS.IconArrowRight />
              </ButtonPrimary>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                You will:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                Uncover and document eco-projects in your native country or in Southeast Asia and coordinate interviews with them.
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We need you to:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                🤝Scout, contact, and invite eco-projects to get featured on EcoCupid<br />
                🤝Be point-of-contact (and occasionally interviewer) for eco-projects with EcoCupid’s media team<br />
                🤝Connect at least 10 eco-projects across Southeast Asia with EcoCupid<br />
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We want an Eco-Heroes Scout who:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                💚Believes that voices for the environment must be heard.<br />
                💚Enjoys meeting and connecting with new people that do great things.<br />
                💚Excels at managing people and making the first move.<br />
                💚Willing to learn and incorporate feedback.<br />
                <br />
                The ideal candidate will have experience or connections in their local environmental community. Experience in interviewing and transcribing is recommended but not a requirement. Confidence in your own language is more important than your mastery in English. To apply, please complete our volunteer application survey and submit your CV. Any relevant examples of your previous work is welcome.
              </Typography>
            </Box>
          </AccordionDetails>
        </AccordionStyled>
        <Box height={24}></Box>
        <AccordionStyled>
          <AccordionSummary expandIcon={<ICONS.IconCaretDown />}>
            <Box className="header-accordion">
              <Typography variant="h2" fontWeight={700} color={colors.primary1}>
                Eco-Heroes Storyteller
              </Typography>
              <ButtonPrimary onClick={() => openInNewTab("https://forms.gle/SmmqXURzo8YzJuu48")} severity="primary" padding={'10px 28px'} borderradius={40}>
                SIGN UP NOW <ICONS.IconArrowRight />
              </ButtonPrimary>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                You will:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                Conduct interviews with eco-projects and write feature articles about them to be featured on EcoCupid’s platforms.<br />
                Eco-Heroes is EcoCupid’s flagship ASEAN project feature series. EcoCupid travels across Southeast Asia in search of potential environmental leaders and their projects to be shared to the world in their own element and strengths.
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We need you to:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                🤝Conduct interviews in either in the interviewees’ language or in English<br />
                🤝Research and fact-check on environmental issues to write your story<br />
                🤝Write at least 3 feature articles for eco-projects<br />
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We want an Eco-Heroes Storyteller who:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                💚Big nerd on environmental issues.<br />
                💚Loves to tell stories about people and the environment.<br />
                💚English good enough to speak and write to audiences across Southeast Asia.<br />
                💚Willing to work on tighter schedules.<br />
                💚Willing to learn and incorporate feedback.<br />
                <br />
                The ideal candidate will have experience in conducting interviews, developing storylines, and creating written content in English, although this is not a requirement. To apply, please complete our volunteer application survey, submit your CV and at least one example of your previous work.
              </Typography>
            </Box>
          </AccordionDetails>
        </AccordionStyled>
        <Box height={24}></Box>
        <AccordionStyled>
          <AccordionSummary expandIcon={<ICONS.IconCaretDown />}>
            <Box className="header-accordion">
              <Typography variant="h2" fontWeight={700} color={colors.primary1}>
                Graphic Designer
              </Typography>
              <ButtonPrimary onClick={() => openInNewTab("https://forms.gle/SmmqXURzo8YzJuu48")} severity="primary" padding={'10px 28px'} borderradius={40}>
                SIGN UP NOW <ICONS.IconArrowRight />
              </ButtonPrimary>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                You will:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                Design graphics content to be featured on EcoCupid’s various social media platforms.
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We need you to:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                🤝Create and maintain a consistent visual identity across all platforms and content<br />
                🤝Adapt and modify existing designs to fit specific campaigns<br />
                🤝Express your creative identity that inspires audiences to connect with the environmental community in Southeast Asia<br />
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We want a Graphics Designer who:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                💚Able to use Canva and/or other design tools<br />
                💚Creative and a bit crazy, or super crazy!<br />
                💚Excited to work on impromptu projects that respond to current events and trending topics.<br />
                💚Willing to learn and incorporate feedback.<br />
                <br />
                The ideal candidate will have experience in designing graphics for social media platforms that demonstrates creativity, skill, and attention to detail. To apply, please complete our volunteer application survey, submit your CV and a link to your portfolio.
              </Typography>
            </Box>
          </AccordionDetails>
        </AccordionStyled>
        <Box height={24}></Box>
        <AccordionStyled>
          <AccordionSummary expandIcon={<ICONS.IconCaretDown />}>
            <Box className="header-accordion">
              <Typography variant="h2" fontWeight={700} color={colors.primary1}>
                Assistant Editor
              </Typography>
              <ButtonPrimary onClick={() => openInNewTab("https://forms.gle/SmmqXURzo8YzJuu48")} severity="primary" padding={'10px 28px'} borderradius={40}>
                SIGN UP NOW <ICONS.IconArrowRight />
              </ButtonPrimary>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                You will:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                Assist EcoCupid’s editing team in creating and editing written content for various platforms, including articles, blog posts, and social media captions.
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We need you to:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                🤝Proofread and edit content to ensure accuracy and consistency<br />
                🤝Instil a fun identity into EcoCupid’s content<br />
                🤝Manage and organise content submissions and deadlines<br />
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We want an Assistant Editor who:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                💚Excellent written and verbal communication skills in English.  <br />
                💚Detail-oriented, organised, and able to manage multiple projects and deadlines.  <br />
                💚Proven experience in writing, editing, or journalism.  <br />
                💚Excited to work on impromptu projects that respond to current events and trending topics.  <br />
                <br />
                The ideal candidate will have experience in editing and proofreading, as well as a keen eye for detail and accuracy. To apply, please complete our volunteer application survey and submit your CV and at least one example of your previous work.
              </Typography>
            </Box>
          </AccordionDetails>
        </AccordionStyled>
        <Box height={24}></Box>
        <AccordionStyled>
          <AccordionSummary expandIcon={<ICONS.IconCaretDown />}>
            <Box className="header-accordion">
              <Typography variant="h2" fontWeight={700} color={colors.primary1}>
                Web Admin
              </Typography>
              <ButtonPrimary onClick={() => openInNewTab("https://forms.gle/SmmqXURzo8YzJuu48")} severity="primary" padding={'10px 28px'} borderradius={40}>
                SIGN UP NOW <ICONS.IconArrowRight />
              </ButtonPrimary>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                You will:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                Assist EcoCupid in managing and maintaining EcoCupid’s website.
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We need you to:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                🤝Upload content on EcoCupid’s website based on content schedules.<br />
                🤝Ensure website security and backup data regularly.<br />
                🤝Monitor website traffic and analysis, and make recommendations for improvements.<br />
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We want a Web Admin who:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                💚English good enough to speak and write. <br />
                💚Detail-oriented, organised, and able to manage multiple projects and deadlines. <br />
                💚Basic understanding of blogging and website management.. <br />
                💚Excited to work on impromptu projects that respond to current events and trending topics. <br />
                <br />
                The ideal candidate will have experience in website administration and development, as well as strong technical skills and an ability to problem-solve. To apply, please complete our volunteer application survey and submit your CV. Proficiency in website content management systems, web programming languages is a plus but not required.
              </Typography>
            </Box>
          </AccordionDetails>
        </AccordionStyled>
        <Box height={24}></Box>
        <AccordionStyled>
          <AccordionSummary expandIcon={<ICONS.IconCaretDown />}>
            <Box className="header-accordion">
              <Typography variant="h2" fontWeight={700} color={colors.primary1}>
                Assistant Social Media Admin
              </Typography>
              <ButtonPrimary onClick={() => openInNewTab("https://forms.gle/SmmqXURzo8YzJuu48")} severity="primary" padding={'10px 28px'} borderradius={40}>
                SIGN UP NOW <ICONS.IconArrowRight />
              </ButtonPrimary>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                You will:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                Assist EcoCupid in managing EcoCupid’s social media. Write creative and cool captions for EcoCupid media content. Assist in strategically developing EcoCupid’s social media campaigns to improve social media engagements.
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We need you to:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                🤝Write captions for content on EcoCupid’s social media pages based on content schedules.<br />
                🤝Design and assist in executing social media engagement campaigns to improve EcoCupid’s outreach.<br />
                🤝Monitor social media traffic and analysis, and make recommendations for improvements.<br />
              </Typography>
            </Box>
            <Box className="accordion-content_item">
              <Typography variant="h4" color={colors.darkBlue900} fontWeight={700}>
                We want a Social Media Admin who:
              </Typography>
              <Box height={8}></Box>
              <Typography variant="h4" lineHeight={1.8} color={colors.darkBlue700}>
                💚English good enough to speak and write.<br />
                💚Detail-oriented, organised, and able to manage multiple projects and deadlines.<br />
                💚Decent understanding of social media management and its techniques to improve audience engagement<br />
                💚Excited to work on impromptu projects that respond to current events and trending topics.<br />
                <br />
                The ideal candidate will have experience in managing and promoting social media pages with an eye for the latest online trends and interests, and creative copywriting. To apply, please complete our volunteer application survey and submit your CV and at least one example of your previous work.
              </Typography>
            </Box>
          </AccordionDetails>
        </AccordionStyled>
      </ContainerVacanPosition>
      <Box height={24}></Box>
      <ContainerFooter>
        <Box className="content-item_left">
          <img src={PartnerWithUs1} alt="" />
        </Box>
        <Box className="content-item_right">
          <Typography color={colors.primary1} variant="h1" fontWeight={600}>
            Volunteer with EcoCupid today!
          </Typography>
          <Box height={24}></Box>
          <Typography color={colors.darkBlue500} variant="h3">
            Thank you everyone who applied to be an <span className="branch">EcoCupid</span>{' '}
            volunteer! We are excited to receive so many applications and appreciate your passion for a greener future. We'll be in touch with you soon with more details and look forward to opening applications for our next season of volunteers. If you have any questions, feel free to contact us at{' '}
            <span className="email">enquiry@ecocupid-asean.com.</span>
          </Typography>
        </Box>
      </ContainerFooter>
    </Box>
  );
}
