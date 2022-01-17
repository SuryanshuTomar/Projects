const panels = document.querySelectorAll('.panel')
// console.log(panels);

addActiveClassFromPanel(); 

function addActiveClassFromPanel() {
    panels.forEach((panel) => {    
        panel.addEventListener('click', () => {   
            removeActiveClassFromPanel();  
            panel.classList.add('active');
        });
});
}

function removeActiveClassFromPanel() {
    panels.forEach((panel) => panel.classList.remove('active'));
}