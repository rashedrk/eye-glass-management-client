import  { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Controller } from "react-hook-form";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type CSUploaderProps = {
  name: string;
  label?: string;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CSUploader = ({ name, label }: CSUploaderProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={(info) => {
              handleChange(info);
              field.onChange(info.fileList);
            }}
            beforeUpload={() => false}
            multiple
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default CSUploader;
