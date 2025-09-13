import { ChevronDown, DeleteIcon } from "lucide-react";

function ItemAccordion({ label, children, isActive, onShow, onDelete }) {
  let accordionState = isActive ? "expanded" : "collapsed";

  function handleToggle() {
    if (isActive) {
      onShow(null);
    } else {
      onShow(label);
    }
  }

  return (
    <div className={"item-accordion " + accordionState}>
      <button className="label-button" onClick={handleToggle}>
        <div className="label">{label}</div>
        <div className="actions">
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(label);
            }}
          >
            <DeleteIcon />
          </button>
          <div className="arrow">
            <ChevronDown />
          </div>
        </div>
      </button>

      {children}
    </div>
  );
}

export default ItemAccordion;
