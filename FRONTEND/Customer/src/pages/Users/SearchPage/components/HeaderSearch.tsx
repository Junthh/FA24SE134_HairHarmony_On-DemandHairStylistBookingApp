import React, { memo, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { BaseTextField } from 'components/Base/BaseTextField';
import { ICONS } from 'configurations/icons';
import { ButtonPrimary } from 'pages/common/style/Button';
import * as colors from 'constants/colors';
import { PostTypeEnum } from 'models/Posts.model';
import { useNavigate } from 'react-router-dom';
import { USER_PATH } from 'configurations/paths/paths';
import { theme } from 'theme';

export const HeaderSearchStyled = styled(Box)({
  background: `${colors.primary5}`,
  padding: '32px 0px',
  '& .search-box': {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    margin: '0px auto',
    width: '48%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    '&-input': {
      background: `${colors.white}`,
      width: '95%',
      '& >div': { height: 60 },
    },
    '& .search-button': {
      display: 'flex',
      justifyContent: 'flex-start',
      gap: '0px 16px',
      flexWrap: 'nowrap',
      overflow: 'scroll',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-start',
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '& .MuiButton-text': {
        fontSize: 18,
        fontWeight: 700,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      },
      '& .inactive': {
        background: `${colors.white}`,
        '&:hover': {
          color: '#FFFFFF',
          background: '#56F09F',
        },
      },
    },
  },
});

interface HeaderSearchProps {
  onInput?: (e: any) => void;
  onSelectType?: (type: any) => void;
  searchText?: string;
  type?: string;
}

const initButton = [
  {
    label: 'All',
    active: true,
    value: PostTypeEnum.All,
  },
  {
    label: 'Eco-Stories',
    active: false,
    value: PostTypeEnum.Post,
  },
  {
    label: 'Eco-Films',
    active: false,
    value: PostTypeEnum.Video,
  },
  {
    label: 'OUR READER’S STORIES',
    active: false,
    // value: 'ourReaderStories',
    value: PostTypeEnum.OurReaderStory,
  },
];

function HeaderSearch(props: HeaderSearchProps) {
  const { onInput, onSelectType, searchText, type } = props;
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [buttonList, setButtonList] = useState(initButton);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onInput(value);
    }
  };

  const handleClear = () => {
    setValue('');
    onInput('');
  };

  const handleClick = (value: any) => {
    // if ((value as string) === 'ourReaderStories') {
    //   navigate(`/${USER_PATH.OUR_READER_STORIES}`);
    //   return;
    // }
    const newState = buttonList.map((b) => {
      if (b.value === value) {
        return {
          ...b,
          active: true,
        };
      }

      return {
        ...b,
        active: false,
      };
    });

    setButtonList(newState);

    if (value) {
      onSelectType(value);
    }
  };

  const handleClickIconSearch = () => {
    onInput(value);
  };

  useEffect(() => {
    if (searchText) {
      setValue(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    if (type) {
      handleClick(type);
    }
  }, [type]);

  return (
    <HeaderSearchStyled>
      <Box className="search-box">
        <BaseTextField
          className="search-box-input"
          InputProps={{
            startAdornment: (
              <ICONS.IconMagnifyingGlass
                onClick={handleClickIconSearch}
                style={{ cursor: 'pointer' }}
              ></ICONS.IconMagnifyingGlass>
            ),
            endAdornment: <ICONS.IconXCircle onClick={handleClear} style={{ cursor: 'pointer' }} />,
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        ></BaseTextField>

        <Box height={16}></Box>

        <Box className="search-button">
          {buttonList.map((item, index) => (
            <div>
              <ButtonPrimary
                key={index}
                severity="primary"
                padding={'10px 28px'}
                borderradius={'40px'}
                border={`1px solid`}
                className={!item.active ? 'inactive' : ''}
                onClick={() => {
                  handleClick(item.value);
                }}
              >
                {item.label}
              </ButtonPrimary>
            </div>
          ))}
        </Box>
      </Box>
    </HeaderSearchStyled>
  );
}

export default memo(HeaderSearch);
