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

  const handleReset = () => {
    setSubmitted(false);
    setData({});
    setErrorMessage(undefined);
    setErrors([]);
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
      <header className="relative h-[360px] bg-[#DADDAC] bg-[url('/assets/images/immigration-assessment-header-bg.webp')] bg-left bg-no-repeat bg-contain mb-8 flex items-center">
        <div className="flex flex-col items-start justify-center h-full ml-auto mr-auto px-[240px]">
          <img
            src="/assets/images/alma-header-logo.svg"
            alt="Alma Logo"
            className="mb-10"
          />
          <h1 className="text-5xl font-black">
            Get An Assessment
            <br />
            Of Your Immigration Case
          </h1>
        </div>
      </header>
      <div className="p-6 max-w-lg mx-auto">
        {!isMounted ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl font-bold mt-10">Loading...</div>
          </div>
        ) : submitted ? (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-5">Thank You</h2>
            <p className="text-base font-normal mb-5">
              Your information was submitted to our team of immigration
              attorneys. Expect an email from hello@tryalma.ai.
            </p>
            <Button variant="contained" color="primary" onClick={handleReset}>
              Go Back to Homepage
            </Button>
          </div>
        ) : (
          <>
            <img
              src="/assets/images/icon-info.webp"
              alt="Info Icon"
              className="h-[46px] mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-center mb-5">
              Want to understand your visa options?
            </h2>
            <p className="text-sm font-bold text-center leading-tight mb-10">
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
