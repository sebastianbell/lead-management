"use client";

import React from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { schema, uischema } from "@/schemas/schemas";
import FileUploadRenderer from "@/components/renderers/FileUploadRenderer";
import { Button } from "@mui/material";
import { LeadFormData } from "types/types";

const LeadForm = () => {
  const [data, setData] = React.useState<Partial<LeadFormData>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );
  const [isMounted, setIsMounted] = React.useState(false);
  const [errors, setErrors] = React.useState<any[]>([{}]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message);
        console.error("Error submitting form:", result.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting the form.");
      console.error("Error submitting form:", error);
    }
  };

  const renderers = [
    ...materialRenderers,
    {
      tester: (uischema: any) =>
        uischema.scope === "#/properties/resume" ? 3 : -1,
      renderer: FileUploadRenderer,
    },
  ];

  return (
    <>
      <header className="flex bg-[#DADDAC] h-[360px]">
        <div className="w-auto bg-[url('/assets/images/immigration-assessment-header-bg.webp')] bg-no-repeat bg-cover aspect-[413/714]"></div>
        <div className="flex flex-col items-start justify-center h-full mx-6 space-y-4 lg:mx-11">
          <img
            src="/assets/images/alma-header-logo.svg"
            alt="Alma Logo"
            className="w-auto"
          />
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight">
            Get An Assessment Of Your Immigration Case
          </h1>
        </div>
      </header>
      <div className="p-6 max-w-lg mx-auto">
        {!isMounted ? (
          <div className="flex items-center justify-center">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        ) : submitted ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold tracking-normal leading-snug mb-5">
              Thank You
            </h2>
            <p className="text-base font-normal tracking-normal leading-relaxed mb-5">
              Your information was submitted to our team of immigration
              attorneys. Expect an email from hello@tryalma.ai.
            </p>
            <Button variant="contained" color="primary">
              Go Back to Homepage
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold tracking-normal leading-snug mb-5">
              Want to understand your visa options?
            </h2>
            <p className="text-base font-normal tracking-normal leading-relaxed mb-5">
              Submit the form below and our team of experienced attorneys will
              review your information and send a preliminary assessment of your
              case based on your goals.
            </p>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              onChange={({ data, errors }) => {
                setData(data as LeadFormData);
                setErrors(errors || []);
              }}
              validationMode="ValidateAndHide"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ my: 2 }}
              onClick={handleSubmit}
              disabled={errors.length > 0}
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default LeadForm;
