import React, { useState } from "react";
import "./Accordion.css";
import AccordionItem from "./AccordionItem";

type DataType = {
  id: string;
  title: string;
  description: string;
};

const initialData: DataType[] = [
  {
    id: "1",
    title: "title 1",
    description: "asdklfhsdkhfalks",
  },
  {
    id: "2",
    title: "title 2",
    description: "asdklfhsdkhfalks",
  },
  {
    id: "3",
    title: "title 3",
    description: "asdklfhsdkhfalks",
  },
];

const Accordion = () => {
  const [list, setList] = useState(initialData);

  const [tracking, setTracking] = useState<string[]>([]);

  console.log(tracking, "tracking");

  const onClick = (id: string) => {
    // setTracking((prev) =>
    //   prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    // );
    setTracking((prev) => (prev.includes(id) ? [] : [id]));
  };

  return (
    <main className="accordion">
      <ul className="list-container">
        {list.map((item) => {
          let isExpanded = tracking.includes(item.id);
          return (
            <AccordionItem
              key={item.id}
              item={item}
              onClick={onClick}
              isExpanded={isExpanded}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default Accordion;
