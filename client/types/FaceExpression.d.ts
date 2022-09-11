// Expression
// angry: 0.0001337282155873254
// disgusted: 3.1885437579148856e-7
// fearful: 1.3430851986129255e-9
// happy: 0.000003975554136559367
// neutral: 0.99961256980896
// sad: 0.00024136707361321896
// surprised: 0.000008040878128667828
export type FaceExpression = {
    neutral: number
    happy: number
    sad: number
    angry: number
    fearful: number
    disgusted: number
    surprised: number
}

export type FaceExp = {
    expression: string;
    predict: number;
}
