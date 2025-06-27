import React, { useState } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

const products = [
  {
    id: 1,
    title: 'Collaborate Your Strategy with AlgoDukaan',
    image: 'https://res.cloudinary.com/dppiuypop/image/upload/v1748232368/uploads/pgghdd1o984m3fph3jkh.jpg',
    formLink: 'https://forms.gle/izKtv55kMwYS7mei6',
    description: `🤝 Collaborate Your Strategy with AlgoDukaan

Are you a strategy creator looking to reach more traders?
Partner with AlgoDukaan to publish, promote, and grow your strategy’s visibility!

We offer a seamless collaboration where you provide the strategy, and we take care of the rest — from publishing it on our platform to marketing it across the trading community.

🔄 How It Works:
1. You Submit the Strategy
Share your ready-to-deploy Tradetron strategy with us — whether it’s manual, signal-based, or fully automated.

2. We Publish It
Your strategy will be featured on the AlgoDukaan website, professionally presented with complete details, screenshots, and performance metrics.

3. We Promote It
We promote your strategy via social media, email campaigns, and featured placements on our site.

4. Grow Together
You focus on building great strategies — we handle visibility, traffic, and reach.

📈 Please share a Backtest Report, Live Offline Report, or Live Report with your submission to help us evaluate and showcase the performance accurately.

🎯 Why Partner with AlgoDukaan?
📢 Professional exposure to an active algo trading audience
🔍 Transparent listing with verifiable results
💼 No upfront cost – just a high-quality strategy
📊 Analytics-driven promotion to reach the right users
🤝 Optional support to enhance or package your strategy

🚀 Ready to Collaborate?
Whether you’re a beginner or an expert — if you have a working Tradetron strategy and performance data to back it up, let’s publish and promote it together.

📩 Submit your strategy today on AlgoDukaan and join a growing network of top algo creators.


🤝 Strategy Collaboration Agreement

Between: AlgoDukaan (Platform)
And: Strategy Creator (You)

1. 📌 Purpose
You agree to share your trading strategy with AlgoDukaan for the purpose of listing, publishing, and promoting it on the platform.

2. 🔐 Ownership & Rights
You retain full ownership of your strategy and logic.

By submitting the strategy, you grant AlgoDukaan non-exclusive rights to display, describe, and promote the strategy on its website and marketing channels.

You can request removal or changes at any time.

3. 📊 Transparency & Safety
You agree to provide Backtest, Live Offline, or Live Reports to verify performance.

AlgoDukaan will never alter or resell your strategy without your written permission.

No sensitive credentials (like API keys or login info) should be shared with AlgoDukaan.

4. 💼 Responsibilities

You:
- Must ensure the strategy complies with Tradetron’s and regulatory guidelines.
- Are responsible for the accuracy of claims or metrics shown.

AlgoDukaan:
- Will publish and promote your strategy professionally.
- Will not be liable for any trading losses incurred by users who use your strategy.

5. ❌ Disclaimer
This agreement is not a financial partnership or advisory relationship.
AlgoDukaan is a platform and does not guarantee any results or returns.

✅ Agreement Confirmation
By submitting your strategy to AlgoDukaan, you agree to the above terms.`,
  },
  {
    id: 2,
    title: 'AlgoDukaan Strategy Creation Service',
    image: 'https://res.cloudinary.com/dppiuypop/image/upload/v1748254107/uploads/onpjlu15vkpsuzgjmz2n.jpg',
    formLink: 'https://forms.gle/ttLjs1D612XzLa6LA',
     description: `🛠️ Custom Tradetron Strategy Development — Available on AlgoDukaan

Turn your trading ideas into fully functional algorithms with our Tradetron strategy development services, now available on AlgoDukaan. From simple logic to complex multi-layered automation, we build tailor-made strategies that meet your exact trading needs.

🧠 What’s Included:
We offer end-to-end support for:

✅ Strategy Creation (Simple or Complex) on Tradetron  
✅ Trailing Stop-Loss Implementation — Set Level, Trade Level, or MTM-based  
✅ TradingView or Excel Integration for signal-based automation  
✅ Custom Logic Development where Tradetron keywords fall short  
✅ Python-based Extensions for advanced functionality

💬 Pricing is based on your requirements. Once you share your idea, we’ll review and provide a quote with a delivery timeline.

⏱️ Delivery Timeline:
🗓️ Simple Strategies: Delivered within 2 working days  
🗓️ Complex Strategies: Delivered within 8 working days  

You’ll receive a test version to observe performance. After your approval, the final strategy will be privately deployed to your Tradetron account.

🛠️ Post-Delivery Support:
✅ If anything doesn’t work as per your original requirement, we’ll fix it — at no extra charge

⚠️ Please note: Slippage and execution issues are broker/market-dependent and cannot be controlled via code

⚠️ Important Notice:
This is a technical development service, not a SEBI-registered advisory.  
No trading or investment recommendations are provided.  
You are strongly advised to consult a licensed financial advisor before using any strategy.  
Please review the FAQ section on AlgoDukaan before placing your order.

🚀 Get Started Now on AlgoDukaan  
Have a strategy idea? Let us help you automate it with accuracy and speed.  
🔗 Visit AlgoDukaan.com and submit your requirements today.`,
  },
];

const ProductCards = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar />
      <h2 className="customization-title">Customization</h2>

      {!selectedProduct ? (
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleCardClick(product)}
            >
              
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-title">{product.title}</div>
              <div className="product-price"></div>
              <a
                href={product.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="product-button"
                onClick={(e) => e.stopPropagation()}
              >
                Click here
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="product-detail">
          <button className="back-button" onClick={handleBack}>Back</button>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="detail-image"
          />
          <div className="detail-content">
            <h3 className="detail-title">{selectedProduct.title}</h3>
            <div
              className="detail-description"
              dangerouslySetInnerHTML={{
                __html: selectedProduct.description.replace(/\n/g, '<br />'),
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductCards;