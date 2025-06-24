import React, { useState } from "react";
import "./FAQ.css";
import Navbar from "../../Navbar/Navbar.jsx";

const faqs = [
  {
    question: "Can I request a custom strategy based on my unique trading idea?",
    answer:
      "Yes, absolutely! We specialize in turning your unique trading ideas into fully automated strategies. Simply share your concept with us, and our team will develop and deliver a customized strategy tailored specifically to your requirements.",
  },
  {
    question: "Do you offer a trial or demo before purchasing a strategy?",
    answer:
      "At present, we do not offer free trials. However, many of our strategies support paper trading, allowing you to test them risk-free before deploying them in a live environment.",
  },
  {
    question: "What is the profit-sharing model for subscribers using your strategies?",
    answer:
      "Some strategies available on AlgoDukaan include profit-sharing arrangements. For details on which strategies offer this and how it works, please check the specific strategy descriptions or contact us directly.",
  },
  {
    question: "How often do you update or add new strategies to the website?",
    answer:
      "We continually monitor market trends and customer feedback to improve our offerings. New strategies are added regularly, so we recommend subscribing to our newsletter to stay updated on the latest releases.",
  },
  {
    question: "Can I modify the delivered strategy on my own after purchase?",
    answer:
      "Yes, once the strategy template is duplicated into your Tradetron account, you have full control to adjust parameters or make modifications to better suit your individual trading preferences.",
  },
  {
    question: "Do you provide guidance on how to use Tradetron for beginners?",
    answer:
      "While our primary focus is on strategy development and customization, we also provide basic guidance and resources to help new users navigate the Tradetron platform effectively.",
  },
  {
    question: "Is my personal information safe when I purchase from AlgoDukaan?",
    answer:
      "Definitely. We prioritize your privacy and data security by using secure payment gateways and maintaining strict confidentiality protocols to protect your personal information.",
  },
  {
    question: "Can I use the same strategy on multiple Tradetron accounts?",
    answer:
      "Each strategy template license is tied to a single Tradetron account. If you wish to use a strategy on multiple accounts, please contact us to discuss licensing options.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major digital payment methods including credit and debit cards, net banking, and UPI. We recommend using UPI as it is the fastest and preferred mode of payment on our platform.",
  },
  {
    question: "Can I add my own trading strategies to AlgoDukaan?",
    answer:
      "Yes, you can! If you have profitable trading strategies you'd like to share or promote, AlgoDukaan offers a platform where you can submit your strategies. After review, we may feature them on our website to help you reach a wider audience. Please contact us for more details on the submission and collaboration process.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <section className="faq-section">
        <h2 className="faq-title" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>
          Frequently Asked Questions
        </h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="arrow">{activeIndex === index ? "▼" : "▶"}</span>
              </button>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FAQ;