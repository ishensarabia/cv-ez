import { useState } from "react";
import { ChevronDown, DeleteIcon, Edit2Icon, CheckIcon, XIcon } from "lucide-react";

function ItemAccordion({ label, children, isActive, onShow, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);
  let accordionState = isActive ? "expanded" : "collapsed";

  function handleToggle() {
    if (!isEditing) {
      if (isActive) {
        onShow(null);
      } else {
        onShow(label);
      }
    }
  }

  function handleSave() {
    onEdit(editedLabel);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedLabel(label);
    setIsEditing(false);
  }

  return (
    <div className={"item-accordion " + accordionState}>
      <div className="accordion-header">
        <button className="label-button" onClick={handleToggle}>
          {isEditing ? (
            <input
              type="text"
              value={editedLabel}
              onChange={(e) => setEditedLabel(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <div className="label">{label}</div>
          )}
          <div className="arrow">
            <ChevronDown />
          </div>
        </button>
        <div className="action-buttons">
          {isEditing ? (
            <>
              <button
                className="save-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
              >
                <CheckIcon size={16} />
              </button>
              <button
                className="cancel-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
              >
                <XIcon size={16} />
              </button>
            </>
          ) : (
            <button
              className="edit-button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Edit2Icon size={16} />
            </button>
          )}
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(label);
            }}
          >
            <DeleteIcon size={16} />
          </button>
        </div>
      </div>

      <div
        className="accordion-content"
        style={{ display: isActive ? "block" : "none" }}
      >
        {children}
      </div>
    </div>
  );
}

export default ItemAccordion;