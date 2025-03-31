import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const books = [
    {
      id: 1,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover: "/covers/1-sapiens.jpg",
      description: "A brief history of humankind",
      category: "Non-Fiction",
      pdfUrl: "https://drive.google.com/file/d/1yLKC4XrDcVK7SJ-HVaMmZ6nY_WNW3gyy/view?usp=sharing"
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      cover: "/covers/2-rich-dad-poor-dad.jpg",
      description: "What the rich teach their kids about money that the poor do not",
      category: "Personal Finance",
      pdfUrl: "https://drive.google.com/file/d/1Fdex9TV5zY7xNDrAfNltTTmWquaf1IeC/view?usp=sharing   "
    },
    {
      id: 3,
      title: "The Defining Decade",
      author: "Dr. Meg Jay",
      cover: "/covers/3-defining-decade.jpg",
      description: "Why your twenties matter and how to make the most of them now",
      category: "Psychology",
      pdfUrl: "https://drive.google.com/file/d/11ZMvxUGdcL85jjqpddP6gkxBl3QUdTYz/view?usp=sharing"
    },
    {
      id: 4,
      title: "The Little Book of Common Sense Investing",
      author: "John Bogle",
      cover: "/covers/4-common-sense-investing.jpg",
      description: "The only way to guarantee your fair share of stock market returns",
      category: "Investing",
      pdfUrl: "https://drive.google.com/file/d/10Tg4hp1kdiscD5eMMMdD3auyimGgT3d3/view?usp=sharing"
    },
    {
      id: 5,
      title: "Learn to Earn",
      author: "Peter Lynch",
      cover: "/covers/5-learn-to-earn.jpg",
      description: "A beginner's guide to the basics of investing and business",
      category: "Investing",
      pdfUrl: "https://drive.google.com/file/d/1hcGP5j2lqat9cDUyffpdt_a4STu4anAO/view?usp=sharing"
    },
    {
      id: 6,
      title: "Ten Arguments For Deleting Your Social Media Accounts Right Now",
      author: "Jaron Lanier",
      cover: "/covers/6-delete-social-media.jpg",
      description: "A manifesto for a happier, healthier life without social media",
      category: "Technology",
      pdfUrl: "https://drive.google.com/file/d/1RJkVuJGG_s3lZnCWJfPEfAh39VhWDahr/view?usp=sharing"
    },
    {
      id: 7,
      title: "Do Epic Shit",
      author: "Ankur Warikoo",
      cover: "/covers/7-do-epic-shit.jpg",
      description: "An entrepreneur's guide to thinking big and achieving success",
      category: "Business",
      pdfUrl: "https://drive.google.com/file/d/1sIUZPqNSCZathKbHOzoeRVoYQX3r3nLB/view?usp=sharing"
    },
    {
      id: 8,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "/covers/8-psychology-of-money.jpg",
      description: "Timeless lessons on wealth, greed, and happiness",
      category: "Personal Finance",
      pdfUrl: "https://drive.google.com/file/d/1JnhUDHdyKXVwOyyMStK9ZIZKqH5lBApQ/view?usp=sharing"
    },
    {
      id: 9,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/covers/9-atomic-habits.jpg",
      description: "An easy way to build good habits and break bad ones",
      category: "Self-Help",
      pdfUrl: "https://drive.google.com/file/d/1NGzlrZl3BAhW4BBUW-mCmKUynA2bEQjx/view?usp=sharing"
    },
    {
      id: 10,
      title: "Hypnotherapy",
      author: "Dave Elman",
      cover: "/covers/10-hypnotherapy.jpg",
      description: "A guide to hypnotherapy techniques and practices",
      category: "Psychology",
      pdfUrl: "https://drive.google.com/file/d/.../view?usp=sharing"
    },
    {
      id: 11,
      title: "Hypnosis and Hypnotherapy",
      author: "Calvin D. Banyan and Gerald F. Kein",
      cover: "/covers/11-hypnosis-and-hypnotherapy.jpg",
      description: "Exploring the power of hypnosis for therapy",
      category: "Psychology",
      pdfUrl: "https://drive.google.com/file/d/.../view?usp=sharing"
    },
    {
      id: 12,
      title: "Irresistible",
      author: "Adam Alter",
      cover: "/covers/12-Irresistible.jpg",
      description: "The rise of addictive technology and business of keeping us hooked",
      category: "Technology",
      pdfUrl: "https://drive.google.com/file/d/.../view?usp=sharing"
    },
    {
      id: 13,
      title: "Milk and Honey",
      author: "Rupi Kaur",
      cover: "/covers/13.jpg",
      description: "A collection of poetry and prose about survival, love, and healing",
      category: "Non-Fiction",
      pdfUrl: "https://drive.google.com/file/d/.../view?usp=sharing"
    },
    {
      id: 14,
      title: "Rosemary's Baby",
      author: "Ira Levin",
      cover: "/covers/14.jpg",
      description: "A horror novel about a woman who becomes pregnant with the devil's child",
      category: "Non-Fiction",
      pdfUrl: "https://drive.google.com/file/d/.../view?usp=sharing"
    },
    {
      id: 15,
      title: "The 48 Laws of Power",
      author: "Robert Greene",
      cover: "/covers/15.jpg",
      description: "A practical guide for anyone who wants power or wants to avoid being manipulated by it",
      category: "Self-Help",
      pdfUrl: "https://drive.google.com/file/d/.../view?usp=sharing"
    },
    {
      id: 16,
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      cover: "/covers/16.jpg",
      description: "A counterintuitive approach to living a good life",
      category: "Self-Help",
      pdfUrl: "https://drive.google.com/file/d/.../view?usp=sharing"
    },
    {
      id: 17,
      title: "Your Money and Your Brain",
      author: "Jason Zweig",
      cover: "/covers/17.jpg",
      description: "How the new science of neuroeconomics can help make you rich",
      category: "Personal Finance",
      pdfUrl: "https://drive.google.com/file/d/.../view?usp=sharing"
    },
  ];

const Dashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user session data
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="dashboard">
      {/* Logout Button */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <svg viewBox="0 0 24 24">
            <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H5v16h9v-2h2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z"/>
          </svg>
          Logout
        </button>
      </div>

      <h1 className="dashboard-title">
        <span className="title-gradient">Book Dashboard</span>
        <span className="title-underline"></span>
      </h1>
      
      <div className="books-container">
        {books.map((book) => (
          <div 
            key={book.id}
            className={`book-card ${hoveredCard === book.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(book.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-image-container">
              <img 
                src={book.cover} 
                alt={book.title}
                className="book-image"
                onError={(e) => {
                  e.target.src = '/covers/fallback.jpg';
                }}
              />
            </div>
            
            <div className="card-content">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <div className="category-badge">{book.category}</div>
              <p className="book-description">{book.description}</p>
              
              <button 
                className="read-button"
                onClick={() => window.open(book.pdfUrl, '_blank')}
              >
                <span className="button-text">Read Book</span>
                <span className="button-icon">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;