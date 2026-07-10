// ===== Mouse Glow Effect =====
const mouseGlow = document.getElementById('mouseGlow');

document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
    mouseGlow.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    mouseGlow.classList.remove('active');
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const html = document.documentElement;

function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// ===== Scroll Animations =====
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ===== Navbar Shadow on Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== Project Modals =====
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

const projectData = {
    project1: {
        title: 'Staffing-Agency Service',
        tags: ['Java', 'AWS', 'Microservices', 'DynamoDB'],
        description: 'End-to-end development and enhancement of the Staffing-Agency microservice for the AGI-DS Ops Tech & Product team at Amazon.',
        features: [
            'Designed and implemented RESTful APIs for staffing workflow management',
            'Built scalable microservice architecture on AWS infrastructure',
            'Integrated with internal Amazon services for seamless data flow',
            'Implemented monitoring and alerting for operational excellence',
            'Reduced manual staffing coordination effort through automation'
        ],
        impact: 'Streamlined staffing operations for the AGI-DS team, enabling faster resource allocation and reducing coordination overhead.'
    },
    project2: {
        title: 'Text-Extraction Service',
        tags: ['Python', 'AWS', 'ML Infrastructure', 'Lambda'],
        description: 'Built and enhanced a text-extraction service supporting AI/ML pipelines for the P&C Project.',
        features: [
            'Developed Python-based text extraction pipeline processing documents at scale',
            'Set up AWS infrastructure for ML model hosting for ADS-Science team',
            'Implemented batch and real-time processing modes',
            'Built monitoring dashboards for pipeline health and throughput',
            'Optimized processing performance reducing latency significantly'
        ],
        impact: 'Enabled AI/ML teams to efficiently extract and process text data, accelerating model training and inference workflows.'
    },
    project3: {
        title: 'Sensai – Internal Secure Browser',
        tags: ['TypeScript', 'Security', 'DevOps'],
        description: 'Development and maintenance of an internal secure browser used across the organization for sensitive workflows.',
        features: [
            'Maintained security-hardened browsing environment for internal tools',
            'Implemented security policies and access controls',
            'Built automated deployment pipelines for updates',
            'Managed cross-platform compatibility (Windows, macOS, Linux)',
            'Handled incident response for security-related issues'
        ],
        impact: 'Provided a secure, reliable browser solution used by teams across the organization for handling sensitive data and workflows.'
    },
    project4: {
        title: 'AI-Teacher Portal',
        tags: ['Java', 'AWS', 'DynamoDB', 'Microservices'],
        description: 'Microservices development for the AI-Teacher portal supporting Alexa Engineers and Scientists in building and improving ML models.',
        features: [
            'Developed backend microservices for the ADS Customer Hub portal',
            'Built AWS infrastructure supporting the portal services',
            'Implemented data access patterns using DynamoDB',
            'Created technical documentation and knowledge base',
            'Provided technical support for ML model development workflows'
        ],
        impact: 'Empowered Alexa Engineers and Scientists with tools and infrastructure to build and iterate on ML models more efficiently.'
    }
};

function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
    const featuresHtml = project.features.map(f => `<li>${f}</li>`).join('');

    modalBody.innerHTML = `
        <div class="project-tags" style="margin-bottom: 1rem;">${tagsHtml}</div>
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <h3>Key Features</h3>
        <ul>${featuresHtml}</ul>
        <h3>Impact</h3>
        <p>${project.impact}</p>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = card.getAttribute('data-modal');
        openModal(modalId);
    });
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        mobileMenu.classList.remove('active');
    }
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
