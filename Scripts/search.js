const wrapper = document.querySelector(".wrapper")
const fileName = document.querySelector(".file-name")
const defaultBtn = document.querySelector("#default-btn")
const customBtn = document.querySelector("#custom-btn")
const cancelBtn = document.querySelector("#cancel-btn")
const img = document.querySelector(".image img")
const uploadedImage = document.querySelector("#uploaded_image")
const uploadImageForm = document.getElementById("uploadImageForm")
const searchImage = document.getElementById("searchImage")
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

if(uploadImageForm){
    uploadImageForm.addEventListener("submit", function(e){
        e.preventDefault();
        fetch("https://k5a6c55o5j.execute-api.us-east-1.amazonaws.com/uploadImage", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "image": imageDataBase64.split(',')[1],
                "name": e.target.elements.name.value
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            alert(data.response)
        }).catch(error => {
            console.log(error)
        });
    })
}


if(searchImage){
    searchImage.addEventListener("submit", function(e){
        e.preventDefault();
        fetch("https://k5a6c55o5j.execute-api.us-east-1.amazonaws.com/searchFace", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "image": imageDataBase64.split(',')[1],
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            alert("Нэр: " + data.Item.FullName.S)
        }).catch(error => {
            console.log(error)
        });
    })
}
