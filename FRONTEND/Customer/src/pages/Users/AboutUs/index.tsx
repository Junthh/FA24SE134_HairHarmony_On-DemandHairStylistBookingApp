import React, { useEffect } from 'react';
import { AboutUsStyled } from './styled';
import * as colors from 'constants/colors';
import ImageAboutUs1 from './mock/frame1.png';
import ImageAboutUs2 from './mock/frame2.png';
import ImageAboutUs3 from './mock/frame3.png';

export default function AboutUs() {
  useEffect(() => {
    // Change title
    document.title = `About Us`;
  }, []);

  return <AboutUsStyled></AboutUsStyled>;
}
