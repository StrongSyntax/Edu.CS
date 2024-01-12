document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            alert(`You clicked on ${item.textContent}`);
            // Here you can add more logic, like redirecting to another page
        });
    });
});

document.getElementById('question-mark').addEventListener('click', function() {
    var aboutMe = document.getElementById('about-me');
    if (aboutMe.style.visibility === 'hidden') {
        aboutMe.style.visibility = 'visible';
        aboutMe.style.opacity = '1';
    } else {
        aboutMe.style.visibility = 'hidden';
        aboutMe.style.opacity = '0';
    }
});
