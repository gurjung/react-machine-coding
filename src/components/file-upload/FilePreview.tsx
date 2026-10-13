import React, { useEffect, useState } from "react";

interface IProps {
  file: File;
}

const FilePreview = (props: IProps) => {
  const [url, setUrl] = useState("");

  const isImage = props.file.type.startsWith("image/");

  useEffect(() => {
    // check if image
    if (!isImage) return;
    // convert url object
    const imageUrl = URL.createObjectURL(props.file);
    //setUrl state
    setUrl(imageUrl);

    // cleanup
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [props.file, isImage]);
  return (
    <div>
      <img alt="" src={url} width={48} height={48} />
    </div>
  );
};

export default FilePreview;
