const REGEX = {
  name: /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/,
  gender: /.+/,
  birth: /^[0-9]{2}(0[1-9]|1[0-2])(0[0-9]|1[0-9]|2[0-9]|3[0-1])$/,
  email: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  address: /.+/,
  tel: /^010([0-9]{3,4})([0-9]{4})$/,
  experience: /.+/,
  current_job_state: /.+/,
  position: /.+/,
  purpose: /.+/,
  agreement: /.+/,
};
export default REGEX;
