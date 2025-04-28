document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const icon = input.nextElementSibling.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };
    
    // Password strength meter functionality
    const newPasswordInput = document.getElementById('newPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Update strength bar and text
            if (password === '') {
                strengthBar.style.width = '0';
                strengthBar.className = 'strength-bar';
                strengthText.textContent = 'Password strength';
            } else if (strength === 'weak') {
                strengthBar.style.width = '33%';
                strengthBar.className = 'strength-bar weak';
                strengthText.textContent = 'Weak';
            } else if (strength === 'medium') {
                strengthBar.style.width = '66%';
                strengthBar.className = 'strength-bar medium';
                strengthText.textContent = 'Medium';
            } else if (strength === 'strong') {
                strengthBar.style.width = '100%';
                strengthBar.className = 'strength-bar strong';
                strengthText.textContent = 'Strong';
            }
        });
    }
    
    // Function to check password strength
    function checkPasswordStrength(password) {
        if (password.length < 6) {
            return 'weak';
        }
        
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        const strength = hasLower + hasUpper + hasNumber + hasSpecial;
        
        if (password.length >= 8 && strength >= 3) {
            return 'strong';
        } else if (password.length >= 6 && strength >= 2) {
            return 'medium';
        } else {
            return 'weak';
        }
    }
    
    // Form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simple validation
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }
            
            // Here you would typically send the data to your server
            alert('Login successful! Redirecting to dashboard...');
            // Redirect to dashboard or home page
            window.location.href = 'index.html';
        });
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Form validation
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsChecked = document.getElementById('terms').checked;
            
            if (!firstName || !lastName) {
                alert('Please enter your full name');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (!validatePhone(phone)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!termsChecked) {
                alert('Please agree to the Terms of Service and Privacy Policy');
                return;
            }
            
            // Here you would typically send the data to your server
            alert('Account created successfully! Redirecting to dashboard...');
            // Redirect to dashboard or home page
            window.location.href = 'index.html';
        });
    }
    
    // Helper functions for validation
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\+\-\(\)]{10,15}$/;
        return re.test(phone);
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navContainer = document.querySelector('.navbar .container');
    navContainer.appendChild(mobileMenuBtn);
    
    const navLinksContainer = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        
        if (navLinksContainer.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            navLinksContainer.classList.contains('active') &&
            !e.target.closest('.nav-links') &&
            !e.target.closest('.mobile-menu-btn')
        ) {
            navLinksContainer.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});