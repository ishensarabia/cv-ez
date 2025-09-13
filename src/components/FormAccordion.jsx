import { ChevronDown } from "lucide-react";

function FormAccordion({ label, _icon, isActive, onShow, children }) {
  let accordionState = isActive ? "expanded" : "collapsed";

  function handleToggle() {
    if (isActive) {
      onShow(null);
    } else {
      onShow(label);
    }
  }

  return (
    <div className={"form-accordion" + accordionState}>
      <button className="label-button" onClick={handleOnClick}>
        <_icon />
        <div className="label">{label}</div>
        <div className="arrow">
          <ChevronDown />
        </div>
      </button>

      {children}
    </div>
  );
}

export default FormAccordion;