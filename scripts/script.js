const skills = {
    inSort: false,
    data: [
        {
            name: 'html',
            level: 10,
            icon: 'html.svg',
        },
        {
            name: 'css',
            level: 15,
            icon: 'css.svg',
        },
        {
            name: 'python',
            level: 5,
            icon: 'python.svg',
        },
        {
            name: 'c++',
            level: 20,
            icon: 'c++.svg',
        },
    ],

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
skills.generateList(skillList);
const buttonGroup = document.querySelector('.skillsButtons');

buttonGroup.addEventListener(
    'click',
    (evt) => evt.target.nodeName === 'BUTTON' && skills.sortByProp(skillList, evt.target.dataset.type)
);

const menu = {
    isOpen: true,

    toggle: function(menuElement, button) {
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

menu.toggle(nav, burgerBtn);

burgerBtn.addEventListener('click', () => menu.toggle(nav, burgerBtn));

