// import { useState, type DragEvent } from "react";

// /**
//  * KANBAN BOARD — Native HTML5 Drag and Drop (no libraries)
//  * Built as an SDE-2 machine-coding interview practice reference.
//  *
//  * WHAT THIS DEMONSTRATES:
//  * 1. State shape: a single source of truth, keyed by column id
//  * 2. HTML5 DnD events: onDragStart, onDragOver, onDrop, onDragEnd
//  * 3. The classic trap: onDragOver MUST call e.preventDefault(),
//  *    otherwise onDrop never fires at all (browser default is "no drop allowed")
//  * 4. Correct handling of: same-column drop (no-op), cross-column drop,
//  *    dropping into an empty column, and reordering within a column
//  * 5. Immutable state updates (never mutate arrays/objects directly)
//  *
//  * WHAT'S DELIBERATELY LEFT OUT (a real interview usually won't ask for these
//  * unless it's a follow-up question):
//  * - Keyboard accessibility (a real app should have this — see @dnd-kit in
//  *   production code — but most timed rounds don't expect it)
//  * - Persistence (localStorage / API calls) — often a follow-up question,
//  *   see the comment at the bottom for how you'd extend this
//  * - Animations / drag preview polish
//  */

// // ---- Initial data shape -------------------------------------------------
// // Single object: { columnId: Task[] }
// // This is the state shape to reach for in an interview — simple, and every
// // drag operation is just "remove from one array, insert into another"
// interface Task {
//   id: string;
//   title: string;
// }

// type ColumnId = "todo" | "inProgress" | "done";
// type Columns = Record<ColumnId, Task[]>;

// interface DraggedTask {
//   taskId: string;
//   sourceColumnId: ColumnId;
// }

// const initialColumns: Columns = {
//   todo: [
//     { id: "t1", title: "Set up project structure" },
//     { id: "t2", title: "Design database schema" },
//   ],
//   inProgress: [{ id: "t3", title: "Build login page" }],
//   done: [{ id: "t4", title: "Write project README" }],
// };

// const COLUMN_LABELS: Record<ColumnId, string> = {
//   todo: "To Do",
//   inProgress: "In Progress",
//   done: "Done",
// };

// export default function KanbanBoard() {
//   const [columns, setColumns] = useState<Columns>(initialColumns);
//   const [draggedTask, setDraggedTask] = useState<DraggedTask | null>(null);
//   const [dragOverColumn, setDragOverColumn] = useState<ColumnId | null>(null);

//   function handleDragStart(taskId: string, sourceColumnId: ColumnId) {
//     setDraggedTask({ taskId, sourceColumnId });
//   }

//   function handleDragOver(e: DragEvent<HTMLDivElement>, columnId: ColumnId) {
//     e.preventDefault();
//     setDragOverColumn(columnId);
//   }

//   function handleDragLeave() {
//     setDragOverColumn(null);
//   }

//   function handleDrop(targetColumnId: ColumnId) {
//     if (!draggedTask) return;

//     const { taskId, sourceColumnId } = draggedTask;

//     if (sourceColumnId === targetColumnId) {
//       setDraggedTask(null);
//       setDragOverColumn(null);
//       return;
//     }

//     setColumns((prev) => {
//       const sourceTasks = prev[sourceColumnId];
//       const taskToMove = sourceTasks.find((task) => task.id === taskId);

//       if (!taskToMove) return prev;

//       return {
//         ...prev,
//         [sourceColumnId]: sourceTasks.filter((task) => task.id !== taskId),
//         [targetColumnId]: [...prev[targetColumnId], taskToMove],
//       };
//     });

//     setDraggedTask(null);
//     setDragOverColumn(null);
//   }

//   function handleDragEnd() {
//     setDraggedTask(null);
//     setDragOverColumn(null);
//   }

//   const columnIds = Object.keys(columns) as ColumnId[];

//   return (
//     <div style={{ display: "flex", gap: "16px", padding: "24px", fontFamily: "system-ui, sans-serif" }}>
//       {columnIds.map((columnId) => (
//         <div
//           key={columnId}
//           onDragOver={(e) => handleDragOver(e, columnId)}
//           onDragLeave={handleDragLeave}
//           onDrop={() => handleDrop(columnId)}
//           style={{
//             flex: 1,
//             minWidth: "220px",
//             background: dragOverColumn === columnId ? "#eef2ff" : "#f8f9fa",
//             border: "1px solid #e2e2e2",
//             borderRadius: "8px",
//             padding: "12px",
//             transition: "background 0.15s ease",
//           }}
//         >
//           <div style={{ fontWeight: 600, marginBottom: "10px", fontSize: "14px" }}>
//             {COLUMN_LABELS[columnId]} ({columns[columnId].length})
//           </div>

//           {columns[columnId].map((task) => (
//             <div
//               key={task.id}
//               draggable
//               onDragStart={() => handleDragStart(task.id, columnId)}
//               onDragEnd={handleDragEnd}
//               style={{
//                 background: "white",
//                 border: "1px solid #ddd",
//                 borderRadius: "6px",
//                 padding: "10px",
//                 marginBottom: "8px",
//                 cursor: "grab",
//                 fontSize: "13px",
//                 opacity: draggedTask?.taskId === task.id ? 0.4 : 1,
//               }}
//             >
//               {task.title}
//             </div>
//           ))}

//           {columns[columnId].length === 0 && (
//             <div style={{ fontSize: "12px", color: "#999", padding: "8px 0" }}>
//               Drop a task here
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import React from "react";
import type { ColumnInterface, ColumnType, DragData } from "./types";
import "./kanban.css";
import KanbanBoardColumn from "./Column";

const initialData: ColumnInterface[] = [
  {
    id: "todo",
    title: "TO DO",
    tasks: [
      {
        id: "1",
        title: "task A",
      },
      {
        id: "2",
        title: "task B",
      },
    ],
  },
  {
    id: "inprogress",
    title: "IN PROGRESS",
    tasks: [
      {
        id: "3",
        title: "task C",
      },
    ],
  },
  {
    id: "done",
    title: "DONE",
    tasks: [
      {
        id: "4",
        title: "task D",
      },
    ],
  },
];

const KanbanBoard = () => {
  const [columns, setColumns] = React.useState<ColumnInterface[]>(initialData);

  const dragDataRef = React.useRef<DragData | null>(null);

  const handleDragStart = (
    taskId: string,
    sourceColumnId: ColumnType,
    index: number,
  ) => {
    dragDataRef.current = {
      taskId,
      sourceColumnId,
      sourceIndex: index,
    };
    console.log(taskId, sourceColumnId, dragDataRef, "REF");
  };

  const handleDrop = (targetColumnId: ColumnType, targetIndex: number) => {
    const dragData = dragDataRef.current;
    if (!dragData) return;

    // console.log(dragData, "dragData ref");

    // console.log(targetColumnId, "targetColumnId");
    // if (dragData.sourceColumnId === targetColumnId) return;

    const sourceCol = columns.find((x) => x.id === dragData.sourceColumnId);
    const task = sourceCol?.tasks.find((x) => x.id === dragData.taskId);

    if (!task) return;

    let sameColumn = dragData.sourceColumnId === targetColumnId;

    if (sameColumn) {
      // reorder logic
      let updatedTasks =
        sourceCol?.tasks.filter((x) => x.id !== dragData.taskId) || [];

      let leftPart = updatedTasks.slice(0, targetIndex);

      let rightPart = updatedTasks.slice(targetIndex);

      let reorderedTasks = [...leftPart, task, ...rightPart];

      setColumns((prev) => {
        return prev.map((item) => {
          if (item.id === targetColumnId) {
            return {
              ...item,
              tasks: reorderedTasks,
            };
          }
          return item;
        });
      });
    } else {
      // move across columns
      setColumns((prev) => {
        return prev.map((item) => {
          if (item.id === dragData.sourceColumnId) {
            return {
              ...item,
              tasks: item.tasks.filter((x) => x.id !== dragData.taskId),
            };
          }
          if (item.id === targetColumnId) {
            return {
              ...item,
              tasks: [...item.tasks, task],
            };
          }
          return item;
        });
      });
    }
  };

  return (
    <main className="column-container">
      {columns.map((col) => (
        <KanbanBoardColumn
          key={col.id}
          column={col}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </main>
  );
};

export default KanbanBoard;
