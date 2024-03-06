const eleGroupImg = document.querySelector('.group-img');
const eleVideoYoutube = document.querySelector('.video-yt__wrap');
eleGroupImg.addEventListener('click', function(){
        eleGroupImg.style.display='none';
        eleVideoYoutube.innerHTML = `<iframe class="video-yt" width="560" height="315" src="https://www.youtube.com/embed/OV8q23AsZUg?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
})
// Khai báo một biến đếm để theo dõi số lượng dự án đã hiển thị
let displayedProjects = 0;
let fieldCurrent = '';
const projectsEle = document.querySelector(".our-projects__show");
// Function để hiển thị các dự án từ index b cho đến index e và lọc theo field
function displayProjectsFromTo(data, b, e, fieldFilter) {
    for (let i = b; i < e; i++) {
        const project = data[i];
        if (!project) return;
        if (fieldFilter === 'all-projects' || fieldFilter === project.field) {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('our-projects-banner');
            projectDiv.style.backgroundColor = project.backgroundColor;
            projectDiv.style.color = project.color;

            const projectHTML = `
                <div>
                    <h5>${project.field}</h5>
                    <h3>${project['project-name']}</h3>
                </div>
                <div>
                <img src="${project.img}" alt="${project['project-name']}">
                </div>
            `;
            projectDiv.innerHTML = projectHTML;
            projectsEle.appendChild(projectDiv);
        }
    }
    displayedProjects = e;
    fieldCurrent = fieldFilter;
}
function loadProjectsByField(field) {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            projectsEle.innerHTML = '';
            if(field =='all-projects'){
                displayProjectsFromTo(data, 0, 2, field);
            }
            else{
            const filteredProjects = data.filter(project => project.field === field);
            displayProjectsFromTo(filteredProjects, 0, 2, field);
            fieldCurrent = field;
            }
        })
        .catch(error => console.log(`Error fetching ${field} projects:`, error));
}

function loadMoreProjectsByField(field) {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const allProjectsCount = data.length;
            if(field=="all-projects"){
                displayProjectsFromTo(data, displayedProjects, displayedProjects + 2, field);
                fieldCurrent= field;
            }
            else{
                const filteredProjects = data.filter(project => project.field === field);
                displayProjectsFromTo(filteredProjects, displayedProjects, displayedProjects + 2, field);
                fieldCurrent =field; 
            }
            displayedProjects += 2;
            if (displayedProjects >= allProjectsCount) {
                document.getElementById("load-more-btn").style.display = "none";
            } else {
                document.getElementById("load-more-btn").style.display = "block";
            }
        })
        .catch(error => console.log(`Error fetching ${field} projects:`, error));
}

document.querySelector(".all-projects").addEventListener('click', () => {
        loadProjectsByField('all-projects');
});
document.querySelector(".design").addEventListener('click', () => {
        loadProjectsByField('design');
});
document.querySelector(".development").addEventListener('click', () => {
        loadProjectsByField('development');
});

document.querySelector(".branding").addEventListener('click', () => {
        loadProjectsByField('branding');
});

document.querySelector(".products").addEventListener('click', () => {
        loadProjectsByField('products');
});

document.querySelector(".portfolio__select").addEventListener('change', function() {
    var selectedOption = this.value;
    loadProjectsByField(selectedOption);
});
// Xử lý sự kiện "load more" cho lĩnh vực hiện tại
document.getElementById("load-more-btn").addEventListener("click", () => {
loadMoreProjectsByField(fieldCurrent);
});
loadProjectsByField('all-projects');
document.querySelectorAll(".menu__items a").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.querySelector(`.${targetId}`);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
            });
        }
    });
});
document.querySelectorAll(".footer-right a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.querySelector(`.${targetId}`);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
        });
    }
});
});
// Xử lý sự kiện active
let listItems = document.querySelectorAll('.our-projects__portfolio li a');

listItems.forEach(function(item) {
  item.addEventListener('click', function() {
    listItems.forEach(function(li) {
      li.classList.remove('selected');
    });
        this.classList.add('selected');
  });
});

// Slice client say
const clientSliceBtnPrev = document.getElementById('clients-say-btn-prev');
const clientSliceBtnNext = document.getElementById('clients-say-btn-next');
const clientSlice1Ele = document.querySelector('.clients-say-slide-item-1');
const clientSlice2Ele = document.querySelector('.clients-say-slide-item-2');
const clientSlice3Ele = document.querySelector('.clients-say-slide-item-3');
let avatarImgCurrent1 = true;
let arr = ['a', 'b', 'c'];
let isProcessing = false
function clientSlide(){
    if(isProcessing){
        return;
    }
    isProcessing = true;
    if(arr[0]==='a'){
        clientSlice1Ele.style.transform = 'translateX(1000px)';
        clientSlice2Ele.style.transform = 'translateX(-500px)';
        clientSlice3Ele.style.transform = 'translateX(-500px)';
        clientSlice1Ele.style.transition = '2s';
        clientSlice2Ele.style.transition = '2s';
        clientSlice3Ele.style.transition = '2s';
    }
     if(arr[0]=='b'){
        clientSlice1Ele.style.transform = 'translateX(500px)';
        clientSlice2Ele.style.transform = 'translateX(500px)';
        clientSlice3Ele.style.transform = 'translateX(-1000px)';
        clientSlice1Ele.style.transition = '2s';
        clientSlice2Ele.style.transition = '2s';
        clientSlice3Ele.style.transition = '2s';
    }
    if(arr[0]=='c'&&arr[1]=='a'&&arr[2]=='b'){
        clientSlice1Ele.style.transform = 'translateX(0px)';
        clientSlice2Ele.style.transform = 'translateX(0px)';
        clientSlice3Ele.style.transform = 'translateX(0px)';
        clientSlice1Ele.style.transition = '2s';
        clientSlice2Ele.style.transition = '2s';
        clientSlice3Ele.style.transition = '2s';
     }
    const n = arr.length;
    let temp;
    temp= arr[0];
    for(let i =0; i< n; i++){
        if(i== n-1){
            continue;
        }
        else{
            arr[i] = arr[i+1]
        }
    }
    arr[n-1] =temp;
    console.log(arr);
    setTimeout(()=>{
        isProcessing = false
     },2000);
}
clientSliceBtnPrev.addEventListener('click', clientSlide)
clientSliceBtnNext.addEventListener('click', clientSlide)

// setInterval(()=>{
//     clientSlide()
// },3000)
// Slide agency
const slideBtnPrevEl = document.querySelector(".agency__white-btn-prev")
const slideBtnNextEl = document.querySelector(".agency__white-btn-next")
const agencyContent1El = document.querySelector(".agency__slide-1__container");
const agencyContent2El = document.querySelector(".agency__slide-2__container");
const pageCurrentEl = document.querySelector(".pageCurrent");
let slide1Show = false;
let isProcessAgency = false
const agencySlide = ()=>{
    if(isProcessAgency){
        return;
    }
    isProcessAgency = true;
    if(slide1Show){
    agencyContent1El.style.transform = 'translateX(100vw)'
    agencyContent2El.style.transform = 'translateX(-100vw)'
    agencyContent2El.style.transition = '1s'
    pageCurrentEl.textContent = '2/2';
    slide1Show = false;
    }else{
    agencyContent1El.style.transform = 'translateX(0px)'
    agencyContent2El.style.transform = 'translateX(0px)'
    agencyContent1El.style.transition = '1s';
    pageCurrentEl.textContent = '1/2';
    slide1Show = true;
    }
    setTimeout(()=>{
        isProcessAgency = false;
    },1000);
}
agencySlide()
slideBtnPrevEl.addEventListener('click', agencySlide);
slideBtnNextEl.addEventListener('click',agencySlide);