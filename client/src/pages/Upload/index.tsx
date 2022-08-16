import React, { useCallback, useState, VFC } from 'react';
import { Section } from 'styles/Upload/styles';
import { toast, ToastContainer } from 'react-toastify';
import { IUserFace } from '@typings/db';
import { FileType } from '@typings/enum';
import 'react-toastify/dist/ReactToastify.css';
import ImageComponent from '../../components/Image';
import { getKakaoAPI } from 'utils/axios';

const Upload: VFC = () => {
    const [imageSrc, setImageSrc] = useState(String);
    const [userData, setUserData] = useState<IUserFace | null>();
    const [userDataReq, setUserDataReq] = useState(false);
    const getUserInfo = useCallback(async (formData: FormData) => {
        try {
            const {
                data: { result }
            } = await getKakaoAPI.post('/v2/vision/face/detect/', formData);

            if (result.faces.length !== 0) {
                setUserDataReq(false);
                setUserData(result.faces[0].facial_attributes);
            } else {
                toast.error(`얼굴인식이 되지 않습니다. 다른 사진을 올려주세요`, {
                    position: 'top-center',
                    autoClose: 2500
                });
                setUserDataReq(false);
                setImageSrc('');
                setUserData(null);
            }
        } catch (err: any) {
            toast.error(err.msg as string, { position: 'top-center', autoClose: 2500 });
        }
    }, []);

    const createFormData = useCallback((fileObj: File): FormData => {
        const formData = new FormData();
        formData.append('image', fileObj);
        return formData;
    }, []);

    const onloadend = useCallback(
        (reader: FileReader, fileObj: File) => {
            reader.onload = () => {
                setImageSrc(reader.result as string);
                getUserInfo(createFormData(fileObj));
            };
        },
        [createFormData, getUserInfo]
    );
    const encodeFileToBase64 = useCallback(
        (fileObj: File | undefined) => {
            const reader: FileReader = new FileReader();
            if (fileObj) {
                reader.readAsDataURL(fileObj);
                onloadend(reader, fileObj);
            }
        },
        [onloadend]
    );
    const fileTypeCheck = useCallback((filePath: string): boolean => {
        const pathPoint: number = filePath.lastIndexOf('.');
        const fileType: string = filePath.substring(pathPoint + 1, filePath.length).toUpperCase();
        if (fileType === FileType.JPG || fileType === FileType.PNG) {
            return true;
        } else {
            toast.error('이미지 파일만 업로드 해주세요 :)', {
                position: 'top-center',
                autoClose: 2500
            });
            setUserDataReq(false);
            return false;
        }
    }, []);

    const onChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setUserDataReq(true);
            if (fileTypeCheck((e.target as HTMLInputElement).value)) {
                encodeFileToBase64((e.target as HTMLInputElement).files?.[0]);
            }
        },
        [encodeFileToBase64, fileTypeCheck]
    );
    return (
        <Section>
            {userDataReq ? (
                <div id="spinner"></div>
            ) : (
                <label htmlFor="file"> ⭐ How old do i look (Click) </label>
            )}
            <input type="file" id="file" onChange={onChange} />
            {!userDataReq && userData && imageSrc && (
                <ImageComponent imageSrc={imageSrc} userData={userData} alt="person" />
            )}
            <ToastContainer />
        </Section>
    );
};
export default Upload;
