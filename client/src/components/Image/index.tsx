import React, { VFC } from 'react';
import SpeechBubble from '../../components/SpeechBubble';
import { IUserFace } from '@typings/db';
import { Div } from './styles';
import Image from 'next/image';

interface Props {
    imageSrc: string;
    userData: IUserFace;
    alt: string;
}

const ImageComponent: VFC<Props> = ({ imageSrc, userData, alt }) => {
    return (
        <Div>
            <Image src={imageSrc} alt={alt} layout="fill" objectFit="contain" />
            <SpeechBubble userData={userData} />
        </Div>
    );
};

export default ImageComponent;
