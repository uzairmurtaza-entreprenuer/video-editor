/**
* Template Name: Personal
* Updated: Jun 18 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

___________________________________________________________

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/testimonials', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testimonialSchema = new mongoose.Schema({
  name: String,
  email: String,
  testimonial: String,
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

app.post('/submit', async (req, res) => {
  const { name, email, testimonial } = req.body;
  const newTestimonial = new Testimonial({ name, email, testimonial });
  await newTestimonial.save();
  res.send('Testimonial submitted successfully!');
});

app.get('/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find({});
  res.json(testimonials);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const testimonial = document.getElementById('testimonial').value;

  const response = await fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, testimonial }),
  });

  const data = await response.text();
  alert(data);

  loadTestimonials();
});

async function loadTestimonials() {
  const response = await fetch('http://localhost:3000/testimonials');
  const testimonials = await response.json();

  const container = document.querySelector('.testimonials');
  container.innerHTML = '';

  testimonials.forEach((testimonial) => {
    const template = document.getElementById('testimonial-template');
    const clone = template.cloneNode(true);
    clone.style.display = 'block';
    clone.querySelector('.testimonial-text').textContent = testimonial.testimonial;
    clone.querySelector('.testimonial-name').textContent = testimonial.name;
    clone.querySelector('.testimonial-email').textContent = testimonial.email;
    container.appendChild(clone);
  });
}

loadTestimonials();

(function() {
  emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS user ID
})();

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
  const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      alert('Feedback sent successfully!');
      document.getElementById('feedbackForm').reset();
    }, (err) => {
      alert('Failed to send feedback. Please try again later.');
      console.log(JSON.stringify(err));
    });
});

___________________________________________________________________

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const testimonial = document.getElementById('testimonial').value;

  db.collection('testimonials').add({
    name: name,
    email: email,
    testimonial: testimonial,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert('Feedback submitted successfully!');
    document.getElementById('feedbackForm').reset();
    loadTestimonials(); // Refresh testimonials after submission
  })
  .catch((error) => {
    console.error('Error writing document: ', error);
  });
});

async function loadTestimonials() {
  const testimonialsContainer = document.querySelector('.testimonials');
  testimonialsContainer.innerHTML = '';

  const snapshot = await db.collection('testimonials').orderBy('timestamp', 'desc').get();
  snapshot.forEach(doc => {
    const data = doc.data();
    const template = document.getElementById('testimonial-template');
    const clone = template.cloneNode(true);
    clone.style.display = 'block';
    clone.querySelector('.testimonial-text').textContent = data.testimonial;
    clone.querySelector('.testimonial-name').textContent = data.name;
    clone.querySelector('.testimonial-email').textContent = data.email;
    testimonialsContainer.appendChild(clone);
  });
}

window.onload = loadTestimonials;



__________________________________________________________________________

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
// video 
window.addEventListener('load', function() {
  var video = document.getElementById('videoPlayer');
  video.play();
});
