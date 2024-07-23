const adnew = document.querySelector('#adnew');
const newsk = document.querySelector('#newsk');
const btnClose = document.querySelector('#btnIcon');
const skillName = document.querySelector('#name');
const skillImg = document.querySelector('#image');
const formnew = document.querySelector('#formnew');
const tbodySkill = document.querySelector('#skillBody');
const errorImg = document.querySelector('#errorImg');
const btnSubmit = document.querySelector('#btnSubmit');

let SKILL_LOCAL = 'skills';

newsk.addEventListener('click', () => {
    adnew.classList.remove('hidden');
    let error = document.querySelectorAll('.error-name');
    for (let i in error) {
        error[i].innerHTML = "";
    }
});

btnClose.addEventListener('click', () => {
    skillName.value = "";
    skillImg.value = "";
    adnew.classList.add('hidden');
});

btnCancel.addEventListener('click', () => {
    skillName.value = "";
    skillImg.value = "";
    adnew.classList.add('hidden');
});

formnew.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = 1;
    const skills = JSON.parse(localStorage.getItem(SKILL_LOCAL)) || [];
    if (skills.length > 0) {
        id = skills[skills.length - 1].id + 1;
    }

    let skillCheck = checkErrors();
    if (!skillCheck) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm thành công Kỹ năng",
            showConfirmButton: false,
            timer: 1500,
        })
    }

    const skill = {
        id,
        name: skillName.value,
        image: skillImg.value,
        Date: skillDate(),
    };

    skills.push(skill);
    localStorage.setItem(SKILL_LOCAL, JSON.stringify(skills));
    skillName.value = '';
    skillImg.value = '';
    adnew.classList.add('hidden');
    renderSkills();
});

function skillDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedTime = dd + '/' + mm + '/' + yyyy;
    return formattedTime;
}

function renderSkills() {
    let skills = JSON.parse(localStorage.getItem(SKILL_LOCAL));
    let stringHTML = ``;
    for (let i = 0; i < skills.length; i++) {
        stringHTML += `
        <tr>
            <td class="table-td">${i + 1}</td>
            <td class="table-td">${skills[i].name}</td>
            <td class="table-td">
            <img class="table-imgs-skill" src="${skills[i].image}" alt="">
            </td>
            <td class="table-td"> ${skills[i].Date}</td>
            <td class="table-td">        
                <button class="btn icon-btn" onclick="deleteSkill(${skills[i].id})">
                Xóa
                </button>
            </td>
        </tr>
        `;
    }
    tbodySkill.innerHTML = stringHTML;
}
renderSkills();

function deleteSkill(id) {
    const result = confirm(`Bạn có muốn xóa kỹ năng ${id} này không ?`);
    if (!result) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Xóa thành công kỹ năng",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    const skills = JSON.parse(localStorage.getItem(SKILL_LOCAL));
    const skillIndex = skills.findIndex(item => item.id === id);
    skills.splice(skillIndex, 1);
    localStorage.setItem(SKILL_LOCAL, JSON.stringify(skills));
    renderSkills();
}

function checkErrors() {
    resetShowError();
    const skills = JSON.parse(localStorage.getItem(SKILL_LOCAL)) || [];
    let flag = true;
    let index = skills.findIndex(item => item.name === skillName.value);
    if (index !== -1) {
        flag = false;
        showError('errorName', "Tên kỹ năng đã tồn tại");
    }
    if (skillName.value === "") {
        flag = false;
        showError('errorName', "* Tên kỹ năng không được để trống");
    }
    if (skillImg.value === "") {
        flag = false;
        showError('errorImage', "* Hình ảnh không được để trống");
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


