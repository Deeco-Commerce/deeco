import upload from '../assets/images/upload.png';
import Image from 'next/image';

const ImageUpload = ({ previewUrl, filePickerRef, pickedHandler, pickImageHandler }) => (
  <div className="flex items-end">
    <div className="border w-[201px] border-[[#E0E0E0]] mr-6">
      <input
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        multiple
      />
      <div className="flex items-center justify-center flex-col">
        <div className="h-[127px] w-full">
          {previewUrl && <img src={previewUrl} className="h-[120px] w-full" alt="Preview" />}
          {!previewUrl && (
            <div
              className="text-sm cursor-pointer flex items-center  flex-col"
              onClick={pickImageHandler}
            >
              <Image src={upload} alt="upload" width={30} height={30} className="mt-8" />
              <p>Drag and drop image</p>
            </div>
          )}
        </div>
      </div>
    </div>
    <div>
      <button onClick={pickImageHandler} className="bg-[#E0E0E0] px-6 py-2">
        Browse
      </button>
    </div>
  </div>
);

export default ImageUpload;
