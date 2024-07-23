const adnew = document.querySelector('#adnew');
const newsk = document.querySelector('#newsk');
const btnClose = document.querySelector('#btnIcon');
const formnew = document.querySelector('#formnew');
const tbodyProfile = document.querySelector('#tbodyProfile');
const btnSubmit = document.querySelector('#btnSubmit');
const btnCancel = document.querySelector('#btnCancel');
const profileTitle = document.querySelector('#profileTitle');
const nameProfile = document.querySelector('#nameProfile');
const imageProfile = document.querySelector('#imageProfile');
const technology = document.querySelector('#technology');
const githubProfile = document.querySelector('#githubProfile');
const description = document.querySelector('#description');

let PROFILE_LOCAL = 'profiles';
let idUpdate = null;

newsk.addEventListener('click', () => {
    adnew.classList.remove('hidden');
    let error = document.querySelectorAll('.error-name');
    for (let i in error) {
        error[i].innerHTML = "";
    }
});

btnClose.addEventListener('click', () => {
    adnew.classList.add('hidden');
});

btnCancel.addEventListener('click', () => {
    adnew.classList.add('hidden');
    nameProfile.value = "";
    imageProfile.value = "";
    technology.value = "";
    githubProfile.value = "";
    description.value = "";
    profileTitle.innerText = "Thêm Dự án";
    idUpdate = null;

    btnSubmit.innerText = "Thêm";
});

formnew.addEventListener('submit', (e) => {
    e.preventDefault();
    if (idUpdate) {
        const profiles = JSON.parse(localStorage.getItem(PROFILE_LOCAL));
        const profileCheck = checkErrors();
        if (!profileCheck) {
            return;
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sửa thành công Dự án",
                showConfirmButton: false,
                timer: 1500,
            })
        }
        const indexUpdate = profiles.findIndex(index => index.id === idUpdate);
        profiles[indexUpdate].name = nameProfile.value;
        profiles[indexUpdate].image = imageProfile.value;
        profiles[indexUpdate].technology = technology.value;
        profiles[indexUpdate].github = githubProfile.value;
        profiles[indexUpdate].description = description.value;
        localStorage.setItem(PROFILE_LOCAL, JSON.stringify(profiles));
        btnCancel.click();
        idUpdate = null;
        renderProfiles();
        return;
    }

    let id = 1;
    const profiles = JSON.parse(localStorage.getItem(PROFILE_LOCAL)) || [];
    if (profiles.length > 0) {
        id = profiles[profiles.length - 1].id + 1;
    }

    let profileCheck = checkErrors();
    if (!profileCheck) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm thành công dự án",
            showConfirmButton: false,
            timer: 1500,
        })
    }

    const profile = {
        id,
        name: nameProfile.value,
        image: imageProfile.value,
        technology: technology.value,
        github: githubProfile.value,
        description: description.value,
    }
    profiles.push(profile);
    localStorage.setItem(PROFILE_LOCAL, JSON.stringify(profiles));
    nameProfile.value = '',
        imageProfile.value = '',
        technology.value = '',
        githubProfile.value = '',
        description.value = '',
        adnew.classList.add('hidden');
    renderProfiles();
})

function renderProfiles() {
    let profiles = JSON.parse(localStorage.getItem(PROFILE_LOCAL));
    let stringHTML = ``;
    for (let i = 0; i < profiles.length; i++) {
        stringHTML += `
        <tr>
            <td class="table-td">${i + 1}</td>
            <td class="table-td">${profiles[i].name}</td>
            <td class="table-td">
            <img class="table-imgs-skill" src="${profiles[i].image}" alt="">
            </td>
            <td class="table-td"> ${profiles[i].technology}</td>
            <td class="table-td">  
                <button class="btn icon-update" onclick="updateProfile(${profiles[i].id})">
                    Sửa
                </button>      
                <button class="btn icon-btn" onclick="deleteProfile(${profiles[i].id})">
                Xóa
                </button>
            </td>
        </tr>
        `;
    }
    tbodyProfile.innerHTML = stringHTML;
}
renderProfiles();


function updateProfile(id) {
    idUpdate = id;
    let error = document.querySelectorAll('.error-name');
    for (let i in error) {
        error[i].innerHTML = "";
    }
    const profiles = JSON.parse(localStorage.getItem(PROFILE_LOCAL));
    const profileIndex = profiles.findIndex(item => item.id === id);
    nameProfile.value = profiles[profileIndex].name;
    imageProfile.value = profiles[profileIndex].image;
    technology.value = profiles[profileIndex].technology;
    githubProfile.value = profiles[profileIndex].github;
    description.value = profiles[profileIndex].description;

    adnew.classList.remove('hidden');
    profileTitle.innerText = "Sửa dự án";
    btnSubmit.innerText = "Sửa";
    renderProfiles();
}


function deleteProfile(id) {
    const result = confirm(`Bạn có muốn xóa dự án ${id} này không ?`);
    if (!result) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Xóa thành công dự án",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    const profiles = JSON.parse(localStorage.getItem(PROFILE_LOCAL));
    const skillIndex = profiles.findIndex(item => item.id === id);
    profiles.splice(skillIndex, 1);
    localStorage.setItem(PROFILE_LOCAL, JSON.stringify(profiles));
    renderProfiles();
}

function checkErrors() {
    resetShowError();
    const profiles = JSON.parse(localStorage.getItem(PROFILE_LOCAL)) || [];
    let flag = true;
    let index = profiles.findIndex(item => item.name === nameProfile.value);

    if (index !== -1) {
        flag = false;
        showError('errorName', "Tên dự án đã tồn tại");
    }
    if (nameProfile.value === "") {
        flag = false;
        showError('errorName', "* Tên dự án không được để trống");
    }
    if (imageProfile.value === "") {
        flag = false;
        showError('errorImage', "* Hình ảnh không được để trống");
    }
    if (technology.value === "") {
        flag = false;
        showError('errorTechnology', "* Công nghệ không được để trống");
    }
    if (githubProfile.value === "") {
        flag = false;
        showError('errorGithub', "* Link git không được để trống");
    }
    if (description.value === "") {
        flag = false;
        showError('errorDescription', "* Mô tả không được để trống");
    }
    return flag;
}

function showError(id, message) {
    let showMessage = document.getElementById(id);
    showMessage.innerText = message;
}

function resetShowError() {
    let resetError = document.querySelectorAll('.error-name');
    for (let i = 0; i < resetError.length; i++) {
        resetError[i].innerText = '';
    }
}


