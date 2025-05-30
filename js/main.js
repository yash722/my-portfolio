/**
 * Portfolio Website - Main JavaScript
 * Author: Yash Rao
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Elements
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const themeToggle = document.querySelector('.theme-toggle');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const skillLevels = document.querySelectorAll('.skill-level');
  const statNumbers = document.querySelectorAll('.stat-number');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialDots = document.querySelectorAll('.dot');
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');
  const contactForm = document.getElementById('contactForm');
  
  // Initialize Data Visualization Canvas
  const dataVizCanvas = document.getElementById('dataViz');
  let dataViz = null;
  
  if (dataVizCanvas) {
    initDataVisualization();
  }
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize skill bars animation
  animateSkillBars();
  
  // Initialize stat counters
  animateStatCounters();
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Project filters
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', filterProjects);
    });
  }
  
  // Testimonial slider
  if (testimonialTrack) {
    let currentSlide = 0;
    const slideCount = testimonialTrack.children.length;
    
    // Initialize testimonial slider
    updateTestimonialSlider();
    
    // Testimonial controls
    if (testimonialPrev) {
      testimonialPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateTestimonialSlider();
      });
    }
    
    if (testimonialNext) {
      testimonialNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateTestimonialSlider();
      });
    }
    
    // Testimonial dots
    if (testimonialDots.length > 0) {
      testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentSlide = index;
          updateTestimonialSlider();
        });
      });
    }
    
    function updateTestimonialSlider() {
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      testimonialDots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }
  
  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Functions
  function toggleTheme() {
    body.classList.toggle('light-theme');
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    
    // Update data visualization colors if exists
    if (dataViz) {
      dataViz.updateColors();
    }
  }
  
  function toggleMobileMenu() {
    const mobileNav = document.querySelector('.nav-links');
    mobileNav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenuBtn.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }
  
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
      if (
        section.offsetTop <= scrollPosition && 
        section.offsetTop + section.offsetHeight > scrollPosition
      ) {
        const id = section.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  function animateSkillBars() {
    if (skillLevels.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target;
          const value = level.getAttribute('data-level');
          level.style.width = `${value}%`;
          observer.unobserve(level);
        }
      });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(level => {
      observer.observe(level);
    });
  }
  
  function animateStatCounters() {
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const target = parseInt(stat.getAttribute('data-count'));
          let count = 0;
          const duration = 2000; // ms
          const interval = Math.ceil(duration / target);
          
          const counter = setInterval(() => {
            count += 1;
            stat.textContent = count;
            
            if (count >= target) {
              clearInterval(counter);
              stat.textContent = target;
            }
          }, interval);
          
          observer.unobserve(stat);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
      observer.observe(stat);
    });
  }
  
  function filterProjects() {
    const filter = this.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Validation
    if (
      !nameInput.value || 
      !emailInput.value || 
      !subjectInput.value || 
      !messageInput.value
    ) {
      alert('Please fill in all fields');
      return;
    }
    
    // Form submission logic would go here
    // For now, just show a success message
    alert('Message sent successfully!');
    contactForm.reset();
  }
  
  function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.fade-in, .fade-up, .fade-right');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  }
  
  function initDataVisualization() {
    // Set canvas dimensions
    const ctx = dataVizCanvas.getContext('2d');
    dataVizCanvas.width = dataVizCanvas.clientWidth;
    dataVizCanvas.height = dataVizCanvas.clientHeight;
    
    // Data visualization class
    class DataVisualization {
      constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.numParticles = 100;
        this.colors = {
          primary: '#64FFDA',
          secondary: '#0A192F',
          tertiary: '#8892B0'
        };
        
        this.init();
        this.animate();
        
        // Make visualization interactive
        canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
      }
      
      init() {
        // Create particles
        for (let i = 0; i < this.numParticles; i++) {
          this.particles.push({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            radius: Math.random() * 3 + 1,
            color: this.getRandomColor(),
            velocity: {
              x: (Math.random() - 0.5) * 0.5,
              y: (Math.random() - 0.5) * 0.5
            }
          });
        }
      }
      
      getRandomColor() {
        const colors = [
          this.colors.primary, 
          this.colors.tertiary,
          'rgba(100, 255, 218, 0.5)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      updateColors() {
        if (document.body.classList.contains('light-theme')) {
          this.colors = {
            primary: '#0071E3',
            secondary: '#F5F5F7',
            tertiary: '#4F4F4F'
          };
        } else {
          this.colors = {
            primary: '#64FFDA',
            secondary: '#0A192F',
            tertiary: '#8892B0'
          };
        }
        
        // Update particle colors
        this.particles.forEach(particle => {
          particle.color = this.getRandomColor();
        });
      }
      
      draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw particles
        this.particles.forEach(particle => {
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          this.ctx.fillStyle = particle.color;
          this.ctx.fill();
        });
        
        // Draw connections
        this.ctx.strokeStyle = 'rgba(100, 255, 218, 0.15)';
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              this.ctx.beginPath();
              this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
              this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
              this.ctx.stroke();
            }
          }
        }
      }
      
      update() {
        this.particles.forEach(particle => {
          // Update position
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > this.width) {
            particle.velocity.x *= -1;
          }
          
          if (particle.y < 0 || particle.y > this.height) {
            particle.velocity.y *= -1;
          }
        });
      }
      
      animate() {
        this.update();
        this.draw();
        requestAnimationFrame(this.animate.bind(this));
      }
      
      handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        // Create ripple effect
        this.particles.forEach(particle => {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 500;
            particle.velocity.x += dx * force;
            particle.velocity.y += dy * force;
          }
        });
      }
    }
    
    // Initialize the visualization
    dataViz = new DataVisualization(dataVizCanvas);
    
    // Handle resize
    window.addEventListener('resize', () => {
      dataVizCanvas.width = dataVizCanvas.clientWidth;
      dataVizCanvas.height = dataVizCanvas.clientHeight;
      dataViz = new DataVisualization(dataVizCanvas);
    });
  }
});