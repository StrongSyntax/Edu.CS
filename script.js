document.addEventListener('DOMContentLoaded', function() {
    var questionMark = document.getElementById('question-mark');
    var aboutMe = document.getElementById('about-me');

    questionMark.addEventListener('click', function() {
        var isVisible = aboutMe.style.visibility === 'visible';

        // Move the question mark to the left or back to the right
        this.style.right = isVisible ? '10px' : '300px'; // Adjust '300px' as needed

        // Toggle the visibility and opacity of the About Me section
        aboutMe.style.visibility = isVisible ? 'hidden' : 'visible';
        aboutMe.style.opacity = isVisible ? '0' : '1';
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
