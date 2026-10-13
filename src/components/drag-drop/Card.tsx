import type { Tasks, ColumnType } from "./types";

interface Props {
  task: Tasks;
  index: number;
  columnId: ColumnType;
  onDragStart: (taskId: string, columnId: ColumnType, index: number) => void;
  onDrop: (targetColumnId: ColumnType, index: number) => void;
}

const TaskCard = ({ task, index, columnId, onDragStart, onDrop }: Props) => {
  return (
    <li
      draggable
      onDragStart={() => onDragStart(task.id, columnId, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(columnId, index)}
      aria-label={`Task: ${task.title}`}
      className="task-card"
    >
      {task.title}
    </li>
  );
};

export default TaskCard;
