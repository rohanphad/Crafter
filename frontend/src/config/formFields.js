const introFormFields = [
  {
    type: "image",
    name: "profilePic",
    label: "Profile Picture",
    value: "",
  },
  { type: "text", name: "name", label: "Name", value: "John Doe" },
  {
    type: "text",
    name: "shortDesc",
    label: "Short Description",
    value: "A short description goes here.",
  },
  {
    type: "textArea",
    name: "longDesc",
    label: "Long Description",
    value: "A long description goes here.",
  },
];

const intro2FormFields = [
  ...introFormFields,

  {
    type: "text",
    name: "tagline",
    label: "Tagline",
    value: "Transforming Your Ideas into Reality",
  },
];

const projectsFormFields = [
  {
    type: "list",
    name: "list",
    itemTemplate: [
      {
        type: "text",
        name: "name",
        label: "Project Name",
        value: "Name of the Project",
      },
      {
        type: "textArea",
        name: "desc",
        label: "Project Description",
        value: "Description of the Project",
      },
    ],
  },
];

const skillsFormFields = [
  {
    type: "list",
    name: "list",
    itemTemplate: [
      {
        type: "text",
        name: "name",
        label: "Skill Name",
        value: "Name of the Skill",
      },
    ],
  },
];

const achievmentsFormFields = [
  {
    type: "list",
    name: "list",
    itemTemplate: [
      {
        type: "text",
        name: "name",
        label: "Achievment Name",
        value: "Name of the Achievment",
      },
      {
        type: "textArea",
        name: "desc",
        label: "Achievment Description",
        value: "Description of the Achievment",
      },
    ],
  },
];

const contactFormFields = [
  {
    type: "text",
    name: "contactNum",
    label: "Contact Number",
    value: "+0-1234567890",
  },
];

const formFields = {
  "NavTemp-1": [],
  "IntroTemp-1": introFormFields,
  "ProjectTemp-1": projectsFormFields,
  "SkillsTemp-1": skillsFormFields,
  "AchievTemp-1": achievmentsFormFields,
  "ContactTemp-1": contactFormFields,
  "NavTemp-2": [],
  "IntroTemp-2": intro2FormFields,
};

export default formFields;
