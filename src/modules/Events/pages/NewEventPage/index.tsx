import {
  Button,
  FileCard,
  ModalWindow,
  Preloader,
  UploadDragFile,
  openSnackBar
} from "@quark-uilib/components";
import { IconClose, IconCloudImport, IconTrash2 } from "@quark-uilib/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { FilesWrapper, UploadFilesWrapper } from "./styles";
import { clientRoutes } from "src/routes/constants";

export const NewEventPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleChange = (_files: File[]): void => {
    setFiles(files.concat(_files));
  };

  const handleUploadFiles = async (): Promise<void> => {
    if (files.length > 0) {
      setIsLoading(true);
      try {
        const promises: Promise<any>[] = [];
        files.forEach((file) => {
          promises.push(api.postEvents(file));
        });
        await Promise.all(promises);
        navigate(clientRoutes.main.path);
      } catch {
        openSnackBar({
          message:
            "Упс, что-то пошло не так. Попробуйте перезагрузить страницу и снова загрузить документы"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const _handleClose = (): void => {
    navigate(clientRoutes.main.path);
  };

  return (
    <ModalWindow
      className="modal-window-upload-file"
      title="Загрузка файлов"
      isOpen={true}
      onClose={_handleClose}
      type="fullscreen"
      footerContent={
        <>
          <Button
            viewType="primary"
            icon={isLoading ? <Preloader /> : <IconCloudImport />}
            isDisabled={isLoading || !files.length}
            onClick={handleUploadFiles}>
            Загрузить
          </Button>
          <Button
            viewType="secondary"
            icon={<IconClose />}
            onClick={_handleClose}>
            Отмена
          </Button>
        </>
      }>
      <UploadFilesWrapper>
        <UploadDragFile
          className="upload-drag-file"
          description={"Формат WAV, MP3, MP4, OPUS"}
          icon={<IconCloudImport height={40} width={40} />}
          isMultiple
          accept=".wav, .mp3, .mp4, .opus"
          onChange={handleChange}
        />
        <FilesWrapper>
          {files.map((file, index) => (
            <FileCard
              className="upload-file-card"
              key={file.name + file.type}
              fileName={file.name.split(".")[0]}
              fileExtension={file.type.split("/")[1]}
              buttonIcon={<IconTrash2 />}
              onButtonClick={() =>
                setFiles((prevFiles) =>
                  prevFiles.filter((_, _index) => _index !== index)
                )
              }
            />
          ))}
        </FilesWrapper>
      </UploadFilesWrapper>
    </ModalWindow>
  );
};

export default NewEventPage;
