import React, {ChangeEvent, useState} from 'react';
import { Button, styled } from "@mui/material";
import { UploadFile } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onChange, onClear, className }: any) {
  const [previewSrc, setPreviewSrc] = useState('');

  // 处理文件选择事件
  const handleFileChange = (event:   ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    onChange(file);
    if (file && file.type.startsWith('image/')) {
      // 使用 FileReader 来读取文件
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // 当读取完成后，将图片的 base64 URL 设置到状态中
        setPreviewSrc(reader.result);
      };
    }
  };

  return (
      <div className={className}>
        <Button component="label" variant="contained" startIcon={<UploadFile />}>
          Upload Image
          <VisuallyHiddenInput
              onChange={handleFileChange}
              type="file"
          />
        </Button>
        {previewSrc && (
            <img src={previewSrc} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
        )}
      </div>
  );
}
