const wrapper = document.querySelector(".wrapper")
const fileName = document.querySelector(".file-name")
const defaultBtn = document.querySelector("#default-btn")
const customBtn = document.querySelector("#custom-btn")
const cancelBtn = document.querySelector("#cancel-btn")
const img = document.querySelector(".image img")
const uploadedImage = document.querySelector("#uploaded_image")
const uploadImageForm = document.querySelector("#uploadImageForm")
let regExp =  /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive(){
    defaultBtn.click();
}

var imageDataBase64 = ""

defaultBtn.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(){
            const result = reader.result;
            imageDataBase64 = result;
            img.src = result;
            uploadedImage.src = result;
            wrapper.classList.add("active");
        }
        cancelBtn.addEventListener("click", function(){
            img.src = " ";
            wrapper.classList.remove("active");
            fileName.textContent = " ";
        });
        reader.readAsDataURL(file);
    }
    if(this.value){
        let valueStore = this.value.match(regExp);
        fileName.textContent = valueStore;
    }
});

uploadImageForm.addEventListener("submit", function(e){
    e.preventDefault();
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json'
        },
        body: {
            image: imageDataBase64.split(',')[1],
            name: e.target.elements.name.value
        }
    });
    console.log(response)
})