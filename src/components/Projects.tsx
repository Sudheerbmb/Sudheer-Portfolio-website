import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight, CalendarDays } from 'lucide-react';

const Projects = () => {
  const categories = ['All', 'AI/ML', 'Web', 'Data Science', 'DE'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      id: 15,
      title: 'Insight — AI Interview Practice Partner',
      description:
        'Flask web app for role-based mock interviews powered by a multi-agent LLM loop (profiler + grader + interviewer + feedback) with live grading and coding round UI.',
      category: 'AI/ML',
      tags: ['Flask', 'Groq API', 'Multi-agent LLM', 'Python', 'Web Speech API', 'Redis', 'ChromaDB'],
      image: '/insight.png',
      timeframe: 'Apr 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Interview_Agent',
      },
    },
    {
      id: 14,
      title: 'AdmitGuard: AI Admissions Governance',
      description:
        'A distributed framework for high-integrity admissions, leveraging edge-validation, multi-stage AI reasoning, and latent semantic search to prevent identity spoofing.',
      category: 'AI/ML',
      tags: ['Node.js', 'Express', 'React Native', 'Supabase', 'PostgreSQL', 'Groq', 'Socket.io'],
      image: '/placeholder.svg',
      timeframe: 'Apr 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/AdmitGuard',
      },
    },
    {
      id: 13,
      title: 'Education Institution UI Design',
      description:
        'Modern and responsive user interface for an educational institution designed in Figma, focusing on intuitive navigation, accessibility, and visual consistency.',
      category: 'Web',
      tags: ['Figma', 'UI/UX Design', 'Prototyping', 'Education'],
      image: '/Screenshot (42)-Picsart-AiImageEnhancer.png',
      timeframe: 'Nov 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Educational_Website_UI',
      },
    },
    {
      id: 12,
      title: 'Azure-HospitalFlow-Automated-Pipeline',
      description:
        'End-to-end real-time data engineering pipeline for healthcare, analyzing patient flow across hospital departments using Azure Event Hub, Databricks PySpark, and Azure Synapse.',
      category: 'DE',
      tags: ['Azure', 'PySpark', 'Azure Data Factory', 'Azure Synapse', 'Python', 'Databricks', 'Git'],
      image: '/Azure.png',
      timeframe: 'Feb 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Azure-Hospital-Pipeline',
      },
    },
    {
      id: 11,
      title: 'Real-Time Stocks Market Data Pipeline',
      description:
        'End-to-end real-time pipeline: Kafka streaming → Airflow orchestration → Snowflake + DBT transforms → Power BI analytics.',
      category: 'DE',
      tags: ['Snowflake', 'DBT', 'Apache Airflow', 'Apache Kafka', 'Python', 'Docker', 'Power BI'],
      image: '/pipeline.jpeg',
      timeframe: 'Oct 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Snowflake_Stockmarket',
      },
    },
    {
      id: 6,
      title: 'LexEcho:Audio Transcription and Summarization Web App',
      description:
        'Flask web app that transcribes M4A audio files using Whisper, summarizes content with Gemini API, and extracts key topics.',
      category: 'AI/ML',
      tags: ['Flask', 'Whisper', 'Gemini API', 'FFmpeg', 'NLTK', 'Python'],
      image: '/echo.png',
      timeframe: 'Feb 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/LexEcho',
      },
    },
    {
      id: 5,
      title: 'Medical Chatbot using Flask and Groq API',
      description:
        'Flask-based chatbot that responds to medical-related queries using the Groq API with medical keyword filtering.',
      category: 'AI/ML',
      tags: ['Flask', 'Groq API', 'Langchain', 'Python', 'Web Interface'],
      image: '/bot.png',
      timeframe: 'July 2024',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Medical-ChatBot',
      },
    },
    {
      id: 4,
      title: 'Weather ETL Pipeline with Apache Airflow',
      description:
        'ETL pipeline using Apache Airflow to fetch, process, and store weather data from Open-Meteo API into PostgreSQL.',
      category: 'DE',
      tags: ['Apache Airflow', 'ETL', 'PostgreSQL', 'Python', 'API Integration'],
      image: '/pipe.jpg',
      timeframe: 'Mar 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/airflow-weather-pipeline',
      },
    },
    {
      id: 1,
      title: 'MCQ Generator with Flask and AWS Bedrock',
      description:
        'Flask-based MCQ Generator supporting PDF, DOCX, and TXT formats, leveraging AWS Bedrock (Llama 3-8B LLM).',
      category: 'AI/ML',
      tags: ['Flask', 'AWS Bedrock', 'EC2', 'FPDF', 'HTML', 'CSS', 'JS'],
      image: '/mcc.png',
      timeframe: 'Feb 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/EduQuizAI',
      },
    },
    {
      id: 7,
      title: 'Groq Code Forge: Python Code Optimizer',
      description:
        'Web application that optimizes Python code using Groq API, providing complexity analysis and detailed explanations.',
      category: 'AI/ML',
      tags: ['Flask', 'Groq API', 'Langchain', 'Python', 'Code Optimization'],
      image: '/codeopt1.png',
      timeframe: 'Apr 2025',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/CodeOptimizer',
      },
    },
    {
      id: 8,
      title: 'Movie Recommendation System',
      description:
        'Flask-based recommendation system using Collaborative Filtering (SVD) and Content-Based Filtering (TF-IDF with cosine similarity).',
      category: 'AI/ML',
      tags: ['Flask', 'SVD', 'TF-IDF', 'Scikit-learn', 'Surprise', 'Python'],
      image: '/mv.jpg',
      timeframe: 'Dec 2024',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Movie-Recommendation-System',
      },
    },
    {
      id: 2,
      title: 'Breast Cancer Detection System',
      description:
        'Machine learning-based breast cancer classification system using SVM, Linear Regression, and Random Forest.',
      category: 'AI/ML',
      tags: ['SVM', 'Random Forest', 'XGBoost', 'tkinter', 'Python'],
      image: '/bcc.png',
      timeframe: 'Oct 2023',
      links: {
        demo: 'https://youtu.be/ZRLmUZ4y8EQ?feature=shared',
        github: '#',
      },
    },
    {
      id: 3,
      title: 'On Your Own Hotel Booking Analysis',
      description:
        'SQL-based project analyzing customer bookings, hotel details, and payment transactions.',
      category: 'Data Science',
      tags: ['SQL', 'ER Modeling', 'Data Analysis'],
      image: '/sqq.webp',
      timeframe: 'Dec 2023',
      links: {
        demo: 'https://www.linkedin.com/posts/sudheer-kumar-thati_oyo-activity-7058820058365501440-EjDY?utm_source=share&utm_medium=member_android&rcm=ACoAAD22K6MBpe4xT0yI0p1klFV8dXo5fzPWbg4',
        github: '#',
      },
    },
    {
      id: 10,
      title: 'Hospital Management System API',
      description:
        'A comprehensive Spring Boot API for hospital management, featuring CRUD operations for patients, doctors, appointments, departments, and staff with H2 database integration.',
      category: 'Web',
      tags: ['Java', 'Spring Boot', 'Spring Web', 'Spring Data JPA', 'H2 Database', 'RESTful API'],
      image: '/sb.png',
      timeframe: 'Nov 2024',
      links: {
        demo: '#',
        github: 'https://github.com/Sudheerbmb/Hospital_Management_System',
      },
    },
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background/95 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-accent mb-2">Showcase</h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">My Projects</span>
          </h3>
          <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my skills and expertise
            in different areas of development.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              className={
                activeCategory === category
                  ? 'bg-primary hover:bg-primary/90'
                  : 'neon-border'
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-xl overflow-hidden interactive-card"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <Badge className="bg-accent/20 text-accent text-xs">
                    {project.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-foreground/70">
                  <CalendarDays className="w-3 h-3" />
                  <span>{project.timeframe}</span>
                </div>

                <p className="text-foreground/70 text-xs line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-primary/30 text-foreground/80 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <a
                    href={project.links.github}
                    className="text-foreground/80 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length > 6 && !showAll && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(true)}
              className="bg-primary hover:bg-primary/90"
            >
              See More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
