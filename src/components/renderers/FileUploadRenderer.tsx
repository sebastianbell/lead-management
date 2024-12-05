import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { FormControl, FormLabel, Input } from "@mui/material";

const FileUploadRenderer = ({
  label,
  handleChange,
  path,
}: {
  label?: string;
  handleChange: (path: string, value: any) => void;
  path: string;
}) => {
  const inputId = `file-upload-${path}`;

  return (
    <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
      {label && (
        <FormLabel htmlFor={inputId}>
          {label}
          <span
            aria-hidden="true"
            className="MuiFormLabel-asterisk css-1ljffdk-MuiFormLabel-asterisk"
          >
            {" "}
            *
          </span>
        </FormLabel>
      )}
      <Input
        id={inputId}
        type="file"
        onChange={(event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (upload) => {
              handleChange(path, upload.target?.result);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </FormControl>
  );
};

export default withJsonFormsControlProps(FileUploadRenderer);
