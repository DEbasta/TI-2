const skills = {
    inSort: false,
    data: [],

    generateList: function (parentElement) {
        this.data.forEach((skill) => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            const div = document.createElement('div');

            dt.textContent = skill.name;
            div.textContent = `${skill.level}%`;
            dt.classList.add('skill-item');
            dd.classList.add('skill-level');
            dt.style.backgroundImage = `url("img/skills/${skill.icon}")`;
            div.style.width = `${skill.level}%`;

            dd.append(div);
            parentElement.append(dt, dd);
        });
    },

    sortByProp: function (parentElement, propName) {
        parentElement.innerHTML = '';
        if (!this.inSort || this.inSort !== propName) {
            // console.log(`sort type: ${propName}`);
            this.data.sort(compare(propName));
            this.inSort = propName;
        }
        else {
            this.data.reverse();
            
        }
        this.generateList(parentElement);
    },

    initList: function (url, parentElement, skillsSection) {
        fetch(url).then(data => data.json()).then(jsonData => {
                this.data = jsonData.data;
                this.generateList(parentElement);
            }).catch(err => {
                console.error('что-то пошло не так');
                skillsSection.remove();
            });
    },
  
}

const compare = (prop) => {
    return (a, b) => {
        if (a[prop] < b[prop]) {
            return -1;
        }

        if (a[prop] > b[prop]) {
            return 1;
        }

        return 0;
    }
};

const skillList = document.querySelector('.skill-list');
// skills.generateList(skillList);
const skillsSection = document.querySelector('#skills');
skills.initList('db/skills.json', skillList, skillsSection);
const buttonGroup = document.querySelector('.skillsButtons');

buttonGroup.addEventListener(
    'click',
    (evt) => evt.target.nodeName === 'BUTTON' && skills.sortByProp(skillList, evt.target.dataset.type)
);

const menu = {
    isOpen: true,
    toggleM: function(menuElement, button) {
        menuElement.classList.toggle('main-nav__closed');
        button.classList.toggle('nav-btn__close');
        button.classList.toggle('nav-btn__open');
        if (this.isOpen)
            button.children[0].innerText = 'Открыть меню';
        else  button.children[0].innerText = 'Закрыть меню';
        this.isOpen = !this.isOpen;
    },
}


const burgerBtn = document.querySelector('.nav-btn');
const nav = document.querySelector('.main-nav');

menu.toggleM(nav, burgerBtn);

burgerBtn.addEventListener('click', () => menu.toggleM(nav, burgerBtn));

const themeCheckBox = document.querySelector('.switch-checkbox');
const dark = 'dark', light = 'light';
const localStorage = window.localStorage;

let theme = localStorage.getItem('theme');


themeCheckBox.addEventListener('change', () => {
    if (theme === dark) {
        theme = light;
    } else {
        theme = dark;
    }
    localStorage.setItem('theme', theme);
    document.body.classList.toggle('dark-theme');
});

if (!theme) {
    localStorage.setItem('theme', dark);
    theme = dark;
} else if (theme !== dark) {
    document.body.classList.remove('dark-theme');
    themeCheckBox.checked = !themeCheckBox.checked;
}

