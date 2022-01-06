declare var process : {
  env: {
    NEXT_PUBLIC_accessKeyId: string,
    NEXT_PUBLIC_secretAccessKey: string
  }
}


export const s3Config = {
        bucketName:  'twitter-clone-image-storage',
        region: 'eu-west-2',
        accessKeyId: process.env.NEXT_PUBLIC_accessKeyId,
        secretAccessKey: process.env.NEXT_PUBLIC_secretAccessKey,
        s3Url: 'https://twitter-clone-image-storage.s3.eu-west-2.amazonaws.com' 
    }

