const swup = new Swup();
let defaultBtn = document.querySelector("#default-btn")
const customBtn = document.querySelector("#custom-btn")

let regExp =  /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
var imageDataBase64 = ""

function defaultBtnActive(){
    defaultBtn.click();
}

function changeImg(img){
    const wrapper = document.querySelector(".wrapper")
    const fileName = document.querySelector(".file-name")
    const cancelBtn = document.querySelector("#cancel-btn")
    defaultBtn.addEventListener("change", function(){
        const file = this.files[0]
        const  fileType = file['type']
        const validImageTypes = ['image/jpeg']
        if (!validImageTypes.includes(fileType)) {
            alert("Буруу файл оруулсан байна. jpg өргөтгөлтэй файл оруулна уу.")
        }
        else{
            const reader = new FileReader();
            reader.onload = function(){
                const result = reader.result;
                imageDataBase64 = result;
                img.src = result;
                wrapper.classList.add("active");
            }
            cancelBtn.addEventListener("click", function(){
                img.src = "";
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
}

function init() {
    if(document.querySelector("#uploadImageForm")){
        changeImg(document.querySelector("#imageBoi"))
        const uploadImageForm = document.getElementById("uploadImageForm")
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

    if(document.querySelector("#searchImage")){
        changeImg(document.querySelector("#imageBoi"))
        const searchImage = document.getElementById("searchImage")
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
                alert("Алдаа гарлаа! \nАлдааны тайлбар: " + error)
                console.log(error)
            });
        })
    }
}

init();
swup.on('contentReplaced', init);


