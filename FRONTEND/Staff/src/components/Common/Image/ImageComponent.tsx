import React, { CSSProperties } from 'react'
import styled from '@emotion/styled';

type ImageProps = {
    src: string,
    alt?: string,
    style?: CSSProperties,
    styleImg?: CSSProperties,
}

export const ImageContainer = styled(`div`)({
    width: '100%',
    height: '100%'
});

export default function ImageComponent(props: ImageProps) {
    const { src, alt = "", style = {}, styleImg = {} } = props;

    return (
        <ImageContainer style={style}>
            <img style={styleImg} width={'100%'} height={'100%'} src={src} alt={alt} />
        </ImageContainer>
    )
}
