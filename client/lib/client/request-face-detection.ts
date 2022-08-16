import { fetcher } from '../fetcher';
import { uploadImage } from '../upload-image';

const facialPoints = [
  'jaw',
  'right_eyebrow',
  'left_eyebrow',
  'nose',
  'right_eye',
  'left_eye',
  'lip',
] as const;

export interface Face {
  facial_attributes: {
    gender: {
      male: number;
      female: number;
    };
    age: number;
  };
  facial_points: {
    [key in typeof facialPoints[number]]: [number, number][];
  };
  score: number;
  class_idx: 0;
  x: number;
  y: number;
  w: number;
  h: number;
  pitch: number;
  yaw: number;
  roll: number;
}

export interface FaceDetectionResult {
  rid: string;
  result: {
    width: number;
    height: number;
    faces: Face[];
  };
}

export async function requestFaceDetection(file: File) {
  const key = await uploadImage(file);

  return await fetcher<FaceDetectionResult>('/api/face/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });
}
