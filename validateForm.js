import REGEX from "./regex.js";
import ALERT_MESSAGE from "./message.js";

const validateForm = (formData) => {
  for (let key in formData) {
    if (!REGEX[key].test(formData[key])) {
      alert(ALERT_MESSAGE[key]);
      return false;
    }
  }
  return true;
};

export default validateForm;
