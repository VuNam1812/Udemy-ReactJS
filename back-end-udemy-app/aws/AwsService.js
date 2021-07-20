const aws = require("aws-sdk");
require("dotenv").config();
class AwsService {
  constructor() {
    this.accessKeyId = process.env.AWSAccessKeyId;
    this.secretAccessKey = process.env.AWSSecretKey;
    aws.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    });

    this.S3_BUCKET = process.env.AWSBucket;
    this.s3 = new aws.S3();
  }

  async createLinkUpload({ userId, fileName, fileType }, folder) {
    const s3Params = {
      ContentType: fileType,
      Bucket: this.S3_BUCKET,
      Key: userId + "/" + folder + "/" + fileName,
      Expires: 600,
    };
    const urlGetObject = `https://${this.S3_BUCKET}.s3.${
      process.env.AWS_REGION
    }.amazonaws.com/${userId + "/" + folder + "/" + fileName}`;
    const urlSaveObject = this.s3.getSignedUrl("putObject", s3Params);
    
    return {
      urlGetObject,
      urlSaveObject,
    };
  }
}
module.exports = AwsService;
