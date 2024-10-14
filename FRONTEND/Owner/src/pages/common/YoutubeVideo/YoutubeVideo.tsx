import * as colors from 'constants/colors';
import React, { CSSProperties } from 'react';

interface YoutubeVideoProps {
  youtubeId: string;
  width?: any;
  height?: any;
  style?: CSSProperties;
}

const initStyle: CSSProperties = {
  width: '100%',
  height: '320px',
  maxHeight: '1440px',
  borderRadius: '24px',
  border: `8px solid ${colors.primary1}`,
};

function YoutubePlayer(props: YoutubeVideoProps) {
  const { youtubeId, style = {} } = props;

  return (
    <div className="video-responsive">
      {youtubeId && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          style={{ ...initStyle, ...style }}
          rel="0"
        />
      )}
    </div>
  );
}

export default YoutubePlayer;
