
const form = document.getElementById("validation-form");

form.addEventListener("submit", function(e){
    e.preventDefault();    
    [...this.elements].forEach((formElement)=>{
      checkElement(formElement)
    })
});

[...form.elements].forEach((formElement)=>{
    ["change", "keyup"].forEach((method)=>{
        formElement.addEventListener(method, ()=> {
            checkElement(formElement)
        })
    })
})

function checkElement(formElement){
    
    if(!formElement.checkValidity()){
        formElement.closest("div").classList.add("error")

        if(formElement.nextElementSibling===null){
            const error = document.createElement("small");
            error.innerText = formElement.validationMessage;
            error.className = "error-msg"
            formElement.insertAdjacentElement("afterend", error);
        }else{
            formElement.nextElementSibling.innerText = formElement.validationMessage
        }
    }else{
        formElement.closest("div").classList.remove("error");

        if(formElement.nextElementSibling!==null){
            formElement.nextElementSibling.remove()
        }
    }
}