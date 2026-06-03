import React, { useState, useRef, useEffect } from 'react';

const BOT_NAME = 'CasaBot';
const BOT_AVATAR = '🤖';
const USER_AVATAR = '👤';

// Smart responses for common queries
const smartResponses = [
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'hlo', 'namaste'],
    response: `Hey there! 👋 Welcome to CasaWeb Clothing! I'm ${BOT_NAME}, your shopping assistant. How can I help you today?`
  },
  {
    keywords: ['order', 'track', 'tracking', 'where is my order', 'order status'],
    response: '📦 To track your order, go to **My Orders** section in your account. You\'ll receive a tracking link via email/SMS within 24 hours of dispatch. Need more help? Contact us at support@casaweb.com'
  },
  {
    keywords: ['return', 'exchange', 'refund', 'replace'],
    response: '🔄 We offer a **30-day easy return policy**!\n\n• Items must be unworn with tags attached\n• Refund processed within 5-7 business days\n• Free pickup from your doorstep\n\nTo initiate a return, go to My Orders → Select item → Request Return'
  },
  {
    keywords: ['shipping', 'delivery', 'deliver', 'ship', 'free shipping'],
    response: '🚚 **Shipping Info:**\n\n• Free shipping on orders above ₹999\n• Standard delivery: 5-7 business days\n• Express delivery: 2-3 business days (₹99 extra)\n• We deliver across India!'
  },
  {
    keywords: ['size', 'sizing', 'size guide', 'measurement', 'fit'],
    response: '📏 **Size Guide:**\n\n• XS: Bust 32", Waist 24"\n• S: Bust 34", Waist 26"\n• M: Bust 36", Waist 28"\n• L: Bust 38", Waist 30"\n• XL: Bust 40", Waist 32"\n\nTip: If you\'re between sizes, we recommend going one size up for a comfortable fit!'
  },
  {
    keywords: ['payment', 'pay', 'cod', 'upi', 'card', 'emi'],
    response: '💳 **Payment Options:**\n\n• UPI (Google Pay, PhonePe, Paytm)\n• Credit/Debit Cards\n• Net Banking\n• Cash on Delivery (COD)\n• EMI available on orders above ₹3000'
  },
  {
    keywords: ['discount', 'coupon', 'offer', 'sale', 'code', 'promo'],
    response: '🎉 **Current Offers:**\n\n• Use code **CASA10** for 10% off on first order\n• Buy 2 Get 1 Free on selected items\n• Extra 15% off on orders above ₹2999\n\nCheck our **Sale** section for more deals!'
  },
  {
    keywords: ['contact', 'support', 'help', 'call', 'email', 'phone'],
    response: '📞 **Contact Us:**\n\n• Email: support@casaweb.com\n• Phone: +91 98765 43210\n• WhatsApp: +91 98765 43210\n• Hours: Mon-Sat, 9 AM - 9 PM\n\nWe typically respond within 2 hours!'
  },
  {
    keywords: ['thank', 'thanks', 'thankyou', 'thank you', 'dhanyavaad'],
    response: 'You\'re welcome! 😊 Happy shopping at CasaWeb! If you need anything else, I\'m always here to help. 💜'
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'tata'],
    response: 'Bye bye! 👋 Happy shopping! Visit us again soon. Have a wonderful day! 💜✨'
  }
];

const quickReplies = [
  '📦 Track Order',
  '🚚 Shipping Info',
  '🔄 Return Policy',
  '📏 Size Guide',
  '💳 Payment Options',
  '🎉 Offers & Discounts'
];

function getBotResponse(message) {
  const lowerMsg = message.toLowerCase().trim();
  
  for (const item of smartResponses) {
    if (item.keywords.some(keyword => lowerMsg.includes(keyword))) {
      return item.response;
    }
  }
  
  return `I'm not sure about that, but I'd love to help! 😊\n\nYou can try asking about:\n• Orders & Tracking\n• Shipping & Delivery\n• Returns & Refunds\n• Size Guide\n• Payment Options\n• Current Offers\n\nOr contact our team at **support@casaweb.com**`;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hey! 👋 Welcome to CasaWeb Clothing! I'm ${BOT_NAME}, your shopping assistant.\n\nHow can I help you today? Pick a topic below or type your question!`,
      sender: 'bot',
      time: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        sender: 'bot',
        time: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReply = (reply) => {
    // Remove emoji from the beginning
    const cleanReply = reply.replace(/^[^\w]+/, '').trim();
    sendMessage(cleanReply);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessage = (text) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <>
            <i className="fa-solid fa-comments"></i>
            <span className="chatbot-pulse"></span>
          </>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar-header">{BOT_AVATAR}</div>
            <div>
              <h3>{BOT_NAME}</h3>
              <span className="chatbot-status">
                <span className="chatbot-status-dot"></span>
                Online
              </span>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="chatbot-msg-avatar">{BOT_AVATAR}</div>
              )}
              <div className="chatbot-msg-content">
                <div
                  className="chatbot-msg-bubble"
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
                <span className="chatbot-msg-time">{formatTime(msg.time)}</span>
              </div>
              {msg.sender === 'user' && (
                <div className="chatbot-msg-avatar">{USER_AVATAR}</div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chatbot-msg bot">
              <div className="chatbot-msg-avatar">{BOT_AVATAR}</div>
              <div className="chatbot-msg-content">
                <div className="chatbot-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {/* Quick replies - show only after the first bot message */}
          {messages.length <= 2 && !isTyping && (
            <div className="chatbot-quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="chatbot-quick-btn"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chatbot-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="chatbot-input"
          />
          <button
            type="submit"
            className="chatbot-send-btn"
            disabled={!inputValue.trim()}
            aria-label="Send Message"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
