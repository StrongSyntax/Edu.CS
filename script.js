document.addEventListener('DOMContentLoaded', function() {
    var questionMark = document.getElementById('question-mark');
    var aboutMe = document.getElementById('about-me');

    questionMark.addEventListener('click', function() {
        // Check if the about section is currently displayed
        if (aboutMe.style.display === 'block') {
            aboutMe.style.opacity = '0';
            setTimeout(function() {
                aboutMe.style.display = 'none';
            }, 300); // Hide the text after the opacity transition
        } else {
            aboutMe.style.display = 'block';
            setTimeout(function() {
                aboutMe.style.opacity = '1';
            }, 10); // Slight delay before starting the opacity transition
        }
    });
});