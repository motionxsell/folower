let raindrops = [];
let mousePosition = { x: 0, y: 0 };
let currentTextIndex = 0;
const texts = ["Instagram Follow Checker", "Find Your Unfollowers", "Get Accurate Results!"];

let followers = new Set();
let following = [];

const elements = {
  followersFile: document.getElementById("followersFile"),
  followingFile: document.getElementById("followingFile"),
  checkBtn: document.getElementById("checkBtn"),
  resultsSection: document.getElementById("results"),
  errorDiv: document.getElementById("error"),
  loadingDiv: document.getElementById("loading"),
};

document.addEventListener('DOMContentLoaded', function() {
  initRainEffect();
  initCursorGlow();
  initNavigation();
  initTypingEffect();
  initScrollAnimations();
  setupFileInputs();
});

function initRainEffect() {
  const canvas = document.getElementById('rainCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initRaindrops();
  }

  function initRaindrops() {
    const density = Math.floor(window.innerWidth / 15);
    raindrops = [];

    for (let i = 0; i < density; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        opacity: Math.random() * 0.2 + 0.1,
        speed: Math.random() * 5 + 5
      });
    }
  }

  function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    raindrops.forEach(drop => {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);

      const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
      gradient.addColorStop(0, `rgba(228, 64, 95, 0)`);
      gradient.addColorStop(1, `rgba(228, 64, 95, ${drop.opacity})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();

      drop.y += drop.speed;

      if (drop.y > canvas.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawRain);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawRain();
}

function initCursorGlow() {
  const cursorGlow = document.getElementById('cursorGlow');

  document.addEventListener('mousemove', (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;

    cursorGlow.style.left = (e.clientX - 16) + 'px';
    cursorGlow.style.top = (e.clientY - 16) + 'px';
  });
}

function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const section = e.target.getAttribute('data-section');
      scrollToSection(section);

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if (!e.target.classList.contains('mobile-nav-link')) {
        e.target.classList.add('active');
      } else {
        document.querySelector(`.nav-link[data-section="${section}"]`).classList.add('active');
      }

      mobileNav.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });

  const heroBtn = document.querySelector('.hero-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      scrollToSection('checker');
    });
  }
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = sectionId === 'home' ? 0 : element.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

function initTypingEffect() {
  const typedTextElement = document.getElementById('typedText');

  function typeText() {
    const currentText = texts[currentTextIndex];
    let index = 0;

    const typeTimer = setInterval(() => {
      if (index <= currentText.length) {
        typedTextElement.textContent = currentText.slice(0, index);
        index++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          const backspaceTimer = setInterval(() => {
            if (index > 0) {
              typedTextElement.textContent = currentText.slice(0, index - 1);
              index--;
            } else {
              clearInterval(backspaceTimer);
              currentTextIndex = (currentTextIndex + 1) % texts.length;
              setTimeout(typeText, 500);
            }
          }, 50);
        }, 2000);
      }
    }, 100);
  }

  typeText();
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.tool-card, .section-header');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

function setupFileInputs() {
  elements.followersFile.addEventListener("change", updateFileLabels);
  elements.followingFile.addEventListener("change", updateFileLabels);
}

function updateFileLabels() {
  const followersLabel = document.querySelector('label[for="followersFile"]');
  const followingLabel = document.querySelector('label[for="followingFile"]');
  
  if (elements.followersFile.files.length > 0) {
    followersLabel.classList.add("file-selected");
    followersLabel.querySelector("span").textContent = `✓ ${elements.followersFile.files[0].name}`;
  } else {
    followersLabel.classList.remove("file-selected");
    followersLabel.querySelector("span").textContent = "Upload followers_1.json";
  }
  
  if (elements.followingFile.files.length > 0) {
    followingLabel.classList.add("file-selected");
    followingLabel.querySelector("span").textContent = `✓ ${elements.followingFile.files[0].name}`;
  } else {
    followingLabel.classList.remove("file-selected");
    followingLabel.querySelector("span").textContent = "Upload following.json";
  }
}

function showError(message) {
  elements.errorDiv.textContent = message;
  elements.errorDiv.classList.remove("hidden");
  elements.loadingDiv.classList.add("hidden");
}

function hideError() {
  elements.errorDiv.classList.add("hidden");
}

function showLoading() {
  elements.loadingDiv.classList.remove("hidden");
  hideError();
}

function hideLoading() {
  elements.loadingDiv.classList.add("hidden");
}

function readFile(fileInput, fileName) {
  return new Promise((resolve, reject) => {
    const file = fileInput.files[0];
    if (!file) {
      reject(new Error(`Please select ${fileName}`));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let data = JSON.parse(e.target.result);
        // Handle if the JSON is wrapped in an extra layer
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Check if it has a key that contains the actual data
          const keys = Object.keys(data);
          if (keys.length === 1 && Array.isArray(data[keys[0]])) {
            data = data[keys[0]];
          }
        }
        resolve(data);
      } catch (error) {
        reject(new Error(`Invalid JSON in ${fileName}. Please ensure it's a valid Instagram data file.`));
      }
    };

    reader.onerror = () => {
      reject(new Error(`Failed to read ${fileName}`));
    };

    reader.readAsText(file);
  });
}

function displayResults(notFollowingBack, notFollowingYou) {
  const resultsDiv = elements.resultsSection;
  
  const notFollowingBackHTML = notFollowingBack.length > 0 ? `
    <div class="result-category">
      <h4>👤 Not Following You Back (${notFollowingBack.length})</h4>
      <p class="category-subtitle">People you follow but they don't follow you</p>
      <ul class="results-list">
        ${notFollowingBack.map(u => `
          <li class="result-item">
            <span class="username">${u}</span>
            <a href="https://instagram.com/${u}" target="_blank" class="unfollow-link">
              <i class="fas fa-external-link-alt"></i> Visit Profile
            </a>
          </li>
        `).join("")}
      </ul>
      <button class="copy-btn" onclick="copyToClipboard('notFollowingBack')">
        <i class="fas fa-copy"></i> Copy Usernames
      </button>
    </div>
  ` : '';

  const notFollowingYouHTML = notFollowingYou.length > 0 ? `
    <div class="result-category">
      <h4>🚫 Not Following You (${notFollowingYou.length})</h4>
      <p class="category-subtitle">People who follow you but you don't follow back</p>
      <ul class="results-list">
        ${notFollowingYou.map(u => `
          <li class="result-item">
            <span class="username">${u}</span>
            <a href="https://instagram.com/${u}" target="_blank" class="unfollow-link">
              <i class="fas fa-external-link-alt"></i> Visit Profile
            </a>
          </li>
        `).join("")}
      </ul>
      <button class="copy-btn" onclick="copyToClipboard('notFollowingYou')">
        <i class="fas fa-copy"></i> Copy Usernames
      </button>
    </div>
  ` : '';

  let resultHTML = '<div class="results-container">';
  
  if (notFollowingBack.length === 0 && notFollowingYou.length === 0) {
    resultHTML += '<p style="color: #4caf50; font-weight: 600; text-align: center; padding: 2rem;">Perfect! All your followers are following you back! 🎉</p>';
  } else {
    resultHTML += notFollowingBackHTML + notFollowingYouHTML;
  }
  
  resultHTML += '</div>';
  
  resultsDiv.innerHTML = resultHTML;
  resultsDiv.classList.remove("hidden");
  
  window.resultsData = {
    notFollowingBack: notFollowingBack,
    notFollowingYou: notFollowingYou
  };
}

function copyToClipboard(type) {
  let text = '';
  if (type === 'notFollowingBack') {
    text = window.resultsData.notFollowingBack.join("\n");
  } else if (type === 'notFollowingYou') {
    text = window.resultsData.notFollowingYou.join("\n");
  }
  
  if (!text) return;
  
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target.closest('.copy-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  }).catch(() => {
    alert("Failed to copy to clipboard");
  });
}

elements.checkBtn.addEventListener("click", async () => {
  try {
    hideError();
    showLoading();
    elements.checkBtn.disabled = true;

    const followersData = await readFile(elements.followersFile, "followers_1.json");
    const followingData = await readFile(elements.followingFile, "following.json");

    try {
      // Parse followers
      let followersArray = followersData;
      if (!Array.isArray(followersArray)) {
        const keys = Object.keys(followersArray);
        if (keys.length > 0) {
          followersArray = followersArray[keys[0]];
        }
      }

      followers = new Set(
        followersArray.map(item => {
          if (!item.string_list_data || !item.string_list_data[0]) {
            throw new Error("Invalid followers.json format");
          }
          return item.string_list_data[0].value.toLowerCase();
        })
      );
    } catch (error) {
      throw new Error("Invalid followers_1.json format. Please ensure it's the correct Instagram data file.");
    }

    try {
      // Parse following - handle multiple possible formats
      let followingArray = followingData;
      
      // If it's an object with relationships_following key
      if (followingArray && followingArray.relationships_following) {
        followingArray = followingArray.relationships_following;
      } 
      // If it's an object with a single key that contains the array
      else if (!Array.isArray(followingArray)) {
        const keys = Object.keys(followingArray);
        if (keys.length > 0) {
          followingArray = followingArray[keys[0]];
        }
      }

      following = followingArray.map(item => {
        if (!item.string_list_data || !item.string_list_data[0]) {
          throw new Error("Invalid following.json format");
        }
        return item.string_list_data[0].value.toLowerCase();
      });
    } catch (error) {
      throw new Error("Invalid following.json format. Please ensure it's the correct Instagram data file.");
    }

    // Calculate both categories
    const notFollowingBack = following.filter(u => !followers.has(u)).sort();
    const notFollowingYou = Array.from(followers).filter(u => !following.includes(u)).sort();

    displayResults(notFollowingBack, notFollowingYou);
    hideLoading();
  } catch (error) {
    showError(`Error: ${error.message}`);
  } finally {
    elements.checkBtn.disabled = false;
  }
});

// Button shimmer effect
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.hero-btn, .card-btn, .contact-btn');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      const shimmer = button.querySelector('.btn-shimmer');
      if (shimmer) {
        shimmer.style.left = '100%';
        setTimeout(() => {
          shimmer.style.left = '-100%';
        }, 700);
      }
    });
  });
});

// Scroll to update active nav link
window.addEventListener('scroll', () => {
  const sections = ['home', 'how', 'checker'];
  const scrollPosition = window.scrollY + 100;

  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }
  });
});
