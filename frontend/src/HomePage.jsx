import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { FiArrowRight, FiBook, FiShield, FiAward, FiTarget, FiTrendingUp, FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiGithub, FiFacebook, FiUsers, FiStar, FiEye, FiLock, FiSearch, FiBarChart2 } from 'react-icons/fi';
import './HomePage.css';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      icon: <FiShield />,
      title: "Master Real-World Cyber",
      highlight: "Threats with Confidence",
      subtitle: "Empower yourself to recognize and respond to everyday cyber threats with ease.",
      image: "https://www.shutterstock.com/image-photo/ai-ethics-law-concept-developing-600nw-2501568763.jpg",
      features: [
        {
          icon: <FiMail />,
          text: "Learn through real-life scenarios like phishing emails, ransomware, and social engineering."
        },
        {
          icon: <FiTarget />,
          text: "Build decision-making skills through interactive simulations."
        },
        {
          icon: <FiAward />,
          text: "Earn completion badges as proof of your cybersecurity awareness."
        }
      ],
      background: "linear-gradient(135deg, #4472C4 0%, #5B86E5 50%, #36D1DC 100%)"
    },
    {
      id: 2,
      icon: <FiTrendingUp />,
      title: "Learn Faster. Score",
      highlight: "Smarter. Stay Compliant",
      subtitle: "Achieve faster learning, higher exam scores, and ISO 27001 compliance.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
      features: [
        {
          icon: <FiShield />,
          text: "Content aligned with ISO/IEC 27001 (including the 114 Annex A controls)."
        },
        {
          icon: <FiBarChart2 />,
          text: "Personalized exam tracks based on your role (manager, technical staff, or general employees)."
        },
        {
          icon: <FiTarget />,
          text: "Mock exams and open-book pre-tests prepare you for final certification success"
        }
      ],
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
    },
    {
      id: 3,
      icon: <FiStar />,
      title: "Secure Habits, Safer",
      highlight: "Workplace",
      subtitle: "Instill everyday cybersecurity habits that protect you and the organization.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
      features: [
        {
          icon: <FiSearch />,
          text: "Access searchable learning materials by policy code and topic."
        },
        {
          icon: <FiEye />,
          text: "Stay informed on dark web risks, password hygiene, device safety, and remote work protocols."
        },
        {
          icon: <FiLock />,
          text: "Use the built-in 2FA sign-in system and secure dashboard to track your progress."
        }
      ],
      background: "linear-gradient(135deg, #2B6CB0 0%, #3182CE 25%, #4299E1 50%, #63B3ED 100%)"
    }
  ];

  // Auto-swipe functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getDashboardRoute = () => {
    if (!isAuthenticated) return '/login';
    
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'security_manager':
        return '/security-manager';
      case 'auditor':
        return '/auditor';
      case 'employee':
        return '/dashboard';
      default:
        return '/courses';
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section with Auto-Swipe Slider */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                background: `${slide.background}, url(${slide.image})`,
                backgroundSize: 'cover, cover',
                backgroundPosition: 'center, center',
                backgroundBlendMode: 'overlay'
              }}
            >
              <div className="hero-background">
                <div className="hero-overlay"></div>
                <div className="hero-particles"></div>
              </div>
              
              <div className="hero-container">
                <div className="hero-content">
                  <div className="hero-text">
                    <div className="hero-icon">
                      {slide.icon}
                    </div>
                    <h1 className="hero-title">
                      {slide.title}
                      <span className="highlight"> {slide.highlight}</span>
                    </h1>
                    <p className="hero-subtitle">
                      {slide.subtitle}
                    </p>
                    
                    <div className="hero-actions">
                      {isAuthenticated ? (
                        <Link to={getDashboardRoute()} className="btn btn-primary">
                          <span>Go to Dashboard</span>
                          <FiArrowRight />
                        </Link>
                      ) : (
                        <Link to="/login" className="btn btn-primary">
                          <span>Get Started</span>
                          <FiArrowRight />
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  <div className="hero-features">
                    {slide.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="hero-feature-item">
                        <div className="feature-icon">
                          {feature.icon}
                        </div>
                        <p className="feature-text">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Controls */}
        <div className="hero-controls">
          <div className="slide-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Features Section */}
      <section className="hero-features-section">
        <div className="container">
          <div className="hero-features-grid">
            <div className="hero-feature-card">
              <div className="feature-icon">
                <FiMail />
              </div>
              <div className="feature-content">
                <h3>Learn through real-life scenarios like phishing emails, ransomware, and social engineering.</h3>
              </div>
            </div>
            
            <div className="hero-feature-card">
              <div className="feature-icon">
                <FiTarget />
              </div>
              <div className="feature-content">
                <h3>Build decision-making skills through interactive simulations.</h3>
              </div>
            </div>
            
            <div className="hero-feature-card">
              <div className="feature-icon">
                <FiAward />
              </div>
              <div className="feature-content">
                <h3>Earn completion badges as proof of your cybersecurity awareness.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="course-categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore Clause Categories</h2>
            <p>Discover a world of knowledge through our diverse range of courses.</p>
          </div>
          
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">
                <FiTarget />
              </div>
              <h3>Scope</h3>
              <p>01 Key Part</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FiUsers />
              </div>
              <h3>Normative References</h3>
              <p>01 Key Part</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FiBook />
              </div>
              <h3>Terms and Definitions</h3>
              <p>01 Key Part</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FiShield />
              </div>
              <h3>Context of the Organization</h3>
              <p>04 Key Parts</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FiTrendingUp />
              </div>
              <h3>Leadership</h3>
              <p>03 Key Parts</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FiTarget />
              </div>
              <h3>Planning</h3>
              <p>04 Key Parts</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FiUsers />
              </div>
              <h3>Support</h3>
              <p>08 Key Parts</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FiShield />
              </div>
              <h3>Operation</h3>
              <p>03 Key Parts</p>
            </div>
          </div>
          
          <div className="show-all-button">
            <button className="btn btn-outline-primary">
              Show All Clauses <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header">
            <h2>The reviews speak for themselves</h2>
            <p>From critical skills to technical topics, LifeLine supports your professional development.</p>
          </div>
          
          <div className="reviews-grid">
            <div className="review-card">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Mr. Ruwan Jayasuriya" />
                </div>
                <div className="reviewer-details">
                  <h4>Mr. Ruwan Jayasuriya</h4>
                  <p>Commercial Superintendent, Colombo Water Board</p>
                </div>
              </div>
              <div className="review-content">
                <p>"The LMS simplified ISO 27001 training for our commercial staff. Even those without technical background could follow the modules and apply the concepts in billing and customer data handling."</p>
                <div className="rating">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
            
            <div className="review-card">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b332c3c3?w=150&h=150&fit=crop&crop=face" alt="Ms. Savithri de Silva" />
                </div>
                <div className="reviewer-details">
                  <h4>Ms. Savithri de Silva</h4>
                  <p>Senior Commercial Officer, Kandy Regional Office</p>
                </div>
              </div>
              <div className="review-content">
                <p>"Protecting customer information is critical for our department. The LMS showed us step-by-step how ISO 27001 controls safeguard sensitive billing data. Highly practical and relevant."</p>
                <div className="rating">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
            
            <div className="review-card">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Mr. Jayantha Kumara" />
                </div>
                <div className="reviewer-details">
                  <h4>Mr. Jayantha Kumara</h4>
                  <p>Commercial Manager, Southern Province Water Board</p>
                </div>
              </div>
              <div className="review-content">
                <p>"We especially valued the modules on information handling and access control. The platform made it clear how commercial staff should process and store records securely."</p>
                <div className="rating">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Master Cybersecurity?</h2>
            <p>Join thousands of professionals already using LifeLine to enhance their cybersecurity awareness and skills.</p>
            
            <div className="cta-actions">
              {!isAuthenticated && (
                <>
                  <Link to="/register" className="btn btn-primary btn-large">
                    <span>Start Free Trial</span>
                    <FiArrowRight />
                  </Link>
                  <Link to="/login" className="btn btn-outline">
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-brand">
                <h3>LifeLine</h3>
                <p>Empowering individuals and organizations with comprehensive cybersecurity awareness and training solutions for the digital age.</p>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <FiTwitter />
                  </a>
                  <a href="#" className="social-link">
                    <FiLinkedin />
                  </a>
                  <a href="#" className="social-link">
                    <FiGithub />
                  </a>
                  <a href="#" className="social-link">
                    <FiFacebook />
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h4>Product</h4>
              <ul className="footer-links">
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">API Reference</a></li>
                <li><a href="#">Status</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <FiMail />
                  <span>hello@lifeline.com</span>
                </div>
                <div className="contact-item">
                  <FiPhone />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <FiMapPin />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2025 LifeLine. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;