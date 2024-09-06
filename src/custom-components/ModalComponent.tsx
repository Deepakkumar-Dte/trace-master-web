import React from "react";
import { Card } from "@mui/material";
import Modal, { ModalOwnProps } from "@mui/material/Modal";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: 0,
  p: 1,
};

type ModalProps = ModalOwnProps & {
  title: string;
  style: React.CSSProperties;
  children: React.ReactNode;
};

export default function ModalComponent(props: ModalProps) {
  return (
    <Modal {...props} style={{ backgroundColor: "whitesmoke", ...props.style }}>
      <Card sx={style}>
        <div className="h-8 flex justify-between">
          <h4>{props.title}</h4>
          <Close
            className="cursor-pointer"
            onClick={() => props.onClose && props.onClose({}, "escapeKeyDown")}
          />
        </div>
        <div className="pt-4 min-h-64">{props.children}</div>
      </Card>
    </Modal>
  );
}
