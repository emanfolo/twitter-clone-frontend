declare var process : {
  env: {
    accessKeyId: string,
    secretAccessKey: string
  }
}

export const s3Config = {
        bucketName:  'twitter-clone-image-storage',
        region: 'eu-west-2',
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        s3Url: 'https://twitter-clone-image-storage.s3.eu-west-2.amazonaws.com' 
    }