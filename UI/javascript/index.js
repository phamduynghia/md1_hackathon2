let PROFILE_LOCAL = "profiles";
let SKILL_LOCAL = "skills";

const skill = document.querySelector('#myskill');
const projectContent = document.querySelector('#projectContent');

function renderTech() {
    stringHTML = ``;
    let newTech = JSON.parse(localStorage.getItem(SKILL_LOCAL)) || [];
    for (let i = 0; i < newTech.length; i++) {
        stringHTML += `
        <div class="col l-2 m-4 c-4">
            <a href="" class="tech_icon-link" title="${newTech[i].name}">
                <div class="tech_icon-img" style="background-image: url(${newTech[i].image});">
                </div>
            </a>
        </div>
        `
    }
    skill.innerHTML = stringHTML;
}
renderTech();

function renderProfile() {
    stringHTML = ``;
    let newProfile = JSON.parse(localStorage.getItem(PROFILE_LOCAL)) || [];
    for (let i = 0; i < newProfile.length; i++) {
        stringHTML += `
            <div class="col l-4">
            <div class="projects_item">
                <div class="projects_wrap">
                    <div class="projects_img" style="background-image: url(${newProfile[i].image});">
                    </div>
                    <div class="projects_inner">
                        <h4 class="projects_inner_head">
                           ${newProfile[i].name}
                        </h4>
                        <p class="projects_inner-desc">
                           ${newProfile[i].description}
                        </p>
                        <p class="projects_inner-desc">
                            Tech stack : <span>${newProfile[i].technology}</span>
                        </p>
                        <div class="projects_inner-footer">
                            <a href="${newProfile[i].github}" class="projects_span">
                                <ion-icon name="link-outline"></ion-icon>
                                <span class="active">live Preview</span>
                            </a>
                            <a href="${newProfile[i].github}" class="projects_span">
                                <ion-icon name="logo-github"></ion-icon>
                                <span class="active">View codes</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div> 
        `
    }
    projectContent.innerHTML = stringHTML;
}
renderProfile();

