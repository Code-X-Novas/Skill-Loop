import React, { useState } from 'react';
import { FaPlusCircle, FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/FirebaseConfig';
import { Loader } from 'lucide-react';

const UploadBox = ({ label, id, onUpload, accept = 'image/*,video/*' }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false); // ✅ New state

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/', 'video/'];
    const isValid = validTypes.some((type) => file.type.startsWith(type));
    if (!isValid) {
      toast.error('Please select a valid image or video file.');
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setFileType(file.type);
    setIsUploading(true);
    setIsUploaded(false); // Reset uploaded state

    try {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

      const metadata = {
        contentType: file.type,
        contentDisposition: 'inline',
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(percent);
        },
        (error) => {
          console.error(error);
          toast.error('Upload failed.');
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUpload(downloadURL);
          toast.success("Uploaded successfully!");
          setIsUploading(false);
          setIsUploaded(true); // ✅ Mark as uploaded
          setProgress(0); // ✅ Clear progress
        }
      );
    } catch (err) {
      console.error('Upload failed', err);
      toast.error('Upload failed.');
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    setFileType('');
    setProgress(0);
    setIsUploading(false);
    setIsUploaded(false); // Reset uploaded state
    onUpload('');
  };

  const isImage = fileType.startsWith('image/');

  return (
    <div className="flex-1">
      <p className="mb-1 text-sm font-medium">{label}</p>

      <div className="border-2 border-dashed border-gray-300 rounded p-4 h-64 flex flex-col items-center justify-center gap-2 relative">
        <label htmlFor={id} className="cursor-pointer w-full h-full flex items-center justify-center">
          {previewUrl ? (
            isImage ? (
              <div className="relative">
                <img src={previewUrl} alt="preview" className="max-h-48 object-contain rounded" />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <Loader className="animate-spin w-10 h-10 text-white" />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <video src={previewUrl} controls className="max-h-48 object-contain rounded" />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <Loader className="animate-spin w-10 h-10 text-white" />
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="w-[250px] h-[160px] bg-[#eae8e8] flex items-center justify-center rounded">
              <FaPlusCircle className="text-8xl text-white" />
            </div>
          )}
        </label>

        {previewUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 text-red-600 text-2xl"
          >
            <IoCloseCircle />
          </button>
        )}

        {/* ✅ Show progress while uploading */}
        {progress > 0 && isUploading && (
          <div className="w-full flex flex-col gap-1 mt-2">
            <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
              <div
                className="h-2 rounded bg-gradient-to-b from-orange-300 to-orange-400 transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-700 font-medium text-center">Uploading... {progress}%</span>
          </div>
        )}

        {/* ✅ Show success message after upload */}
        {isUploaded && (
          <div className="flex items-center gap-2 text-green-600 mt-2">
            <FaCheckCircle className="text-xl" />
            <span className="text-sm font-medium">Upload Successful!</span>
          </div>
        )}

        <input
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadBox;
