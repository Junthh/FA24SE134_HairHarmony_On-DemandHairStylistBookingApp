import styled from '@emotion/styled';
import { Box, Grid, Link, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { theme } from 'theme';
import * as colors from 'constants/colors';
import { LOGO } from 'configurations/logo';
import ImageComponent from 'components/Common/Image/ImageComponent';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { useForm } from 'react-hook-form';
import { postsService } from 'services/posts.service';
import { showToast } from 'components/Common/Toast';
import { handleError } from 'utils/helper';
import { useNavigate } from 'react-router';
import { USER_PATH } from 'configurations/paths/paths';
import useModal from 'hooks/useModal';
import { Dialog } from 'components/Common/Dialog';

const FooterWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '60px 0px 80px 165px',
  background: `${colors.darkBlue900}`,
  height: 'auto',
  '& .nocopy-right_footer': {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '60px 20px !important',
    '& .nocopy-right_footer': {
      display: 'block',
    },
    '& .nocopy-right': {
      display: 'none',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: '60px 20px !important',
    '& .nocopy-right_footer': {
      display: 'block',
    },
    '& .nocopy-right': {
      display: 'none',
    },
  },
}));

const CustomItemTextHeader = styled(Link)({
  color: `${colors.white}`,
  fontStyle: 'normal',
  fontWeight: '700 !important',
  fontSize: '18px !important',
  lineHeight: '21px !important',
  textDecoration: 'none',
});

const CustomListItemTextLink = styled(Link)({
  color: `${colors.white}`,
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '19px',
  textDecoration: 'none',
  paddingTop: '8px',
});

const CustomListItemText = styled(`div`)({
  color: `${colors.white}`,
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '19px',
  textDecoration: 'none',
  paddingTop: '8px',
});

const EmailContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const EmailInput = styled(TextFieldElement)({
  borderTopLeftRadius: '2px',
  borderBottomLeftRadius: '2px',
  background: colors.white,

  '& .MuiInputBase-root': {
    borderRadius: '0',
    height: 48,
  },
});

const ButtonSubscribe = styled(`div`)({
  padding: '0.75em 1em',
  background: colors.a2,
  color: colors.white,
  fontWeight: 700,
  fontSize: 18,
  borderTopRightRadius: '2px',
  borderBottomRightRadius: '2px',
  cursor: 'pointer',
});

const DialogContentWrap = styled(Box)({
  padding: '0px 20px 20px 20px',
});
export default function Footer() {
  // FORM
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const formContext = useForm<any>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
  });
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = formContext;

  const handleSubscribe = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = getValues('email');
      if (!email) {
        showToast('error', 'Please input your email before subscribing !!!');
        return;
      }
      if (!emailRegex.test(email)) {
        showToast('error', 'Your email is invalid !!!');
        return;
      }

      const res = (await postsService.subscribeEmail({ email })) as any;
      if (res) {
        showToast('success', 'Your email saved successfully!!!');
        setValue('email', '');
        return;
      }
      showToast('error', 'Some errors occurred !!!');
    } catch (error) {
      showToast('error', handleError(error.message || error));
    }
  };

  return (
    <FooterWrapper>
      <Dialog
        open={isOpen}
        onClose={() => {
          closeModal();
        }}
        width="100%"
        title="Terms & Conditions"
        content={
          <DialogContentWrap>
            <Typography>
              <b>Terms of Use for User-Generated Articles</b>
              <br />
              <br />
              Welcome to EcoCupid! We appreciate your contributions to our platform and are excited
              to have you share your insights and knowledge on environmental topics. To ensure a
              positive and respectful environment for all users, we have established the following
              Terms of Use for user-generated articles:
              <br />
              <br />
              <b>1. Original Content:</b> By submitting an article to EcoCupid, you confirm that the
              content is original and does not violate any copyright or intellectual property rights
              of others. Plagiarism and unauthorized use of copyrighted material are strictly
              prohibited.
              <br />
              <b>2. Accurate and Honest Information:</b> You are responsible for the accuracy and
              authenticity of the information presented in your articles. Misleading or false
              information will be removed, and repeated violations will result in the termination of
              your account.
              <br />
              <b>3. Respectful Communication:</b> We encourage open discussions and diverse
              viewpoints, but we also expect all users to communicate respectfully and avoid
              personal attacks or offensive language in their articles.
              <br />
              <b>4. Environmental Focus:</b> Articles submitted to EcoCupid should be related to
              environmental issues, projects, or educational content. Off-topic submissions may be
              removed without notice.
              <br />
              <b>5. Multilingual Submissions:</b> We welcome articles in multiple languages to
              foster a global community. However, please provide a brief summary or translation in
              English to facilitate understanding for our broader audience.
              <br />
              <b>6. Non-Commercial Use:</b> EcoCupid is an environment-focused platform, and
              articles should not be used for commercial purposes, including self-promotion or
              advertising for commercial purposes. EcoCupid reserves the right to authorize articles
              in contention on a case-by-case basis.
              <br />
              <b>7. Moderation and Content Removal:</b> EcoCupid reserves the right to moderate and
              remove any user-generated content that violates our Terms of Use or community
              guidelines.
              <br />
              <b>8. Rights and Permissions:</b> By submitting an article to EcoCupid, you grant us a
              non-exclusive, royalty-free, and worldwide license to use, display, and distribute
              your content on our platform and related promotional materials.
              <br />
              <b> 9. Responsibility for Comments:</b> Authors are responsible for monitoring and
              responding to comments on their articles. EcoCupid is not liable for the content of
              comments posted by users.
              <br />
              <b>10. Collaboration and Attribution:</b> If your article includes contributions from
              others, ensure that you have their permission to use their work and provide
              appropriate attribution.
              <br />
              <b> 11. Age Requirement:</b> Users must be at least 13 years old to submit articles to
              EcoCupid. If you are under 18, please obtain permission from a parent or guardian.
              <br />
              <b> 12. Compliance with Laws:</b> Users must adhere to all applicable laws and
              regulations while using EcoCupid's platform.
              <br />
              <br />
              Failure to comply with these Terms of Use may lead to the removal of your content. By
              submitting your articles to EcoCupid, you acknowledge and agree to abide by these
              Terms of Use. These terms are subject to change, and it is your responsibility to
              review them periodically.
              <br />
              Thank you for being a part of our passionate community of environmentalists! Together,
              we can make a positive impact on our planet. Happy writing!
              <br />
              <br />
              Terms of Use for User-Generated Content on EcoCupid
              <br />
              Welcome to EcoCupid! We are delighted to have you as part of our community. By using
              our platform and contributing your content, you agree to the following Terms of Use:
              <br />
              <br />
              <b>1. Content Ownership:</b>
              <br />
              When you submit or post any content on EcoCupid, including but not limited to
              articles, photos, videos, comments, or any other material (hereafter referred to as
              "User-Generated Content"), you retain all ownership rights to your content.
              <br />
              <br />
              <b>2. License Grant:</b>
              <br />
              By submitting User-Generated Content, you grant EcoCupid a non-exclusive,
              royalty-free, worldwide, perpetual, and transferable license to use, modify,
              reproduce, adapt, publicly display, and distribute the content on our platform and any
              other media or channels owned or operated by EcoCupid.
              <br />
              <br />
              <b>3. Content Guidelines:</b>
              <br />
              You agree not to submit any User-Generated Content that is illegal, defamatory,
              abusive, threatening, harassing, obscene, or otherwise objectionable. Content
              promoting hate speech, violence, or discrimination based on race, ethnicity, religion,
              gender, or any other characteristic will not be allowed.
              <br />
              <br />
              <b>4. Copyright Infringement:</b>
              <br />
              You must ensure that your User-Generated Content does not violate any third-party
              copyright, trademark, or intellectual property rights. If you believe that your
              copyrighted work has been used without authorization, please contact us immediately.
              <br />
              <br />
              <b>5. Age Requirement:</b>
              <br />
              By using EcoCupid and submitting User-Generated Content, you confirm that you are at
              least 18 years old or have obtained parental consent to participate.
              <br />
              <br />
              <b>6. Privacy and Personal Data:</b>
              <br />
              When contributing User-Generated Content, you agree that any personal data shared or
              included in the content is done so voluntarily. EcoCupid will handle personal data in
              accordance with its Privacy Policy.
              <br />
              <br />
              <b>7. Content Moderation:</b>
              <br />
              EcoCupid reserves the right to review, modify, or remove any User-Generated Content
              that violates these Terms of Use or is deemed inappropriate, without prior notice. We
              encourage community members to report any content that may breach these guidelines.
              <br />
              <br />
              <b>8. Responsibility for Content:</b>
              <br />
              You are solely responsible for your User-Generated Content and any consequences
              arising from its submission. EcoCupid does not endorse or guarantee the accuracy,
              reliability, or appropriateness of any User-Generated Content.
              <br />
              <br />
              <b>9. Indemnification:</b>
              <br />
              By submitting User-Generated Content, you agree to indemnify and hold EcoCupid, its
              affiliates, partners, employees, and agents harmless from any claims, damages, or
              liabilities arising from your content.
              <br />
              <br />
              <b>10. Changes to Terms of Use:</b>
              <br />
              EcoCupid reserves the right to modify these Terms of Use at any time. Any updates will
              be posted on the platform, and your continued use of EcoCupid after the changes will
              constitute acceptance of the revised Terms.
              <br />
              <br />
              If you have any questions or concerns about these Terms of Use or your User-Generated
              Content, please contact us at enquiry@ecocupid-asean.com.
              <br />
              <br />
              Thank you for being part of the EcoCupid community and contributing to a greener
              world!
            </Typography>
          </DialogContentWrap>
        }
      />
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <List>
            <ListItem>
              <CustomItemTextHeader href="#">
                <LOGO.Vector.EcocupidMedium />
              </CustomItemTextHeader>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.ABOUTUS}`}>
                About us
              </CustomListItemTextLink>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.PARTNER_WITH_US}`}>
                Partner with us
              </CustomListItemTextLink>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.VOLUNTEERS}`}>
                Volunteer
              </CustomListItemTextLink>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.OUR_READER_STORIES}`}>
                Our Reader's Stories
              </CustomListItemTextLink>
            </ListItem>
          </List>
        </Grid>
        <Grid item sm={12} md={3}>
          <List>
            <ListItem>
              <CustomItemTextHeader>Terms of use</CustomItemTextHeader>
            </ListItem>
            <Box height={10}></Box>
            <ListItem
              sx={{ '&:hover': { cursor: 'pointer' } }}
              onClick={() => {
                openModal();
              }}
            >
              <CustomListItemTextLink>Terms & Conditions</CustomListItemTextLink>
            </ListItem>
            {/* <ListItem>
              <CustomListItemTextLink href="#">Privacy Policy</CustomListItemTextLink>
            </ListItem>{' '}
            <ListItem>
              <CustomListItemTextLink href="#">Cookies Policy</CustomListItemTextLink>
            </ListItem> */}
            <Box height={30}></Box>
            <ListItem>
              <CustomItemTextHeader>Support by</CustomItemTextHeader>
            </ListItem>
            <ListItem>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '20px',
                }}
              >
                <ImageComponent
                  src={LOGO.Images.Yseali}
                  styleImg={{ height: '36px', width: '57px' }}
                />
                <ImageComponent
                  src={LOGO.Images.Vista}
                  styleImg={{ height: '36px', width: '48px' }}
                />
                <ImageComponent
                  src={LOGO.Images.Mansfield}
                  styleImg={{ height: '36px', width: '95px' }}
                />
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item sm={12} md={4}>
          <List>
            <ListItem>
              <CustomItemTextHeader>
                Email subscription to get informed via email about new articles
              </CustomItemTextHeader>
            </ListItem>
            <ListItem>
              <CustomListItemText>
                By clicking Subscribe, you have agreed to our Terms & Conditions and Privacy Policy.
              </CustomListItemText>
            </ListItem>
            <ListItem>
              <EmailContainer>
                <EmailInput
                  name="email"
                  fullWidth
                  control={control}
                  placeholder="Enter your email address"
                  sx={{
                    background: colors.white,
                  }}
                />
                <ButtonSubscribe onClick={handleSubscribe}>Subscribe</ButtonSubscribe>
              </EmailContainer>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink
                href="mailto:enquiry@ecocupid-asean.com"
                sx={{
                  borderBottom: `1px solid ${colors.white}`,
                }}
              >
                © EcoCupid. All Rights Reserved.
              </CustomListItemTextLink>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </FooterWrapper>
  );
}
