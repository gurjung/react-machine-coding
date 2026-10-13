export type ColumnType = "todo" | "inprogress" | "done";

export type Tasks = {
  id: string;
  title: string;
};

export interface ColumnInterface {
  id: ColumnType;
  title: string;
  tasks: Tasks[];
}

export interface DragData {
  taskId: string;
  sourceColumnId: ColumnType;
  sourceIndex: number;
}
