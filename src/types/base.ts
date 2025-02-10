export interface Position {
  x: number;
  y: number;
}

export interface SlaDuration {
  number: number;
  unit: string;
}

export interface Data {
  id: string;
  component_key: string;
  component_type: string;
  component_id: string;
  name: string;
  prerequisites: string[];
  permitted_roles: string[];
  input_mapping: Record<string, string>;
  sla_duration: SlaDuration;
  approval_required: boolean;
  approval_roles: string[];
  form: FieldSchemaProperties;
}

export interface Node {
  id: string;
  type: string;
  position: Position;
  data: Data;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface FieldSchemaProperties {
  [key: string]: {
    avantos_type: string;
    title?: string;
    type: string;
    items?: {
      enum: string[];
      type: string;
    };
    format?: string;
    enum?: string[];
    data?: {
      inherited: boolean;
      source: string;
      field: string;
    };
  };
}

export interface FieldSchema {
  type: string;
  properties: FieldSchemaProperties;
  required: string[];
}

export interface UiSchemaElement {
  type: string;
  scope: string;
  label: string;
  options?: {
    format: string;
  };
}

export interface UiSchema {
  type: string;
  elements: UiSchemaElement[];
}

export interface DynamicFieldConfig {
  [key: string]: {
    selector_field: string;
    payload_fields: {
      [key: string]: {
        type: string;
        value: string;
      };
    };
    endpoint_id: string;
  };
}

export interface Form {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: FieldSchema;
  ui_schema: UiSchema;
  dynamic_field_config: DynamicFieldConfig;
}

export interface ActionBlueprintGraphDescription {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: Node[];
  edges: Edge[];
  forms: Form[];
  branches: string[];
  triggers: string[];
}
