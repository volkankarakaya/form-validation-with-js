const form1 = document.getElementById("form1");

HTMLElement.prototype.validate = function () {
  [...this.elements].forEach((formElement) => {
    formElement.isValidElement();
  });
};
HTMLElement.prototype.watchValidate = function () {
  [...this.elements].forEach((formElement) => {
    ["change", "keyup"].forEach((method) => {
      formElement.addEventListener(method, () => {
        formElement.isValidElement();
      });
    });
  });
};

HTMLElement.prototype.isValidElement = function () {
  let parent = this;
  if (
    this.getAttribute("type") === "radio" ||
    this.getAttribute("type") === "checkbox"
  ) {
    parent =
      this.closest(".checkbox-container") || this.closest(".radio-container");
    console.log(parent);
  }

  if (!this.checkValidity()) {
    this.closest("li").classList.add("error");

    if (parent.nextElementSibling?.className !== "error-msg") {
      const error = document.createElement("small");
      error.className = "error-msg";
      error.innerText = this.validationMessage;
      parent.insertAdjacentElement("afterend", error);
    } else {
      parent.nextElementSibling.innerText = this.validationMessage;
    }
  } else {
    // console.log(this)
    this.closest("li").classList.remove("error");

    if (parent.nextElementSibling?.className === "error-msg") {
      parent.nextElementSibling.remove();
    }
  }
};

form1.watchValidate();

form1.addEventListener("submit", function (e) {
  e.preventDefault();

  this.validate();
  // console.log(this.elements);
  if (this.checkValidity()) {
    new FormData(form1);
  }
});

// [...form1.elements].forEach((formElement) => {
//   ["change", "keyup"].forEach((method) => {
//     formElement.addEventListener(method, () => {
//       formElementValidate(formElement);
//     });
//   });
// });

form1.addEventListener("formdata", function (e) {
  console.log(e.formData);
});
