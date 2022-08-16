import React, { VFC } from 'react';
import { IUserFace } from '@typings/db';
import { Dl } from './styles';

interface Props {
    userData: IUserFace;
}
const SpeechBubble: VFC<Props> = ({
    userData: {
        gender: { male, female },
        age
    }
}) => {
    return (
        <Dl>
            <div>
                <dt>Age</dt>
                <dd>{Math.floor(age)}</dd>
            </div>
            <div>
                <dt>Gender</dt>
                <dd>{male > female ? '남' : '여'}</dd>
            </div>
        </Dl>
    );
};

export default SpeechBubble;
