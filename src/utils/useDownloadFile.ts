import { useState } from "react";

type TUseDownloadSetFile = (
  name: string,
  docType: string
) => {
  handleDownload: () => void;
  isDownload: boolean;
};

const useDownloadFile: TUseDownloadSetFile = (name, docType) => {
  const [isDownload, setIsDownload] = useState(false);

  const handleDownload = (): void => {
    setIsDownload(true);
    const link = document.createElement("a");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    link.href = URL.createObjectURL("");
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
