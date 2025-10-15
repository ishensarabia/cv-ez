import { useState } from "react";
import FormAccordion from "./FormAccordion";
import ItemAccordion from "./ItemAccordion";
import Input from "./Input";
import TextCanvas from "./TextCanvas";
import { BriefcaseBusinessIcon } from "lucide-react";

const emptyExperience = {
  id: Date.now(),
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
};

function WorkExperienceForm({ data = [], setData, isActive, onShow }) {
  const [currentExperience, setCurrentExperience] = useState(emptyExperience);
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingFields, setEditingFields] = useState(emptyExperience);

  function startEdit(index) {
    setEditingIndex(index);
    setEditingFields({ ...data[index] });
  }

  function handleFieldChange(field, value) {
    setEditingFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function saveEdit() {
    const newData = [...data];
    newData[editingIndex] = editingFields;
    setData(newData);
    setEditingIndex(null);
    setEditingFields(null);
  }

  function handleChange(field) {
    return function (e) {
      console.log(e.target.value);
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
      setErrors(errors);
      return;
    }
    setData([...data, { ...currentExperience, id: Date.now() }]);
    setCurrentExperience(emptyExperience);
    setErrors({});
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    const errors = validateExperience(currentExperience);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const newData = data.map((exp, index) =>
      index === activeExperienceIndex ? currentExperience : exp
    );
    setData(newData);
    setCurrentExperience(emptyExperience);
    setErrors({});
    setActiveExperienceIndex(null);
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
            <ItemAccordion
              key={experience.id || index} // Use id as key
              label={`${experience.position} at ${experience.company}`}
              isActive={activeExperienceIndex === index}
              onShow={() =>
                setActiveExperienceIndex(
                  index === activeExperienceIndex ? null : index
                )
              }
              onDelete={() => {
                console.log("Deleting index", index);
                console.log("Current data", data);
                const newData = data.filter((_, i) => i !== index);
                setData(newData);
                console.log("New data", newData);
                if (activeExperienceIndex === index || newData.length === 0) {
                  setActiveExperienceIndex(null);
                } else if (activeExperienceIndex > index) {
                  setActiveExperienceIndex(activeExperienceIndex - 1);
                }
              }}
              onEdit={() => startEdit(index)}
            >
              {(isEditing, toggleEdit) =>
                isEditing ? (
                  <form
                    onSubmit={handleEditSubmit}
                    className="edit-experience-form"
                    noValidate
                  >
                    <Input
                      label="Company"
                      type="text"
                      value={editingFields.company}
                      onChange={(e) =>
                        handleFieldChange("company", e.target.value)
                      }
                      error={errors.company}
                      required
                    />
                    <Input
                      label="Position"
                      type="text"
                      value={editingFields.position}
                      onChange={(e) =>
                        handleFieldChange("position", e.target.value)
                      }
                      error={errors.position}
                      required
                    />
                    <Input
                      label="Start Date"
                      type="date"
                      value={editingFields.startDate}
                      onChange={(e) =>
                        handleFieldChange("startDate", e.target.value)
                      }
                      error={errors.startDate}
                      required
                    />
                    <Input
                      label="End Date"
                      type="date"
                      value={editingFields.endDate}
                      onChange={(e) =>
                        handleFieldChange("endDate", e.target.value)
                      }
                      error={errors.endDate}
                    />
                    <TextCanvas
                      label="Description"
                      value={editingFields.description}
                      onChange={(e) =>
                        handleFieldChange("description", e.target.value)
                      }
                      placeholder="Describe your role and achievements"
                      error={errors.description}
                      required
                    />
                    <button
                      type="submit"
                      className="save-button"
                      onClick={() => {
                        toggleEdit();
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => {
                        setCurrentExperience(emptyExperience);
                        setErrors({});
                        toggleEdit();
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div className="experience-details">
                    <h3>{experience.position}</h3>
                    <p className="company">{experience.company}</p>
                    <p className="dates">
                      {experience.startDate} - {experience.endDate || "Present"}
                    </p>
                    <p className="description">{experience.description}</p>
                    <button
                      className="edit-button"
                      onClick={() => {
                        startEdit(index);
                        toggleEdit();
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )
              }
            </ItemAccordion>
          ))}
        </div>
      )}
    </FormAccordion>
  );
}

export default WorkExperienceForm;
