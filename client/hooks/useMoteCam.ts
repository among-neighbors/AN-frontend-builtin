import { useState, useRef, RefObject } from 'react';
import * as faceapi from '@vladmandic/face-api';
import { CustomDetectedFace } from '../types/CustomDetectedFace';
import {
  MoteCamAdviceType,
  MoteCamAdviceMessage,
} from '../src/components/organisms/MoteCamMessage';
import { speakMessage } from '../hooks/useSpeech';
import { MoteCamAgeType, MoteCamAgeMessage } from '~/components/organisms/MoteCamAge';
//import { useLocale } from "../hooks/useLocale";

const MODEL_PATH = '../public/model';
const detectorOptions = new faceapi.TinyFaceDetectorOptions();

type MoteCamType = {
  isStarted: boolean;
  startAndStop: () => void;
  isReady: boolean;
  isTakenPhoto: boolean;
  dismissTakenPhoto: () => void;
  downloadPhoto: () => void;
  moteCamAdvice: MoteCamAdviceType;
  moteCamAge: MoteCamAgeType;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  photoRef: RefObject<HTMLImageElement>;
};

const useMOTECam = (): MoteCamType => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isTakenPhoto, setIsTakenPhoto] = useState<boolean>(false);
  const [moteCamAdvice, setMoteCamAdvice] = useState<MoteCamAdviceType>({
    faceSize: { message: '', fulfilled: false },
    facePosition: { message: '', fulfilled: false },
  });
  const [moteCamAge, setMoteCamAge] = useState<MoteCamAgeType>({
    age: { message: '', fulfilled: false },
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  const languageCode = 'ko-KR';

  const localizedStrings = {
    APP_TITLE: '맞춤형 서비스를 위해 얼굴 인식을 시작합니다',
    START_SHOOTING: '얼굴 인식을 시작합니다.',
    END_SHOOTING: '얼굴 인식을 종료합니다.',
    PICTURE_DID_TAKE: '얼굴 인식이 완료 되었습니다. 맞춤형 서비스가 진행됩니다.',
    GUIDE_MSG_POSITION_GOOD: '얼굴 위치가 적당합니다.😀',
    GUIDE_MSG_POSITION_TOO_UPPER: '얼굴을 조금만 낮추어주세요.',
    GUIDE_MSG_POSITION_TOO_LOWER: '얼굴을 조금만 높여주세요.',
    GUIDE_MSG_POSITION_TOO_RIGHT: '얼굴을 조금만 왼쪽으로 이동해주세요.',
    GUIDE_MSG_POSITION_TOO_LEFT: '얼굴을 조금만 오른쪽으로 이동해주세요.',
    GUIDE_MSG_SIZE_GOOD: '화면 내의 얼굴 크기가 적절합니다.🙆',
    GUIDE_MSG_SIZE_TOO_SMALL: '화면 내의 얼굴이 너무 작습니다. 조금만 더 가까이 와주세요.',
    GUIDE_MSG_SIZE_TOO_BIG: '화면 내의 얼굴이 너무 큽니다. 조금 떨어져 주세요.',
    GUIDE_MSG_AGE_LOOKALIKE: '%age',
    PHOTO_COMPLETION_TITLE: '완료',
  };

  const startMoteCam = async () => {
    if (isStarted) {
      stopMoteCam();
      speakMessage(`${localizedStrings.END_SHOOTING}`, languageCode);
      return;
    }
    speakMessage(`${localizedStrings.START_SHOOTING}`, languageCode);

    setIsStarted(true);
    // TensorFlow
    await setupTensorFlow();
    // FaceAPI
    await setupModel();
    // Camera
    await setupCamera();
    setIsReady(true);
  };

  const stopMoteCam = () => {
    toggleStartStop();
    setIsStarted(false);
    setIsReady(false);
  };

  const dismissTakenPhoto = () => {
    setIsTakenPhoto(false);
    toggleStartStop();
  };

  // SetUp Tensolflow
  const setupTensorFlow = async () => {
    // TODO: Types
    // @ts-ignore
    await faceapi.tf.setBackend('cpu');
    // @ts-ignore
    await faceapi.tf.enableProdMode();
    // @ts-ignore
    await faceapi.tf.ENV.set('DEBUG', false);
    // @ts-ignore
    await faceapi.tf.ready();
  };

  // Setup Model
  const setupModel = async () => {
    await faceapi.nets.tinyFaceDetector.load(MODEL_PATH); // using ssdMobilenetv1
    await faceapi.nets.ageGenderNet.load(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.load(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.load(MODEL_PATH);
    await faceapi.nets.faceExpressionNet.load(MODEL_PATH);
  };

  // Setup Camera
  const setupCamera = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      const canvas = canvasRef.current as HTMLCanvasElement;
      if (!navigator.mediaDevices) {
        throw new Error('Camera Error: access not supported');
      }
      const constraints = {
        audio: false,
        video: true,
      };
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        let errName = '';
        let msg = '';
        if (err instanceof Error) {
          if (err.name === 'PermissionDeniedError' || err.name === 'NotAllowedError') {
            errName = 'camera permission denied';
          } else if (err.name === 'SourceUnavailableError') {
            errName = 'camera not available';
          }
          if (err.message) {
            msg = err.message;
          }
        }
        throw new Error(`Camera Error: ${errName}: ${msg.length > 0 ? msg : err}`);
      }
      if (stream) {
        video.srcObject = stream;
      } else {
        throw new Error('Camera Error: MediaStream Empty');
      }
      const track = stream.getVideoTracks()[0];
      track.applyConstraints({
        audio: false,
        video: {
          facingMode: 'user',
          width: {
            ideal: 1280,
          },
          height: {
            ideal: 720,
          },
        },
        // @ts-ignore
        advanced: [{ brightness: 50, contrast: 50 }],
      });

      const settings = track.getSettings();
      if (settings.deviceId) {
        // Delete property / Release memory indirectly
        delete settings.deviceId;
      }
      if (settings.groupId) {
        delete settings.groupId;
      }
      if (settings.aspectRatio) {
        settings.aspectRatio = Math.trunc(100 * settings.aspectRatio) / 100;
      }
      // Canvas Settings
      canvas.width = settings.width ? settings.width : 0;
      canvas.height = settings.height ? settings.height : 0;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      video.onloadeddata = async () => {
        video.play();
        const ctx = canvas.getContext('2d');
        // Invert Canvas
        ctx?.scale(-1, 1);
        ctx?.translate(-canvas.width, 0);
        await detectHandler();
      };
    }
  };

  // Face Detection
  const detectHandler = async () => {
    if (videoRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      if (!video.paused) {
        const detectedFace = await faceapi
          .detectSingleFace(video, detectorOptions)
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();

        // Debugging Draw Area
        // showDebuggingRect(detectedFace, fps.toLocaleString(), canvasRef.current)
        // Check Detected Face
        checkFace(detectedFace);
        // For Performance
        requestAnimationFrame(() => detectHandler());
      }
    }
  };

  // Check MOTE Face
  const checkFace = (face: CustomDetectedFace) => {
    if (face && canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;

      // In Center
      const facePosition = checkFaceInCenter(
        { w: canvas.width, h: canvas.height },
        face.detection.box,
      );

      // Is Size Just
      const faceSize = checkFaceSize({ w: canvas.width, h: canvas.height }, face.detection.box);

      // Age
      const faceAgeMsg = expectedAge(face.age);

      setMoteCamAdvice({
        faceSize: faceSize,
        facePosition: facePosition,
      });
      setMoteCamAge({
        // expression:faceExp,
        age: faceAgeMsg,
      });

      if (facePosition.fulfilled && faceSize.fulfilled) {
        // Enough to shooting
        takePhoto();

        setIsTakenPhoto(true);
        const video = videoRef.current as HTMLVideoElement;
        video.pause();
        speakMessage(`${localizedStrings.PICTURE_DID_TAKE}`, languageCode);
      }
    }
  };

  // Is face in the center ?
  const checkFaceInCenter = (
    frame: { w: number; h: number },
    facebox: { x: number; y: number; width: number; height: number },
  ): MoteCamAdviceMessage => {
    // Center of frame
    const frameCenter: { x: number; y: number } = { x: frame.w / 2, y: frame.h / 2 };
    // margin
    const coordinator: { w: number; h: number } = { w: 200, h: 200 };

    // Allowable U D L R
    const toleranceRange: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    } = {
      left: frameCenter.x - coordinator.w,
      right: frameCenter.x + coordinator.w,
      top: frameCenter.y - coordinator.h,
      bottom: frameCenter.y + coordinator.h,
    };

    // Center of face
    const faceCenter: { x: number; y: number } = {
      x: facebox.x + facebox.width / 2,
      y: facebox.y + facebox.height / 2,
    };

    // Judgement
    // horizontal
    let horizontal = false;
    if (toleranceRange.left < faceCenter.x && faceCenter.x < toleranceRange.right) {
      horizontal = true;
    }
    // vertical
    let vertical = false;
    if (toleranceRange.top < faceCenter.y && faceCenter.y < toleranceRange.bottom) {
      vertical = true;
    }

    const isTooUpper = faceCenter.y < toleranceRange.top;
    const isTooDown = faceCenter.y > toleranceRange.bottom;
    const isTooRight = faceCenter.x > toleranceRange.right;
    const isTooLeft = faceCenter.x < toleranceRange.left;

    let msg = '';

    if (isTooUpper) {
      msg = localizedStrings.GUIDE_MSG_POSITION_TOO_UPPER;
    } else if (isTooDown) {
      msg = localizedStrings.GUIDE_MSG_POSITION_TOO_LOWER;
    }

    // Caz canvas is inverted
    if (isTooRight) {
      msg = localizedStrings.GUIDE_MSG_POSITION_TOO_RIGHT;
    } else if (isTooLeft) {
      msg = localizedStrings.GUIDE_MSG_POSITION_TOO_LEFT;
    }

    return {
      fulfilled: horizontal && vertical,
      message: msg,
    };
  };

  // Face Sizing
  const checkFaceSize = (
    frame: { w: number; h: number },
    facebox: { x: number; y: number; width: number; height: number },
  ): MoteCamAdviceMessage => {
    // Judgement by percentage of the frame
    const frameArea = frame.w * frame.h;
    const faceArea = facebox.width * facebox.height;

    // 30% to 50%
    const lowRatio = 0.2;
    const highRatio = 0.3;
    const ratio = faceArea / frameArea;

    let isSufficient = lowRatio <= ratio && ratio <= highRatio;
    let tooSmall = lowRatio > ratio;
    let tooBig = ratio > highRatio;
    let msg = '';
    if (isSufficient) {
      msg = `${localizedStrings.GUIDE_MSG_SIZE_GOOD}`;
    } else if (tooSmall) {
      msg = `${localizedStrings.GUIDE_MSG_SIZE_TOO_SMALL}`;
    } else if (tooBig) {
      msg = `${localizedStrings.GUIDE_MSG_SIZE_TOO_BIG}`;
    } else {
      msg = `??: ${Math.floor(ratio * 100)}%`;
    }

    return {
      fulfilled: isSufficient,
      message: msg,
    };
  };

  // Age
  const expectedAge = (age: number): MoteCamAgeMessage => {
    const ageMsg = localizedStrings.GUIDE_MSG_AGE_LOOKALIKE.replace('%age', `${Math.round(age)}`);
    return {
      fulfilled: true,
      message: ageMsg,
    };
  };

  // Execute taking photo
  const takePhoto = () => {
    const video = videoRef.current as HTMLVideoElement;

    const canvasForDraw = document.createElement('canvas') as HTMLCanvasElement;

    const stream: MediaStream = video.srcObject as MediaStream;
    if (stream === null) return;

    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings();
    const width = settings.width ? settings.width : 0;
    const height = settings.height ? settings.height : 0;

    canvasForDraw.width = width;
    canvasForDraw.height = height;

    const ctx: CanvasRenderingContext2D = canvasForDraw.getContext('2d')!;

    // Inversion
    ctx.scale(-1, 1);
    ctx.translate(-width, 0);

    ctx.drawImage(video, 0, 0, width, height);

    video.pause();
  };

  // Download Photo
  const downloadPhoto = () => {
    if (photoRef.current) {
      const a = document.createElement('a');
      const photo = photoRef.current as HTMLImageElement;
      document.body.appendChild(a);
      a.download = 'best_shot.png';
      a.href = photo.src;
      a.click();
      a.remove();
    }
  };

  // Restart
  const toggleStartStop = () => {
    if (videoRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      if (video && video.readyState >= 2) {
        // @ts-ignore
        if (video.paused) {
          // @ts-ignore
          video.play();
          setTimeout(() => {
            detectHandler();
          }, 1000);
        } else {
          // @ts-ignore
          video.pause();
        }
      }
    }
  };

  return {
    isStarted: isStarted,
    startAndStop: startMoteCam,
    isReady: isReady,
    isTakenPhoto: isTakenPhoto,
    dismissTakenPhoto: dismissTakenPhoto,
    downloadPhoto: downloadPhoto,
    moteCamAdvice: moteCamAdvice,
    moteCamAge: moteCamAge,
    videoRef: videoRef,
    canvasRef: canvasRef,
    photoRef: photoRef,
  };
};

export { useMOTECam };
