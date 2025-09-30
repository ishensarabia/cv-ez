import FormAccordion from "./FormAccordion";
import { User } from "lucide-react";
import Input from "./Input";

function PersonalInformationForm({ data, setData, isActive, onShow }) {
  function handleOnChange(property, e) {
    setData({ [property]: e.target.value });
  }

  return (
    <FormAccordion
      label="Personal Information"
      _icon={User}
      isActive={isActive}
      onShow={onShow}
    >
      <div className="form" id="personal-information-form">
        <div className="full-name-container">
          <Input
            label="First Name"
            value={data.firstName}
            onChange={(e) => handleOnChange("firstName", e)}
            type="text"
          />
          <Input
            label="Last Name"
            value={data.lastName}
            onChange={(e) => handleOnChange("lastName", e)}
            type="text"
          />
          <Input
            label="Middle Name"
            value={data.middleName}
            onChange={(e) => handleOnChange("middleName", e)}
            type="text"
          />
        </div>
        <Input
          label="Job Title"
          value={data.jobTitle}
          onChange={(e) => handleOnChange("jobTitle", e)}
          type="text"
        />
        <Input
          label="Email"
          value={data.email}
          onChange={(e) => handleOnChange("email", e)}
          type="email"
        />
        <Input
          label="Phone Number"
          value={data.phoneNumber}
          onChange={(e) => handleOnChange("phoneNumber", e)}
          type="tel"
        />
      </div>
    </FormAccordion>
  );
}

export default PersonalInformationForm;