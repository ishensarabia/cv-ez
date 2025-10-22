import { useState } from "react";
import FormAccordion from "./FormAccordion";
import ItemAccordion from "./ItemAccordion";
import Input from "./Input";
import TextCanvas from "./TextCanvas";
import { Book, Edit3Icon } from "lucide-react";

const initialCurrentEducation = {
  id: Date.now(),
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  description: "",
};

function EducationForm({ data, setData, isActive, onShow }) {
  const [currentEducation, setcurrentEducation] = useState(
    initialCurrentEducation
  );
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);

  const [EditingIndex, setEditingIndex] = useState(null);
  const [EditingFields, setEditingFields] = useState(initialCurrentEducation);

  const [errors, setErrors] = useState({});

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

  function handleChange(field) {
    return function (e) {
      setcurrentEducation((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // clear error for the field on change
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    };
  }

  function validateEducation(education) {
    const newErrors = {};
    if (!education.institution.trim()) {
      newErrors.institution = "Institution name is required";
    }
    if (!education.degree.trim()) {
      newErrors.degree = "Degree is required";
    }
    if (!education.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!education.description.trim()) {
      newErrors.description = "Description is required";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validateEducation(currentEducation);

    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      setErrors(errors);
      return;
    }

    // If no errors, you can proceed to add the education entry
    setData([...data, { ...currentEducation, id: Date.now() }]);
    setcurrentEducation(initialCurrentEducation);
    setErrors({});
  }

  return (
    <FormAccordion
      label="Education"
      _icon={Book}
      isActive={isActive}
      onShow={onShow}
    >
      <form className="education-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Institution"
          type="text"
          value={currentEducation.institution}
          onChange={handleChange("institution")}
          error={errors.institution}
          required
        />
        <Input
          label="Degree"
          type="text"
          value={currentEducation.degree}
          onChange={handleChange("degree")}
          error={errors.degree}
          required
        />
        <Input
          label="Start Date"
          type="date"
          value={currentEducation.startDate}
          onChange={handleChange("startDate")}
          error={errors.startDate}
          required
        />
        <Input
          label="End Date"
          type="date"
          value={currentEducation.endDate}
          onChange={handleChange("endDate")}
          error={errors.endDate}
        />
        <TextCanvas
          label="Description"
          value={currentEducation.description}
          onChange={handleChange("description")}
          placeholder="Briefly describe your studies, achievements, or relevant coursework."
          error={errors.description}
          required
        />
        <button type="submit" className="add-button">
          Add Education
        </button>
      </form>

      {data.length > 0 && (
        <div className="education-list">
          {data.map((education, index) => (
            <ItemAccordion
              key={education.id || index}
              label={`${education.degree} at ${education.institution}`}
              isActive={activeExperienceIndex === index}
              onShow={() =>
                setActiveExperienceIndex(
                  index === activeExperienceIndex ? null : index
                )
              }
              onEdit={() => {
                startEdit(index);
              }}
              onDelete={() => {
                const newData = data.filter((_, i) => i !== index);
                setData(newData);
                if (activeExperienceIndex === index || newData.length === 0) {
                  setActiveExperienceIndex(null);
                }
                else if (activeExperienceIndex > index) {
                  setActiveExperienceIndex(activeExperienceIndex - 1);
                }
              }}
            >
              {(isEditing, toggleEdit) =>
                isEditing ? (
                  <form
                    className="edit-education-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const newData = [...data];
                      newData[EditingIndex] = { ...EditingFields };
                      setData(newData);
                      setEditingIndex(null);
                    }}
                  >
                    <Input
                      label="Institution"
                      type="text"
                      value={EditingFields.institution}
                      onChange={(e) =>
                        handleFieldChange("institution", e.target.value)
                      }
                      required
                    />
                    <Input
                      label="Degree"
                      type="text"
                      value={EditingFields.degree}
                      onChange={(e) =>
                        handleFieldChange("degree", e.target.value)
                      }
                      required
                    />
                    <Input
                      label="Start Date"
                      type="date"
                      value={EditingFields.startDate}
                      onChange={(e) =>
                        handleFieldChange("startDate", e.target.value)
                      }
                      required
                    />
                    <Input
                      label="End Date"
                      type="date"
                      value={EditingFields.endDate}
                      onChange={(e) =>
                        handleFieldChange("endDate", e.target.value)
                      }
                    />
                    <TextCanvas
                      label="Description"
                      value={EditingFields.description}
                      onChange={(e) =>
                        handleFieldChange("description", e.target.value)
                      }
                      required
                    />
                    <div className="form-buttons">
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => {
                          startEdit(index);
                          toggleEdit();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="save-button"
                        onClick={toggleEdit}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="education-details">
                    <p>
                      <strong>Institution:</strong> {education.institution}
                    </p>
                    <p>
                      <strong>Degree:</strong> {education.degree}
                    </p>
                    <p>
                      <strong>Duration:</strong> {education.startDate} to{" "}
                      {education.endDate || "Present"}
                    </p>
                    <p>
                      <strong>Description:</strong> {education.description}
                    </p>
                    <button
                      className="edit-button"
                      onClick={() => {
                        startEdit(index);
                        toggleEdit();
                      }}
                    >
                      <Edit3Icon size={16} />
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

export default EducationForm;
