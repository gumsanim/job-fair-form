window.addEventListener("load", () => {
  const name = document.querySelector("#name");
  const gender = document.querySelectorAll('input[name="gender"]');
  const birthday = document.querySelector("#birthday");
  const email = document.querySelector("#email");
  const address = document.querySelector("#address");
  const detail_address = document.querySelector("#detail-address");
  const tel = document.querySelector("#tel");
  const experience = document.querySelectorAll('input[name="experience"]');
  const current_job_state = document.querySelectorAll(
    'input[name="current_job_state"]'
  );
  const job = document.querySelectorAll('input[name="job"]');
  const purpose = document.querySelectorAll('input[name="purpose"]');
  const privacy_policy = document.querySelector('input[name="privacy_policy"]');
  const address_search = document.querySelector(".address-search");
  const submit_button = document.querySelector(".submit-form");

  address_search.addEventListener("click", (e) => {
    e.preventDefault();
  });

  // 사전등록 버튼 클릭 시 폼 전송
  submit_button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
