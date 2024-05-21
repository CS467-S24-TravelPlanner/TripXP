import { postData, getData, patchData, deleteData } from "./ApiService.jsx";

function uploadImage(imageData) {
    console.log(imageData);
    console.log(imageData.image);
    let formData = new FormData();
    formData.append("uploaded_file", imageData.image);
    console.log(formData.getAll("uploaded_file"));
  return postData("/upload", {}, formData);
}

export { uploadImage };
