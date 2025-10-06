import { useState } from "react";
import FormAccordion from "./FormAccordion";
import Input from "./Input";
import TextCanvas from "./TextCanvas";
import { Book } from "lucide-react";

const initialcurrentEducation = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  description: "",
};

function EducationForm({ data, setData, isActive, onShow }) {
  const [currentEducation, setcurrentEducation] = useState(
    initialcurrentEducation
  );
  const [errors, setErrors] = useState({});

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
    setcurrentEducation(initialcurrentEducation);
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
          label="Field of Study"
          type="text"
          value={currentEducation.fieldOfStudy}
          onChange={handleChange("fieldOfStudy")}
          error={errors.fieldOfStudy}
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
          required
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
    </FormAccordion>
  );
}

export default EducationForm;
