import React, { FC, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  openSnackBar,
  Tooltip,
  Preloader,
  ModalWindow,
  Input,
  Form,
  Dropdown,
  IDropdownItem
} from "@quark-uilib/components";
import {
  IconImport,
  IconTrash2,
  IconClose,
  IconSend2
} from "@quark-uilib/icons";
import { ButtonsActionBlockWrapper } from "./styles";
import { IButtonsActionBlockProps } from "./types";
import useDownloadFile from "src/utils/useDownloadFile";
import api from "src/modules/Events/api";

const ButtonsActionBlock: FC<IButtonsActionBlockProps> = ({ name }) => {
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEmail, setModalEmail] = useState(false);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const form = Form.useForm<{ email: string }>();

  const { handleDownload, isDownload } = useDownloadFile(
    "111",
    "docx",
    params.id as string
  );

  const dropdownItems = useMemo<IDropdownItem[]>(
    () => [
      {
        label: "Скачать docx",
        onClick: handleDownload
      }
    ],
    []
  );

  const handlerDeleteDoc = (): void => {
    api
      .deleteEvent(params.id as string)
      .then(() => {
        setIsModalDelete(false);
        navigate(-1);
        openSnackBar({ message: "Заказ удален" });
      })
      .catch(() => {
        openSnackBar({ message: "Не удалось удалить заказ" });
      });
  };

  const handleOpenEmailModal = (): void => {
    setModalEmail(true);
  };

  const handleSendEmail = (): void => {
    form.submit();
  };

  const formFinish = ({ email }: { email: string }): void => {
    api
      .getEmail(params.id as string, email)
      .then(() => {
        setModalEmail(false);
        openSnackBar({ message: "Результат отправлен на вашу почту" });
      })
      .catch(() => {
        openSnackBar({
          message: "Не удалось отправить вам результат",
          status: "error"
        });
      });
  };

  return (
    <>
      <ButtonsActionBlockWrapper>
        <Tooltip text="Скачать результат" direction="topRight">
          <Dropdown items={dropdownItems}>
            <Button viewType="icon" size="m">
              {isDownload ? <Preloader /> : <IconImport />}
            </Button>
          </Dropdown>
        </Tooltip>
        <Divider direction="column" />
        <Tooltip text="Отправить результат на почту" direction="topRight">
          <Button viewType="icon" size="m" onClick={handleOpenEmailModal}>
            {<IconSend2 />}
          </Button>
        </Tooltip>
        <Divider direction="column" />
        <Tooltip text="Удалить заказ" direction="topRight">
          <Button
            viewType="icon"
            size="m"
            onClick={() => setIsModalDelete(true)}>
            <IconTrash2 />
          </Button>
        </Tooltip>
      </ButtonsActionBlockWrapper>
      <ModalWindow
        isOpen={isModalDelete}
        title="Удалить заказ?"
        subTitle={name}
        onClose={() => setIsModalDelete(false)}
        footerContent={
          <>
            <Button
              onClick={handlerDeleteDoc}
              viewType="primary"
              color="red"
              icon={<IconTrash2 />}
              size="l">
              Удалить
            </Button>
            <Button
              viewType="secondary"
              size="l"
              icon={<IconClose />}
              onClick={() => setIsModalDelete(false)}>
              Отмена
            </Button>
          </>
        }>
        Восстановить результаты распознавания после удаления будет невозможно.
      </ModalWindow>
      <ModalWindow
        isOpen={isModalEmail}
        title="Отправить результат на почту?"
        subTitle="Укажите вашу почту"
        onClose={() => setModalEmail(false)}
        footerContent={
          <>
            <Button onClick={handleSendEmail} viewType="primary" size="l">
              Отправить
            </Button>
            <Button
              viewType="secondary"
              size="l"
              icon={<IconClose />}
              onClick={() => setModalEmail(false)}>
              Отмена
            </Button>
          </>
        }>
        <Form<{ email: string }> form={form} onFinish={formFinish}>
          <Form.Field
            name="email"
            rules={[
              { required: true, message: "Укажите почту" },
              {
                pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
                message: "Не правильный формат почты"
              }
            ]}>
            <Input />
          </Form.Field>
        </Form>
      </ModalWindow>
    </>
  );
};

export default ButtonsActionBlock;
