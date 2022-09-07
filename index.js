import validateForm from "./validateForm.js";

const name = document.getElementById("name");
const gender = Array.from(document.querySelectorAll('input[name="gender"]'));
const birth = document.querySelector("#birth");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const detail_address = document.querySelector("#detail-address");
const tel = document.querySelector("#tel");
const experience = Array.from(
  document.querySelectorAll('input[name="experience"]')
);
const current_job_state = Array.from(
  document.querySelectorAll('input[name="current_job_state"]')
);
const position = Array.from(
  document.querySelectorAll('input[name="position"]')
);
const purpose = Array.from(document.querySelectorAll('input[name="purpose"]'));
const privacy_policy = document.querySelector('input[name="privacy_policy"]');
const address_search = document.querySelector(".address-search");
const submit_button = document.querySelector(".submit-form");
const mobile_address_search = document.querySelector(".mobile-address-search");

let formData = {
  name: name.value,
  gender: gender.find((elem) => elem.checked).value,
  birth: birth.value,
  email: email.value,
  address: address.value,
  detail_address: detail_address.value,
  tel: tel.value,
  experience: experience.find((elem) => elem.checked).value,
  current_job_state: current_job_state.find((elem) => elem.checked).value,
  position: position.find((elem) => elem.checked).value,
  purpose: purpose.find((elem) => elem.checked).value,
  privacy_policy: privacy_policy.value,
};

name.addEventListener("change", (e) => {
  formData = {
    ...formData,
    name: e.target.value,
  };
});

for (let i = 0; i < gender.length; i++) {
  gender[i].addEventListener("change", (e) => {
    formData = {
      ...formData,
      gender: e.target.value,
    };
  });
}

birth.addEventListener("change", (e) => {
  formData = {
    ...formData,
    birth: e.target.value,
  };
});

email.addEventListener("change", (e) => {
  formData = {
    ...formData,
    email: e.target.value,
  };
});

address.addEventListener("change", (e) => {
  formData = {
    ...formData,
    address: e.target.value,
  };
});

detail_address.addEventListener("change", (e) => {
  formData = {
    ...formData,
    detail_address: e.target.value,
  };
});

tel.addEventListener("change", (e) => {
  formData = {
    ...formData,
    tel: e.target.value,
  };
});

for (let i = 0; i < experience.length; i++) {
  experience[i].addEventListener("change", (e) => {
    formData = {
      ...formData,
      experience: e.target.value,
    };
  });
}

for (let i = 0; i < current_job_state.length; i++) {
  current_job_state[i].addEventListener("change", (e) => {
    formData = {
      ...formData,
      current_job_state: e.target.value,
    };
  });
}

for (let i = 0; i < position.length; i++) {
  position[i].addEventListener("change", (e) => {
    formData = {
      ...formData,
      position: e.target.value,
    };
  });
}

for (let i = 0; i < purpose.length; i++) {
  purpose[i].addEventListener("change", (e) => {
    formData = {
      ...formData,
      purpose: e.target.value,
    };
  });
}

privacy_policy.addEventListener("change", (e) => {
  formData = {
    ...formData,
    privacy_policy: "동의",
  };
});

const openAddressFinder = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      address.value = `${data.address} (${data.zonecode})`;
      formData = {
        ...formData,
        address: `${data.address} (${data.zonecode})`,
      };
    },
  }).open();
};

address_search.addEventListener("click", () => {
  openAddressFinder();
});

mobile_address_search.addEventListener("click", () => {
  openAddressFinder();
});

// 사전등록 버튼 클릭 시 폼 전송
submit_button.addEventListener("click", () => {
  if (validateForm(formData)) {
    fetch("http://localhost:4300/api/jobfair/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          alert("사전등록이 완료되었습니다.");
          name.value = "";
          gender[0].checked;
          birth.value = "";
          email.value = "";
          address.value = "";
          detail_address.value = "";
          tel.value = "";
          experience[0].checked;
          current_job_state[0].checked;
          position[0].checked;
          purpose[0].checked;
          privacy_policy.checked = false;
          formData = {
            ...formData,
            name: "",
            gender: gender.find((elem) => elem.checked).value,
            birth: "",
            email: "",
            address: "",
            detail_address: "",
            tel: "",
            experience: experience.find((elem) => elem.checked).value,
            current_job_state: current_job_state.find((elem) => elem.checked)
              .value,
            position: position.find((elem) => elem.checked).value,
            purpose: purpose.find((elem) => elem.checked).value,
            privacy_policy: privacy_policy.value,
          };
        } else {
          alert("에러가 발생하였습니다. 다시 한번 등록하시길 바랍니다.");
        }
      })
      .catch((e) => {
        alert("에러가 발생하였습니다. 다시 한번 등록하시길 바랍니다.");
        console.log(e.message);
      });
  }
});
