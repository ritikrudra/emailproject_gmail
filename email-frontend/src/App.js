import React, { useState } from 'react';
import './style.css';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleSend = async () => {
    // Basic validation
    if (!email) {
      setResponse('Please enter an email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setResponse('Please enter a valid email address.');
      return;
    }

    if (!message) {
      setResponse('Please enter a message.');
      return;
    }

    setClicked(true); // Change button color on click

    try {
      const res = await fetch('http://127.0.0.1:8000/api/send-mail/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.success);
      } else {
        setResponse(data.error);
      }
    } catch (err) {
      setResponse('Error sending email');
    }
  };

  return (
    <div className="container">
      <h2>📨 Send Email from React</h2>
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <br />
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="textarea"
      />
      <br />
      <button
        className={`button ${clicked ? 'clicked' : ''}`}
        onClick={handleSend}
      >
        Send
      </button>
      <p className="response">{response}</p>
    </div>
  );
}

export default App;
