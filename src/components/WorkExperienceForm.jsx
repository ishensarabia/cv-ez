import { useState } from "react";
import FormAccordion from "./FormAccordion";
import Input from "./Input";
import TextCanvas from "./TextCanvas";
import { BriefcaseBusinessIcon } from "lucide-react";

const emptyExperience = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
};

function WorkExperienceForm({ data = [], setData, isActive, onShow }) {
  const [currentExperience, setCurrentExperience] = useState(emptyExperience);
  const [errors, setErrors] = useState({});

  function handleChange(field) {
    return function (e) {
      setCurrentExperience((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // clear error for the field on change
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    };
  }

  function validateExperience(experience) {
    const newErrors = {};
    if (!experience.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!experience.position.trim()) {
      newErrors.position = "Position is required";
    }
    if (!experience.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!experience.description.trim()) {
      newErrors.description = "Description is required";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validateExperience(currentExperience);

    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      setErrors(errors);
      return;
    }
    setData([...data, currentExperience]);
    setCurrentExperience(emptyExperience);
    setErrors({});
  }

  return (
    <FormAccordion
      label="Work Experience"
      _icon={BriefcaseBusinessIcon}
      isActive={isActive}
      onShow={onShow}
    >
      <form onSubmit={handleSubmit} className="work-experience-form" noValidate>
        <Input
          label="Company"
          type="text"
          value={currentExperience.company}
          onChange={handleChange("company")}
          error={errors.company}
          required
        />
        <Input
          label="Position"
          type="text"
          value={currentExperience.position}
          onChange={handleChange("position")}
          error={errors.position}
          required
        />
        <Input
          label="Start Date"
          type="date"
          value={currentExperience.startDate}
          onChange={handleChange("startDate")}
          error={errors.startDate}
          required
        />
        <Input
          label="End Date"
          type="date"
          value={currentExperience.endDate}
          onChange={handleChange("endDate")}
          error={errors.endDate}
        />
        <TextCanvas
          label="Description"
          value={currentExperience.description}
          onChange={handleChange("description")}
          placeholder="Describe your role and achievements"
          error={errors.description}
          required
        />
        <button type="submit" className="add-button">
          Add Experience
        </button>
      </form>

      {data.length > 0 && (
        <div className="experiences-list">
          {data.map((experience, index) => (
            <div key={index} className="experience-item">
              <h3>{experience.company}</h3>
              <p>{experience.position}</p>
              {/* Add edit/delete functionality here */}
            </div>
          ))}
        </div>
      )}
    </FormAccordion>
  );
}

export default WorkExperienceForm;
