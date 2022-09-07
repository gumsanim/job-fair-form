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
const job = Array.from(document.querySelectorAll('input[name="job"]'));
const purpose = Array.from(document.querySelectorAll('input[name="purpose"]'));
const agreement = document.querySelector('input[name="agreement"]');
const address_search = document.querySelector(".address-search");
const submit_button = document.querySelector(".submit-form");

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
  job: job.find((elem) => elem.checked).value,
  purpose: purpose.find((elem) => elem.checked).value,
  agreement: agreement.value,
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

for (let i = 0; i < job.length; i++) {
  job[i].addEventListener("change", (e) => {
    formData = {
      ...formData,
      job: e.target.value,
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

agreement.addEventListener("change", (e) => {
  formData = {
    ...formData,
    agreement: "동의",
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

// 사전등록 버튼 클릭 시 폼 전송
submit_button.addEventListener("click", (e) => {
  if (validateForm(formData)) {
    let form = {
      ...formData,
      address: `${formData.address} ${formData.detail_address}`,
    };
    delete form.detail_address;

    fetch("http://localhost:4300/api/jobfair/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          alert("사전등록이 완료되었습니다.");
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
