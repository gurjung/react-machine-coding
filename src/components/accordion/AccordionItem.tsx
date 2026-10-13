import React from "react";

interface ItemProps {
  item: {
    title: string;
    description: string;
    id: string;
  };
  onClick: (id: string) => void;
  isExpanded: boolean;
}

const AccordionItem = (props: ItemProps) => {
  return (
    <li className="list-item">
      <header className="list-item-top">
        <h3 id={`heading-${props.item.id}`}>{props.item.title}</h3>
        <button
          onClick={() => props.onClick(props.item.id)}
          aria-expanded={props.isExpanded}
          aria-controls={`panel-${props.item.id}`}
        >
          {props.isExpanded ? "-" : "+"}
        </button>
      </header>
      <div
        id={`panel-${props.item.id}`}
        className={`list-item-bottom ${props.isExpanded ? "expanded" : ""}`}
        aria-hidden={!props.isExpanded}
        aria-labelledby={`heading-${props.item.id}`}
      >
        {props.item.description}
      </div>
    </li>
  );
};

export default AccordionItem;
