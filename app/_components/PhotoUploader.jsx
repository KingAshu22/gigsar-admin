import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Cropper, getCroppedImg } from "react-cropper-custom";
import "react-cropper-custom/dist/index.css";
import "./modal.css";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { fromBase64 } from "@aws-sdk/util-base64";

const PhotoUploader = ({ artistName, setProfilePic }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showCroppedImage, setShowCroppedImage] = useState(false);

  const onFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = async (croppedArea) => {
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedArea);
      setCropData(croppedImg);
    } catch (e) {
      console.error(e);
    }
  };

  const handleProfileUpload = async (base64) => {
    try {
      const img = new Image();
      img.src = base64;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = 350;
        canvas.height = 350;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 350, 350);
        const webpData = canvas.toDataURL("image/webp", 0.8);
        const imageData = webpData.split(",")[1];
        const location = await uploadProfileToS3(imageData);
        setProfilePic(location);
        setShowModal(false);
        setShowCroppedImage(true);
      };
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const uploadProfileToS3 = async (base64) => {
    try {
      const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        },
      });

      const folderName = artistName.replace(/\s+/g, "-");
      const folderKey = `${folderName}/`;

      // Check if the folder exists
      const listObjectsCommand = new ListObjectsCommand({
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Prefix: folderKey,
      });
      const { Contents } = await s3Client.send(listObjectsCommand);

      if (!Contents || Contents.length === 0) {
        // Create the folder
        const createFolderParams = {
          Bucket: process.env.NEXT_PUBLIC_BUCKET,
          Key: folderKey,
        };
        const putObjectCommand = new PutObjectCommand(createFolderParams);
        await s3Client.send(putObjectCommand);
      }

      const fileName = `${nanoid()}.webp`;
      const buffer = fromBase64(base64);
      const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: `${folderKey}${fileName}`,
        Body: buffer,
        ACL: "public-read",
        ContentType: "image/webp",
      };
      const putObjectCommand = new PutObjectCommand(uploadParams);
      await s3Client.send(putObjectCommand);

      return `https://${process.env.NEXT_PUBLIC_BUCKET}.s3.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/${folderName}/${fileName}`;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSave = () => {
    handleProfileUpload(cropData);
  };

  return (
    <>
      {!showCroppedImage && (
        <div className="mb-4">
          <Dropzone onDrop={onFileDrop} accept="image/*" maxSize={5000000}>
            {({ getRootProps, getInputProps }) => (
              <section className="bg-gray-200 rounded-lg p-4 pt-8 pb-8 text-center max-w-36">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>
                    Drag & drop Image to upload here or click to upload image.
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      )}
      {showCroppedImage && cropData && (
        <>
          <label className="block text-sm font-medium text-gray-700">
            Profile Pic
          </label>
          <img
            src={cropData}
            alt="Cropped Image"
            className="mb-4 rounded-lg max-w-36"
          />
        </>
      )}
      {showModal && imageSrc && (
        <div className="modal-overlay">
          <div className="modal flex flex-col gap-4">
            <Cropper
              src={imageSrc}
              width={300}
              height={300}
              zoom={zoom}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
            />
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoUploader;
