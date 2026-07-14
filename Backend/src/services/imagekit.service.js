import ImageKit from 'imagekit';

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
async function uploadFile(buffer) {
  const response = await client.upload({
    file: buffer.toString("base64"),
    fileName: 'file-name.jpg',
  });
  return response;
}

export { uploadFile };