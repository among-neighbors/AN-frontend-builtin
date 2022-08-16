const accessKeyId = process.env.AWS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET;

if (!accessKeyId || !secretAccessKey) throw new Error('Missing AWS keys.');

const awsCredentials = {
  accessKeyId,
  secretAccessKey,
};

export default awsCredentials;
