import { useState } from "react";
import FormAccordion from "./FormAccordion";
import Input from "./Input";
import TextCanvas from "./TextCanvas";

function WorkExperienceForm({ data, setData, isActive, onShow }) {
  const [formState, setFormState] = useState(
    data || {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }
  );

  function handleChange(field) {
    return function (e) {
      const newState = { ...formState, [field]: e.target.value };
      setFormState(newState);
      setData(newState);
    };
  }

  return (
    <FormAccordion
      label="Work Experience"
      _icon={() => <i className="fas fa-briefcase"></i>}
      isActive={isActive}
      onShow={onShow}
    >
      <div className="work-experience-form">
        <Input
          label="Company"
          type="text"
          value={formState.company}
          onChange={handleChange("company")}
        />
        <Input
          label="Position"
          type="text"
          value={formState.position}
          onChange={handleChange("position")}
        />
        <Input
          label="Start Date"
          type="date"
          value={formState.startDate}
          onChange={handleChange("startDate")}
        />
        <Input
          label="End Date"
          type="date"
          value={formState.endDate}
          onChange={handleChange("endDate")}
        />
        <TextCanvas
          label="Description"
          value={formState.description}
          onChange={handleChange("description")}
        />
      </div>
    </FormAccordion>
  );
}

export default WorkExperienceForm;
