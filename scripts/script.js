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

    
}

const skillList = document.querySelector('.skill-list');
skills.generateList(skillList);