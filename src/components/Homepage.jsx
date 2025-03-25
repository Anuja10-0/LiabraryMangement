import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css';

const Homepage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroImages = [
        {
            url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
            title: 'Discover Your Next Favorite Book',
            subtitle: 'Explore our collection of 10,000+ titles'
        },
        {
            url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
            title: 'Read Anytime, Anywhere',
            subtitle: 'Access your books across all devices'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="homepage">
            {/* Hero Carousel */}
            <section className="hero">
                <div className="hero-slides">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image.url})` }}
                        >
                            <div className="slide-overlay"></div>
                            <div className="slide-content">
                                <h1>{image.title}</h1>
                                <p>{image.subtitle}</p>
                                <div className="hero-buttons">
                                    <Link to="/register" className="btn btn-primary">
                                        Join Now
                                    </Link>
                                    <Link to="/login" className="btn btn-secondary">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="carousel-dots">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why Choose Our Library?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📚</div>
                        <h3>Vast Collection</h3>
                        <p>From classics to new releases</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Smart Search</h3>
                        <p>Find exactly what you need</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Mobile Friendly</h3>
                        <p>Read on any device</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Begin Your Reading Journey?</h2>
                    <Link to="/register" className="btn btn-primary btn-large">
                        Get Started for Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Homepage;