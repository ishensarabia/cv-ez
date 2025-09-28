import { ChevronDown } from "lucide-react";

function FormAccordion({ label, _icon, isActive, onShow, children }) {
  let accordionState = isActive ? "expanded" : "collapsed";

  function handleToggle() {
    console.log("Toggling accordion for:", label);
    if (isActive) {
      onShow(null);
    } else {
      onShow(label);
    }
  }

  return (
    <div className={`form-accordion ${accordionState}`}>
      <button className="label-button" onClick={handleToggle}>
        <_icon size={16}/>
        <div className="label">{label}</div>
        <div className="arrow">
          <ChevronDown />
        </div>
      </button>
      
      <div className="accordion-content" style={{ display: isActive ? 'grid' : 'none' }}>
        {children}
      </div>
    </div>
  );
}

export default FormAccordion;