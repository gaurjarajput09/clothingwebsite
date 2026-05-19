import React from 'react';

const About = () => {
  return (
    <div className="about-main" id="about">
      <div className="about-hero">
        <h1>About CasaWebClothing</h1>
        <p>Redefining Western Wear for the Modern Woman</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2026, CasaWebClothing began with a simple mission: to bring high-quality, 
            trendy, and affordable Western wear to fashion-forward individuals across India. 
            What started as a small passion project has grown into a leading online destination 
            for premium apparel.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Collection</h2>
          <p>
            From casual tops and chic crop-tops to elegant maxi dresses and perfectly fitted denims, 
            our collection is curated to ensure you always have something stunning to wear, 
            no matter the occasion. We blend modern trends with timeless classics to create 
            pieces that make you feel confident and beautiful.
          </p>
        </section>

        <section className="about-section">
          <h2>Quality & Ethics</h2>
          <p>
            We believe that great fashion shouldn't come at a high cost to the planet or people. 
            We work closely with our manufacturers to ensure fair labor practices and high-quality 
            materials that last beyond a single season.
          </p>
        </section>

        <section className="about-section packaging-section">
          <div className="packaging-text">
            <h2>Premium Packaging</h2>
            <p>
              Experience the joy of unboxing with our premium, eco-friendly packaging. 
              Every CasaWebClothing order is carefully hand-packed in our signature 
              casabox, designed to keep your apparel safe and make your purchase feel 
              like a gift to yourself.
            </p>
          </div>
          <div className="packaging-image">
            <img src="/images/casabox_pacakage.png" alt="CasaWebClothing Premium Packaging" />
          </div>
        </section>
      </div>

      <div className="about-stats">
        <div className="stat-item">
          <h3>10k+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>500+</h3>
          <p>Unique Designs</p>
        </div>
        <div className="stat-item">
          <h3>100%</h3>
          <p>Premium Quality</p>
        </div>
      </div>
    </div>
  );
};

export default About;
