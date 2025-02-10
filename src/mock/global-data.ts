export const GLOBAL_DATA = {
  ACTION_PROPERTIES: {
    name: "Action Properties",
    data: {
      button: {
        avantos_type: "button",
        title: "Button",
        type: "object",
      },
      dynamic_checkbox_group: {
        avantos_type: "checkbox-group",
        items: {
          enum: ["foo", "bar", "foobar"],
          type: "string",
        },
        type: "array",
        uniqueItems: true,
      },
      dynamic_object: {
        avantos_type: "object-enum",
        enum: null,
        title: "Dynamic Object",
        type: "object",
      },
      email: {
        avantos_type: "short-text",
        format: "email",
        title: "Email",
        type: "string",
      },
      id: {
        avantos_type: "short-text",
        title: "ID",
        type: "string",
      },
      multi_select: {
        avantos_type: "multi-select",
        items: {
          enum: ["foo", "bar", "foobar"],
          type: "string",
        },
        type: "array",
        uniqueItems: true,
      },
      name: {
        avantos_type: "short-text",
        title: "Name",
        type: "string",
      },
      notes: {
        avantos_type: "multi-line-text",
        title: "Notes",
        type: "string",
      },
    },
  },
  CLIENT_ORG_PROPERTIES: {
    name: "Client Organization Properties",
    data: {
      button: {
        avantos_type: "button",
        title: "Button",
        type: "object",
      },
      dynamic_checkbox_group: {
        avantos_type: "checkbox-group",
        items: {
          enum: ["foo", "bar", "foobar"],
          type: "string",
        },
        type: "array",
        uniqueItems: true,
      },
      dynamic_object: {
        avantos_type: "object-enum",
        enum: null,
        title: "Dynamic Object",
        type: "object",
      },
      email: {
        avantos_type: "short-text",
        format: "email",
        title: "Email",
        type: "string",
      },
      id: {
        avantos_type: "short-text",
        title: "ID",
        type: "string",
      },
      multi_select: {
        avantos_type: "multi-select",
        items: {
          enum: ["foo", "bar", "foobar"],
          type: "string",
        },
        type: "array",
        uniqueItems: true,
      },
      name: {
        avantos_type: "short-text",
        title: "Name",
        type: "string",
      },
      notes: {
        avantos_type: "multi-line-text",
        title: "Notes",
        type: "string",
      },
    },
  },
};
