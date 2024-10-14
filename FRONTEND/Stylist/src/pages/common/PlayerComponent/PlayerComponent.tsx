import React, { memo } from 'react';
import CustomPlayer from 'react-player';
import './styles.css';

interface PlayerComponentProps {
  url: string;
  controls?: boolean;
  playing?: boolean;
  loop?: boolean;
  width?: any;
  height?: any;
}

function PlayerComponent(props: PlayerComponentProps) {
  const {
    url,
    loop = true,
    controls = true,
    playing = false,
    width = '100%',
    height = '100%',
  } = props;

  return (
    <CustomPlayer
      width={width}
      height={height}
      url={url}
      controls={controls}
      playing={playing}
      loop={loop}
      config={{
        youtube: {
          playerVars: {
            rel: 0,
          },
        },
      }}
    />
  );
}

export default memo(PlayerComponent);
