export const schema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      title: "First Name",
      errorMessage: "First Name is required.",
    },
    lastName: {
      type: "string",
      minLength: 1,
      title: "Last Name",
      errorMessage: "Last Name is required.",
    },
    email: {
      type: "string",
      format: "email",
      title: "Email",
      errorMessage: "A valid email address is required.",
    },
    countryOfCitizenship: {
      type: "string",
      minLength: 1,
      title: "Country of Citizenship",
      errorMessage: "Country of Citizenship is required.",
    },
    profile: {
      type: "string",
      minLength: 1,
      title: "LinkedIn / Personal Website URL",
      errorMessage: "Profile URL is required.",
    },
    visas: {
      type: "array",
      label: "Visa Categories of Interest",
      title: "Visa Categories of Interest",
      items: {
        type: "string",
        enum: ["O-1", "EB-1A", "EB-2 NIW", "I don't know"],
      },
      uniqueItems: true,
      errorMessage: "Please select at least one visa.",
    },
    resume: {
      type: "string",
      title: "Resume / CV (File Upload)",
      errorMessage: "Resume is required.",
    },
    openInput: {
      type: "string",
      title: "How can we help you?",
      errorMessage: "This field is required.",
    },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "countryOfCitizenship",
    "profile",
    "visas",
    "resume",
    "openInput",
  ],
};

export const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/firstName",
    },
    {
      type: "Control",
      scope: "#/properties/lastName",
    },
    {
      type: "Control",
      scope: "#/properties/email",
    },
    {
      type: "Control",
      scope: "#/properties/countryOfCitizenship",
    },
    {
      type: "Control",
      scope: "#/properties/profile",
    },
    {
      type: "Control",
      scope: "#/properties/visas",
      options: {
        format: "checkbox",
      },
    },
    {
      type: "Control",
      scope: "#/properties/resume",
      label: "Upload Your Resume / CV",
    },
    {
      // TODO: Textarea isn't rendering with label and placeholder correctly.
      type: "Control",
      scope: "#/properties/openInput",
      label: "How can we help you?",
      options: {
        multiline: true,
        rows: 5,
        placeholder:
          "What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?",
      },
    },
  ],
};
