"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { UploadIcon } from "@radix-ui/react-icons";
import { Button, Code, Text } from "@radix-ui/themes";
import cn from "classnames";
import React from "react";
import styles from "./FileDropper.module.css";

export function FileDropper(props: {
  label?: React.ReactNode;
  accept?: string;
  maxFiles?: number;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  style?: React.CSSProperties;
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isDropHovering, setIsDropHovering] =
    React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const hasDroppedFiles = files.length > 0;

  const previews = files.map((file) => {
    const url = URL.createObjectURL(file);
    return (
      <div key={url} className={styles.preview}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={file.name} />
      </div>
    );
  });

  return (
    <>
      <Dialog.Root
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <Dialog.Portal
          container={document.getElementById("main")!}
        >
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title>Invalid file type</Dialog.Title>
            <Dialog.Description>
              <Text size="3">
                Only files of type <Code>{props.accept}</Code>{" "}
                are allowed.
              </Text>
            </Dialog.Description>
            <Button
              variant="soft"
              asChild
              style={{ marginTop: "var(--space-3)" }}
              color="teal"
            >
              <Dialog.Close>Close</Dialog.Close>
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <label
        className={cn(styles.label, {
          [styles.active]: hasDroppedFiles,
          [styles.dropHovering]: isDropHovering,
        })}
        style={props.style}
      >
        <button
          title={
            files.length > 0 ? "Reselect files" : "Select files"
          }
          style={props.style}
          onDragEnter={() => setIsDropHovering(true)}
          onDragLeave={() => setIsDropHovering(false)}
          onDrop={() => setIsDropHovering(false)}
        >
          {hasDroppedFiles && (
            <div className={styles.previews}>{previews}</div>
          )}
          <input
            accept={props.accept}
            multiple={props.multiple}
            onDrop={(event) => {
              event.preventDefault();
              let files = Array.from(event.dataTransfer.files);
              const allFilesLength = files.length;
              if (props.accept) {
                files = files.filter((file) =>
                  new RegExp(
                    `${props.accept}`.replace("*", ".*")
                  ).test(file.type)
                );
              }
              if (files.length > 0) {
                setFiles((prevFiles) => {
                  const next = [...files, ...prevFiles].slice(
                    0,
                    props.maxFiles
                  );
                  props.onChange?.(next);
                  return next;
                });
              }
              if (files.length < allFilesLength) {
                setDialogOpen(true);
              }
            }}
            onChange={(event) => {
              const selectedFiles = event.target.files;
              if (selectedFiles && selectedFiles.length > 0) {
                const newFiles = Array.from(selectedFiles);
                setFiles((prevFiles) => {
                  const next = [...newFiles, ...prevFiles].slice(
                    0,
                    props.maxFiles
                  );
                  props.onChange?.(next);
                  return next;
                });
              }
            }}
            type="file"
            className={styles.input}
          />
          <Text size="5" color="sky">
            {isDropHovering ? (
              <>Drop here</>
            ) : hasDroppedFiles ? (
              <Text weight="bold">
                {files.length} file
                {files.length !== 1 ? "s" : ""} selected
              </Text>
            ) : (
              props.label ?? (
                <>
                  <UploadIcon /> Click here, or drag & drop{" "}
                  {props.multiple ? "files" : "a file"}
                </>
              )
            )}
          </Text>
        </button>
      </label>
    </>
  );
}
