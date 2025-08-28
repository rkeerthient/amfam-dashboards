export interface Dashboard {
  description?: string;
  name: string;
  tasks: Task[];
}

export interface Task {
  name: string;
  description?: string;
  field: string;
}

export interface CompProps {
  fieldName: string;
}

export interface FieldCompletionProps {
  name: string;
  field: string;
  description?: string;
}
