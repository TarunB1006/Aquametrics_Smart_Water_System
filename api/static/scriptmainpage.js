document.addEventListener('DOMContentLoaded', function() {
    const topBar = document.querySelector('.top-bar');
    const mainText = document.getElementById('main-text');
    const tagline = document.getElementById('tagline');
    const workingSection = document.getElementById('bottom');
    const contactSection = document.getElementById('contact'); // New
    const workingText = workingSection.querySelector('h2');
    const back = document.querySelector('.background-video');

    // Function to adjust video opacity
    const showVideo = function(){
        back.style.opacity = '0.2';
    };

    // Function to show top bar and trigger video opacity adjustment
    const showTopBar = function() {
        topBar.style.opacity = '1';
        // Display the top bar
        showVideo();
    };

    // Function to fade in the main text and tagline
    const fadeInText = function() {
        mainText.style.opacity = '1';
        tagline.style.opacity = '1';
        
        // Call the function to show the top bar after the text is fully loaded
        showTopBar();
    };

    // Call the function to fade in the main text and tagline
    fadeInText();

    // Smooth scroll to the "Working" section and enlarge text when clicking on the "Working" link
    const workingLink = document.querySelector('a[href="#bottom"]');
    workingLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior of anchor link
        scrollToSection(workingSection); // Scroll to the "Working" section
    });

    // Smooth scroll to the "Contact Us" section when clicking on the "Contact Us" link
    const contactLink = document.querySelector('a[href="#contact"]');
    contactLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior of anchor link
        scrollToSection(contactSection); // Scroll to the "Contact Us" section
    });

    // Smooth scroll to the top section when clicking on the "Home" link
    const homeLink = document.querySelector('a[href="#top"]');
    homeLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior of anchor link
        scrollToTopSection(); // Scroll to the top section
    });

    // Function to scroll to a specific section
    const scrollToSection = function(section) {
        const topBarHeight = topBar.offsetHeight - 120;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const scrollTopPosition = sectionTop - topBarHeight;
        window.scrollTo({
            top: scrollTopPosition, // Scroll to the calculated position
            behavior: 'smooth'
        });
    };

    // Function to scroll to the top section
    const scrollToTopSection = function() {
        window.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: 'smooth'
        });
    };

    // Function to send email
    const sendEmail = function() {
        // Implement email sending functionality here
        const emailAddress = 'aquametrics@gmail.com'; 

        // Compose the email subject and body
        const subject = 'Inquiry from WaterTrack Website';
        const body = 'Dear WaterTrack Team,\n\nI am interested in your services and would like to get in touch with you. Please contact me back at your earliest convenience.\n\nBest regards,';
    
        // Create the mailto link
        const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        // Open the default email client with the pre-filled email
        window.location.href = mailtoLink;
    };

    // Attach the sendEmail function to the button click event
    const emailButton = document.querySelector('.contact-button');
    emailButton.addEventListener('click', sendEmail);
});