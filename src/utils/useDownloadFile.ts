import { useState } from "react";
import api from "src/modules/Events/api";

type TUseDownloadSetFile = (
  name: string,
  docType: string,
  id: string
) => {
  handleDownload: () => void;
  isDownload: boolean;
};

const useDownloadFile: TUseDownloadSetFile = (name, docType, id) => {
  const [isDownload, setIsDownload] = useState(false);

  const handleDownload = async (): Promise<void> => {
    setIsDownload(true);
    const link = document.createElement("a");
    const result = await api.getFileResult(id, docType);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    link.href = URL.createObjectURL(result.data);
    if (name) {
      link.download = `${name}.${docType}`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownload(false);
  };

  return {
    handleDownload,
    isDownload
  };
};

export default useDownloadFile;
