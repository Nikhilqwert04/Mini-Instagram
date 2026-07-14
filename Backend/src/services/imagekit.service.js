import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});
async function uploadFile(buffer) {
  const response = await client.files.upload({
    file: buffer.toString("base64"),
    fileName: 'file-name.jpg',
  });
  return response;
}

export { uploadFile };