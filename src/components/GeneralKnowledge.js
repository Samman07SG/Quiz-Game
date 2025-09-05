import React, { useState } from 'react';
import './GeneralKnowledge.css';

const GeneralKnowledge = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState(0);

  const knowledgeSections = [
    {
      id: 'study-tips',
      title: '📚 Effective Study Tips',
      icon: '🎯',
      content: [
        {
          point: 'Active Recall',
          description: 'Test yourself regularly instead of just re-reading. This strengthens memory pathways and improves retention.',
          tip: 'Try covering your notes and explaining concepts out loud.'
        },
        {
          point: 'Spaced Repetition',
          description: 'Review material at increasing intervals. This helps move information from short-term to long-term memory.',
          tip: 'Use apps like Anki or create your own spaced repetition schedule.'
        },
        {
          point: 'Interleaving',
          description: 'Mix different topics or types of problems during study sessions instead of focusing on one topic at a time.',
          tip: 'Switch between different subjects every 30-45 minutes.'
        },
        {
          point: 'Elaborative Interrogation',
          description: 'Ask yourself "why" and "how" questions about the material to deepen understanding.',
          tip: 'Create a list of "why" questions for each topic you study.'
        },
        {
          point: 'Dual Coding',
          description: 'Combine verbal and visual information to create multiple pathways for memory retrieval.',
          tip: 'Create mind maps, diagrams, and visual summaries alongside written notes.'
        }
      ]
    },
    {
      id: 'memory-techniques',
      title: '🧠 Memory Techniques',
      icon: '⚡',
      content: [
        {
          point: 'Method of Loci',
          description: 'Associate information with familiar locations to create a mental "memory palace".',
          tip: 'Use your home or a familiar route to place key concepts in specific locations.'
        },
        {
          point: 'Acronyms & Acronyms',
          description: 'Create memorable abbreviations or phrases using the first letters of items you need to remember.',
          tip: 'For example, "HOMES" for the Great Lakes: Huron, Ontario, Michigan, Erie, Superior.'
        },
        {
          point: 'Chunking',
          description: 'Break large amounts of information into smaller, manageable chunks.',
          tip: 'Phone numbers are chunked (555-123-4567) - apply this to other information.'
        },
        {
          point: 'Visualization',
          description: 'Create vivid, unusual, or exaggerated mental images to make information more memorable.',
          tip: 'The more bizarre and colorful the image, the more likely you are to remember it.'
        },
        {
          point: 'Story Method',
          description: 'Create a narrative that connects the information you need to remember.',
          tip: 'Make the story interesting, funny, or dramatic to increase memorability.'
        }
      ]
    },
    {
      id: 'learning-strategies',
      title: '🎓 Learning Strategies',
      icon: '🚀',
      content: [
        {
          point: 'Feynman Technique',
          description: 'Explain concepts in simple terms as if teaching someone else. This reveals gaps in understanding.',
          tip: 'Use analogies and simple language. If you can\'t explain it simply, you don\'t understand it well enough.'
        },
        {
          point: 'Pomodoro Technique',
          description: 'Work in focused 25-minute intervals followed by 5-minute breaks to maintain concentration.',
          tip: 'Use a timer and eliminate distractions during work periods.'
        },
        {
          point: 'SQ3R Method',
          description: 'Survey, Question, Read, Recite, Review - a systematic approach to reading and studying.',
          tip: 'Start by skimming headings and questions before reading the full content.'
        },
        {
          point: 'Bloom\'s Taxonomy',
          description: 'Progress through levels: Remember → Understand → Apply → Analyze → Evaluate → Create.',
          tip: 'Don\'t just memorize facts - practice applying and analyzing the information.'
        },
        {
          point: 'Metacognition',
          description: 'Think about your thinking process. Monitor and regulate your own learning.',
          tip: 'Regularly ask yourself: "What do I know? What don\'t I know? How can I learn more effectively?"'
        }
      ]
    },
    {
      id: 'quiz-strategies',
      title: '🎯 Quiz-Taking Strategies',
      icon: '🏆',
      content: [
        {
          point: 'Read Questions Carefully',
          description: 'Look for keywords like "not", "except", "always", "never" that can change the meaning.',
          tip: 'Underline or highlight key words in the question to avoid misreading.'
        },
        {
          point: 'Process of Elimination',
          description: 'Eliminate obviously wrong answers first to narrow down your choices.',
          tip: 'Cross out answers you know are incorrect, even if you\'re not sure about the right one.'
        },
        {
          point: 'Look for Clues',
          description: 'Other questions or answer choices might provide hints for difficult questions.',
          tip: 'Sometimes the answer to one question is hinted at in another question.'
        },
        {
          point: 'Trust Your First Instinct',
          description: 'Your first answer is usually correct unless you have a good reason to change it.',
          tip: 'Only change answers if you\'re certain the new answer is better.'
        },
        {
          point: 'Manage Your Time',
          description: 'Don\'t spend too much time on any single question. Move on and come back if time permits.',
          tip: 'Allocate time per question and stick to it. Better to answer all questions than to perfect a few.'
        }
      ]
    },
    {
      id: 'brain-health',
      title: '🧘 Brain Health & Performance',
      icon: '💪',
      content: [
        {
          point: 'Adequate Sleep',
          description: '7-9 hours of quality sleep is essential for memory consolidation and cognitive function.',
          tip: 'Maintain a consistent sleep schedule and create a relaxing bedtime routine.'
        },
        {
          point: 'Regular Exercise',
          description: 'Physical activity increases blood flow to the brain and promotes neurogenesis.',
          tip: 'Even 20-30 minutes of moderate exercise can boost cognitive performance.'
        },
        {
          point: 'Healthy Nutrition',
          description: 'Omega-3 fatty acids, antioxidants, and B vitamins support brain health.',
          tip: 'Include fish, nuts, berries, and leafy greens in your diet for optimal brain function.'
        },
        {
          point: 'Stress Management',
          description: 'Chronic stress impairs memory and learning. Practice relaxation techniques.',
          tip: 'Try meditation, deep breathing, or yoga to reduce stress and improve focus.'
        },
        {
          point: 'Mental Stimulation',
          description: 'Keep your brain active with puzzles, reading, learning new skills, and social interaction.',
          tip: 'Challenge yourself with new activities regularly to build cognitive reserve.'
        }
      ]
    }
  ];

  const handleSectionChange = (index) => {
    setActiveSection(index);
  };

  const currentSection = knowledgeSections[activeSection];

  return (
    <div className="general-knowledge-container">
      <div className="container fade-in">
        <div className="knowledge-header">
          <h1>🎓 General Knowledge Hub</h1>
          <p>Expand your learning with these evidence-based study techniques and strategies</p>
        </div>

        <div className="knowledge-navigation">
          <div className="nav-tabs">
            {knowledgeSections.map((section, index) => (
              <button
                key={section.id}
                className={`nav-tab ${activeSection === index ? 'active' : ''}`}
                onClick={() => handleSectionChange(index)}
              >
                <span className="tab-icon">{section.icon}</span>
                <span className="tab-title">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="knowledge-content">
          <div className="content-header">
            <h2>{currentSection.title}</h2>
            <p>Master these techniques to improve your learning and quiz performance</p>
          </div>

          <div className="content-grid">
            {currentSection.content.map((item, index) => (
              <div key={index} className="knowledge-card">
                <div className="card-header">
                  <div className="point-number">{index + 1}</div>
                  <h3 className="point-title">{item.point}</h3>
                </div>
                
                <div className="card-content">
                  <p className="point-description">{item.description}</p>
                  <div className="point-tip">
                    <span className="tip-label">💡 Pro Tip:</span>
                    <span className="tip-text">{item.tip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="knowledge-footer">
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-number">{knowledgeSections.length}</span>
              <span className="stat-label">Learning Areas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {knowledgeSections.reduce((total, section) => total + section.content.length, 0)}
              </span>
              <span className="stat-label">Expert Tips</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Evidence-Based</span>
            </div>
          </div>

          <div className="footer-actions">
            <button
              className="btn btn-primary"
              onClick={onBack}
            >
              ← Back to Quiz
            </button>
            
            <button
              className="btn btn-outline"
              onClick={() => window.location.reload()}
            >
              Take Another Quiz
            </button>
          </div>
        </div>

        <div className="knowledge-motivation">
          <div className="motivation-card">
            <h3>🌟 Remember</h3>
            <p>
              "The expert in anything was once a beginner. Every master was once a disaster. 
              Every pro was once an amateur. The secret to success is to start before you're ready."
            </p>
            <div className="motivation-author">— Robin Sharma</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralKnowledge;

