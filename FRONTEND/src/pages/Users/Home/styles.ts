import { theme } from 'theme';
import styled from '@emotion/styled';
import { Box, Popper } from '@mui/material';
import * as colors from 'constants/colors';
export const HomeStyled = styled(Box)({
  overflow: 'hidden',
  '& .home_watching': {
    padding: 52,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      padding: 0,
      marginBottom: 80,
    },
    '&-player': {
      width: '100%',
      [theme.breakpoints.down('md')]: {
        width: '95%',
        margin: '30px auto 0px auto',
      },
      background:
        'linear-gradient(180deg, rgba(24, 65, 39, 0.9) -30.29%, rgba(42, 93, 79, 0) 31.26%, #2A5D4F 100%)',
      borderRadius: '24px !important',
      '& iframe': {
        borderRadius: '24px !important',
        [theme.breakpoints.down('md')]: {
          borderRadius: '0px !important',
          marginBottom: 80,
        },
      },
    },
    '&-content': {
      position: 'absolute',
      bottom: '15%',
      left: '11%',
      zIndex: 2,
      [theme.breakpoints.down('md')]: {
        top: '52%',
      },

      '&-title': {
        fontFamily: 'General Sans',
        fontSize: '60px',
        fontWeight: '600',
        lineHeight: '120%',
        color: colors.white,

        [theme.breakpoints.down('md')]: {
          fontSize: '38px',
          lineHeight: '140%',
        },
      },
    },
    '&-button': {
      width: '45%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.white,
      color: colors.darkBlue900,
      textAlign: 'center',
      fontWeight: '700',
      lineHeight: '180%',
      textTransform: 'uppercase',
      borderRadius: '40px',
      padding: '10px 28px',
      marginTop: '20px',
      cursor: 'pointer',
      transition: '0.3s ease-in-out',
      '&:hover': {
        background: colors.primary,
        color: colors.white,
      },

      [theme.breakpoints.down('md')]: {
        width: '70%',
      },
    },
  },
  '& .home_newest-eco-stories': {
    padding: '120px 52px',
    background: '#FEFBEB',
    margin: '120px 0px',
    [theme.breakpoints.down('md')]: {
      padding: '80px 20px',
    },
  },
  '& .home_eco-heroes': {
    padding: 52,
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      padding: '40px 0px 40px 0px',
      '& .title': {
        justifyContent: 'center !important',
      },
      '&-list': {
        overflowX: 'scroll',
        overflowY: 'hidden',
        paddingLeft: '20px',
        paddingRight: '20px',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
    '& .title': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '&-list': {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 20,
      // [theme.breakpoints.down('lg')]: {
      //   overflow: 'scroll',
      //   paddingLeft: '20px',
      //   paddingRight: '20px',
      //   '&::-webkit-scrollbar': {
      //     display: 'none',
      //   },
      // },
    },
  },
  '& .home_eco-map': {
    background: colors.primary1,
    marginTop: 84,
    padding: '52px 250px',
    position: 'relative',
    top: '900px',

    [theme.breakpoints.down('lg')]: {
      top: '1050px',
    },

    '& .map-after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: colors.primary1,
      borderRadius: '0 0 50% 50%',
      transform: 'scale(1.5)',
      zIndex: 1,
      [theme.breakpoints.down('md')]: {
        top: '12px',
        left: '-125px',
        width: '148%',
      },
      [theme.breakpoints.down('sm')]: {
        top: '65px',
        left: '-125px',
        width: '129%',
        transform: 'scale(1.6)',
      },
    },
    '& .map': {
      [theme.breakpoints.down('md')]: {
        top: '70%',
        left: '75%',
      },
      [theme.breakpoints.down('sm')]: {
        top: '85%',
        left: '112%',
      },
      position: 'absolute',
      zIndex: 3,
      top: '50%',
      left: '50%',
      '-ms-transform': 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      '& .icon-wrap': {
        position: 'relative',
        [theme.breakpoints.down('md')]: {
          width: '65%',
          overflow: 'scroll',
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
            display: 'none',
          },
          '&:hover': {
            '&::-webkit-scrollbar-thumb': {
              background: colors.scrollbar,
            },
          },
        },
        [theme.breakpoints.down('sm')]: {
          // width: '33%',
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
          },
          '&:hover': {
            '&::-webkit-scrollbar-thumb': {
              background: 'transparent',
            },
          },
        },
        '& .icon-vn': {
          position: 'absolute',
          zIndex: 3,
          top: '156px',
          left: '279px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-my': {
          position: 'absolute',
          zIndex: 3,
          top: '494px',
          left: '180px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-mm': {
          position: 'absolute',
          zIndex: 3,
          top: '152px',
          left: '50px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-la': {
          position: 'absolute',
          zIndex: 3,
          top: '190px',
          left: '202px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-th': {
          position: 'absolute',
          zIndex: 3,
          top: '320px',
          left: '176px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-kh': {
          position: 'absolute',
          zIndex: 3,
          top: '370px',
          left: '250px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-sg': {
          position: 'absolute',
          zIndex: 3,
          top: '583px',
          left: '220px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-ph': {
          position: 'absolute',
          zIndex: 3,
          top: '270px',
          left: '632px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-bn': {
          position: 'absolute',
          zIndex: 3,
          top: '534px',
          left: '512px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-id': {
          position: 'absolute',
          zIndex: 3,
          top: '705px',
          left: '494px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
        '& .icon-tl': {
          position: 'absolute',
          zIndex: 3,
          bottom: '27px',
          left: '708px',
          '& img': {
            border: '3px solid white',
            borderRadius: 40,
          },
          '& .MuiBadge-badge': {
            background: colors.white,
          },
        },
      },
    },
    '& .title': {
      position: 'absolute',
      zIndex: 3,
      top: 0,
      right: '15%',
      textAlign: 'right',
      width: '35%',
      [theme.breakpoints.down('md')]: {
        top: -20,
        left: '0%',
        right: '0%',
        width: '100vw',
        textAlign: 'center',
      },
    },
  },
  '& .home_eco-films': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '&-wrap': {
      marginTop: 40,
      marginBottom: 40,
      overflow: 'scroll',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',

      '& .item': {
        [theme.breakpoints.up('md')]: {
          width: 350,
          height: 190,
        },
        width: 380,
        height: 210,
        position: 'relative',

        '& .image-item': {
          width: '100%',
          height: '100%',
          borderRadius: 24,
        },

        '& .image-btnplay': {
          position: 'absolute',
          bottom: 24,
          right: 28,
          width: 40,
          height: 40,
          background: 'rgba(10, 16, 35, 0.7)',
          borderRadius: 100,
          '& svg': {
            width: 24,
            height: 24,
            color: colors.white,
            position: 'absolute',
            left: 8,
            top: 8,
          },
          '& :hover': {
            cursor: 'pointer',
          },
        },
      },

      '& .container-list1': {
        paddingBottom: 10,
        overflow: 'scroll',
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent',
        },
        [theme.breakpoints.up('md')]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            '&::-webkit-scrollbar-thumb': {
              background: colors.scrollbar,
            },
          },
        },

        '& .list1': {
          [theme.breakpoints.down('md')]: {
            width: '175%',
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          marginBottom: 20,

          // '& iframe': {
          //   borderRadius: '24px !important',
          // },
        },
      },

      '& .container-list2': {
        paddingBottom: 10,
        overflow: 'scroll',
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent',
        },
        // [theme.breakpoints.up('md')]: {
        //   '&:hover': {
        //     '&::-webkit-scrollbar-thumb': {
        //       background: colors.scrollbar,
        //     },
        //   },
        // },

        '& .list2': {
          [theme.breakpoints.down('md')]: {
            width: '180%',
          },
          width: '120%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,

          // '& iframe': {
          //   borderRadius: '24px !important',
          // },
          // '& .item': {
          //   width: 380,
          //   height: 210,
          //   [theme.breakpoints.up('md')]: {
          //     width: 350,
          //     height: 190,
          //   },
          // },
        },
      },
    },
  },
  '& .feature-category': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 52,
    marginTop: 1150,
    [theme.breakpoints.down('md')]: {
      padding: '48px 20px',
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: 1450,
    },
    '& .button-switch': {
      marginTop: 24,
      marginBottom: 80,
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        marginRight: '20px',
      },
    },
  },

  '& .card-reader_stories': {
    padding: '120px 32px',
    background: '#FEFBEB',
    [theme.breakpoints.down('md')]: {
      padding: '80px 20px',
    },
    '& .image-header-item': {
      height: 200,
      borderRadius: 24,

      [theme.breakpoints.down(1480)]: {
        height: 150,
      },
      [theme.breakpoints.down(1200)]: {
        height: 120,
      },
      [theme.breakpoints.down('md')]: {
        height: 420,
      },
      [theme.breakpoints.down('sm')]: {
        height: 180,
      },
    },
  },
  '& .footer_home-content': {
    background: colors.primary1,
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    gap: '40px 0px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 120,
    [theme.breakpoints.down('md')]: {
      padding: '80px 20px',
    },
    '& .MuiTypography-h3': {
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
  },
});
export const FeatureCategoryStyled = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  marginBottom: 180,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    rowGap: '60px',
  },

  '& .image-header-item': {
    width: '100%',
    height: 320,
    transition: 'width 0.8s, height 0.8s',
    borderRadius: 24,
    '&:hover': {
      // [theme.breakpoints.down('md')]: {
      //   width: '100%',
      //   height: 320,
      // },
      cursor: 'pointer',
      // height: 400,
      // transform: 'scale(1.1)',
      // transition: 'width 0.8s, height 0.8s',
    },

    // [theme.breakpoints.down(1480)]: {
    //   height: 150,
    // },
    [theme.breakpoints.down(1200)]: {
      height: 290,
    },
    [theme.breakpoints.down(1080)]: {
      height: 260,
    },
    [theme.breakpoints.down(980)]: {
      height: 240,
    },
    [theme.breakpoints.down('md')]: {
      height: 420,
    },
    [theme.breakpoints.down('sm')]: {
      height: 200,
      '&:hover': {
        height: 200,
      }
    },
  },

  '& .feature': {
    width: '25%',
    // maxWidth: '582px'
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },

  '& .feature-special': {
    width: '45%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  }
});

export const BoxEcoHeroes = styled(Box)({
  border: `2px solid ${colors.primary1}`,
  borderRadius: 24,
  minHeight: '520px',
  position: 'relative',
  width: '330px',
  zIndex: 2,

  [theme.breakpoints.down('lg')]: {
    minHeight: '480px',
  },

  '& .image-eco': {
    // padding: '29px 14px',
    borderRadius: '24px',
    height: '330px',
    width: '330px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      cursor: 'pointer',
    },

    '& img': {
      width: '96%',
      height: '96%',
      borderTopLeftRadius: '22px',
      borderTopRightRadius: '22px',
      objectFit: 'cover',
      objectPosition: 'center',

      // [theme.breakpoints.down('sm')]: {
      //   width: '100%',
      // },
    },

    [theme.breakpoints.down('lg')]: {
      width: '285px',
      height: '340px',
    },
  },
  '& .eco-text': {
    minHeight: 260,
    background: colors.primary4,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: '20px 10px 10px 10px',
    position: 'absolute',
    // bottom: '0px',
    width: '100%',
    // textAlign: 'center',
    '& .MuiTypography-body1': {
      margin: '0 auto',
    },

    [theme.breakpoints.down('lg')]: {
      textAlign: 'center',
      minHeight: '135px'
    },
  },
});

export const CustomPopper = styled(Popper)({
  zIndex: 3,
  '& .MuiPaper-root': {
    borderRadius: 24,
    padding: 24,
    '& .image-list': {
      display: 'flex',
      gap: '12px',
      margin: '16px 0px',
    },
  },
});
