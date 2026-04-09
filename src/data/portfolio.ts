
import { 
  FaPython, FaJava, FaAws, FaDocker, FaNodeJs, FaReact, FaFigma, FaBrain, FaDatabase, FaGitAlt, 
  FaMicrosoft, FaGoogle, FaExclamationTriangle, FaBolt, FaChartBar, FaCloud, FaStream, FaCode,
  FaMicrochip, FaRobot, FaMicrophone, FaLayerGroup, FaFilePdf, FaCalculator, FaNetworkWired,
  FaChartPie, FaChartLine, FaDraftingCompass, FaSitemap, FaPlug, FaRunning, FaStar, FaLink
} from 'react-icons/fa';
import { 
  SiPostgresql, SiApacheairflow, SiSpringboot, SiFlask,
  SiFastapi, SiPytorch, SiTensorflow, SiOpencv, SiSpacy,
  SiPandas, SiScikitlearn, SiMongodb,
  SiSnowflake, SiDbt, SiApachekafka, SiRedis, SiSupabase,
  SiTailwindcss, SiJavascript, SiTypescript, SiMeta, SiGooglegemini,
  SiOpenai, SiAnthropic, SiHuggingface, SiStreamlit, SiApachespark,
  SiMysql, SiSqlite, SiNumpy, SiScipy, SiTableau, SiHtml5, SiCss3, SiExpress,
  SiSocketdotio, SiDatabricks, SiFfmpeg, SiAmazonec2, SiPostman, SiMicrosoftpowerbi,
  SiLangchain, SiApache, SiC, SiCplusplus
} from 'react-icons/si';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'AI/ML' | 'Web' | 'Data Science' | 'DE';
  tags: string[];
  image: string;
  timeframe: string;
  links: {
    demo: string;
    github: string;
  };
}

export const projects: Project[] = [
  {
    id: 15,
    title: 'Insight — AI Interview Practice Partner',
    description: 'Flask web app for role-based mock interviews powered by a multi-agent LLM loop (profiler + grader + interviewer + feedback) with live grading and coding round UI. practice with adaptive questions, scoring, and a final feedback report.',
    category: 'AI/ML',
    tags: ['Flask', 'Groq API', 'Multi-agent LLM', 'Python', 'Web Speech API', 'Redis', 'ChromaDB'],
    image: '/Screenshot (270).png',
    timeframe: 'Apr 2025',
    links: {
      demo: '#',
      github: 'https://github.com/Sudheerbmb/Interview_Agent',
    },
  },
  {
    id: 14,
    title: 'AdmitGuard: AI Admissions Governance',
    description: 'A distributed framework for high-integrity admissions, leveraging edge-validation, multi-stage AI reasoning, and latent semantic search to prevent identity spoofing. incorporates Google OAuth, Redis caching, Sentry tracking, and Xenova embeddings.',
    category: 'AI/ML',
    tags: ['Node.js', 'Express', 'React Native', 'Supabase', 'PostgreSQL', 'Groq', 'Socket.io', 'Google OAuth', 'Redis', 'Sentry', 'Xenova'],
    image: '/Screenshot (269).png',
    timeframe: 'Apr 2025',
    links: {
      demo: '#',
      github: 'https://github.com/Sudheerbmb/AdmitGuard',
    },
  },
  {
    id: 12,
    title: 'Azure-HospitalFlow-Automated-Pipeline',
    description: 'End-to-end real-time data engineering pipeline for healthcare, analyzing patient flow across hospital departments using Azure Event Hub, Databricks PySpark, and Azure Synapse.',
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
    description: 'End-to-end real-time pipeline: Kafka streaming → Airflow orchestration → Snowflake + DBT transforms → Power BI analytics.',
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
    description: 'Flask web app that transcribes M4A audio files using Whisper, summarizes content with Gemini API, and extracts key topics.',
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
    description: 'Flask-based chatbot that responds to medical-related queries using the Groq API with medical keyword filtering.',
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
    description: 'ETL pipeline using Apache Airflow to fetch, process, and store weather data from Open-Meteo API into PostgreSQL.',
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
    description: 'Flask-based MCQ Generator supporting PDF, DOCX, and TXT formats, leveraging AWS Bedrock (Llama 3-8B LLM).',
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
    description: 'Web application that optimizes Python code using Groq API, providing complexity analysis and detailed explanations.',
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
    description: 'Flask-based recommendation system using Collaborative Filtering (SVD) and Content-Based Filtering (TF-IDF with cosine similarity).',
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
    description: 'Machine learning-based breast cancer classification system using SVM, Linear Regression, and Random Forest.',
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
    description: 'SQL-based project analyzing customer bookings, hotel details, and payment transactions.',
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
    description: 'A comprehensive Spring Boot API for hospital management, featuring CRUD operations for patients, doctors, appointments, departments, and staff with H2 database integration.',
    category: 'Web',
    tags: ['Java', 'Spring Boot', 'Spring Web', 'Spring Data JPA', 'H2 Database', 'RESTful API'],
    image: '/sb.png',
    timeframe: 'Nov 2024',
    links: {
      demo: '#',
      github: 'https://github.com/Sudheerbmb/Hospital_Management_System',
    },
  },
  {
    id: 13,
    title: 'Education Institution UI Design',
    description: 'Modern and responsive user interface for an educational institution designed in Figma, focusing on intuitive navigation, accessibility, and visual consistency.',
    category: 'Web',
    tags: ['Figma', 'UI/UX Design', 'Prototyping', 'Education'],
    image: '/Screenshot (42)-Picsart-AiImageEnhancer.png',
    timeframe: 'Nov 2025',
    links: {
      demo: '#',
      github: 'https://github.com/Sudheerbmb/Educational_Website_UI',
    },
  },
];

export const workExperience = [
  {
    id: 1,
    title: 'Data Science Intern',
    company: 'Futurense Technologies',
    period: 'June 2024 - Aug 2024',
    logo: '/fut1.jpg',
    description: 'Led data-driven initiatives to optimize business processes and develop innovative healthcare solutions.',
    details: [
      {
        section: 'Data Analysis & Insights',
        content: 'Conducted comprehensive analysis of 20,000+ marketing campaign data points using Python and advanced statistical methods. Developed predictive models achieving 95% accuracy in customer behavior prediction, enabling targeted marketing strategies and improved campaign ROI.'
      },
      {
        section: 'Machine Learning Development',
        content: 'Engineered and deployed a sophisticated machine learning model using Python and scikit-learn, achieving 87% accuracy in capital investment prediction. Implemented dynamic counselor allocation system, optimizing resource utilization and improving service delivery efficiency by 30%.'
      },
      {
        section: 'Healthcare Application Development',
        content: 'Designed and implemented a full-stack medical web application featuring an AI-powered chatbot for patient queries and a diabetes prediction model with 85% precision. Integrated medicine booking system and reduced average patient wait time by 40%, significantly improving healthcare service delivery.'
      }
    ],
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Web Development', 'AI', 'Healthcare Tech'],
  },
];

export const education = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    logo: '/lpu.png',
    period: '2022 - 2026',
    description: 'CGPA: 8.99',
  },
  {
    id: 2,
    degree: '12th with Science',
    institution: 'Narayana Junior College',
    location: 'Kadapa, Andhra Pradesh',
    logo: '/nar.avif',
    period: '2019 - 2021',
    description: 'Percentage: 97.5%',
  },
  {
    id: 3,
    degree: '10th with Science',
    institution: 'Sri Chaitanya Techno School',
    location: 'Rajampet, Andhra Pradesh',
    logo: '/chai.jpeg',
    period: '2018 - 2019',
    description: 'CGPA: 10',
  },
];

export const certifications = [
  {
    id: 1,
    name: 'Python for Data Science',
    issuer: 'Learnbay',
    date: 'Feb 2025',
    logo: '/lb.png',
    certificateImage: '/LB.jpg',
    link: 'https://invoice-lb.s3.us-east-2.amazonaws.com/certificate/SUDHEER-KUMARTue-Feb-18-2025-05-34-16-GMT-0000--Coordinated-Universal-Time--2284gv3r.pdf',
    overview: 'Mastered Python programming fundamentals, data structures, and libraries like NumPy, Pandas, and Matplotlib. Gained expertise in data manipulation, visualization, and statistical analysis techniques essential for data science projects.'
  },
  {
    id: 2,
    name: 'Azure Data Scientist Associate',
    issuer: 'Microsoft',
    date: 'Dec 2024',
    logo: '/mc.jpg',
    certificateImage: '/mic.jpg',
    link: 'https://learn.microsoft.com/en-us/users/sudheerkumar-3457/credentials/8ce2fb3bcb6c5bbe',
    overview: 'Acquired skills in implementing machine learning solutions on Azure, including data preparation, model training, deployment, and monitoring. Learned to use Azure Machine Learning service, Azure Databricks, and Azure Synapse Analytics for end-to-end ML workflows.'
  },
  {
    id: 3,
    name: 'Azure Data Fundamentals',
    issuer: 'Microsoft',
    date: 'Dec 2024',
    logo: '/mc.jpg',
    certificateImage: '/mic0.jpg',
    link: 'https://learn.microsoft.com/en-us/users/sudheerkumar-3457/credentials/cf40454706fe3de6',
    overview: 'Gained foundational knowledge of core data concepts, relational and non-relational data, and data analytics. Learned about Azure data services, including Azure SQL Database, Azure Cosmos DB, and Azure Synapse Analytics.'
  },
];

export const skillCategories = [
  {
    title: "Programming Languages",
    items: [
      { name: 'Python', icon: FaPython },
      { name: 'Java', icon: FaJava },
      { name: 'C', icon: SiC },
      { name: 'C++', icon: SiCplusplus },
    ]
  },
  {
    title: "Databases & Cloud",
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Redis', icon: SiRedis },
      { name: 'AWS', icon: FaAws },
    ]
  },
  {
    title: "Data Engineering & ML",
    items: [
      { name: 'Hadoop', icon: SiApache },
      { name: 'Airflow', icon: SiApacheairflow },
      { name: 'Pandas', icon: SiPandas },
      { name: 'Scikit-learn', icon: SiScikitlearn },
    ]
  }
];

export const frameworks = [
  { name: 'Flask', icon: SiFlask },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Spring Boot', icon: SiSpringboot },
];

export const deepLearningSkills = [
  { name: 'PyTorch', icon: SiPytorch },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'OpenCV', icon: SiOpencv },
  { name: 'SpaCy', icon: SiSpacy },
];

export const softSkills = [
  'Problem-Solving & Analytical Thinking',
  'Team Collaboration',
  'Creativity & Innovation',
  'Adaptability',
  'Technical Communication'
];

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  videoUrl?: string;
  blogUrl?: string;
  isVideo: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Feature Matching Using Data Structures: Dating Interface Implementation',
    excerpt: 'Advanced dating interface leveraging hash tables and linked lists to optimize user compatibility and engagement. The platform integrates psychological assessment for enhanced match accuracy.',
    image: 'ds.jpg',
    category: 'Data Structures',
    date: 'May 10, 2023',
    readTime: '09:54 min watch',
    videoUrl: 'https://youtu.be/NgPlMRwBrwU?feature=shared',
    isVideo: true,
  },
  {
    id: 2,
    title: 'Breast Cancer Detection System: Machine Learning Implementation',
    excerpt: 'Cancer prediction system utilizing Pandas for data preprocessing, implementing Logistic Regression, SVM, and Random Forest models achieving 97% accuracy, with a user-friendly Tkinter GUI.',
    image: 'bc.jpg',
    category: 'Machine Learning',
    date: 'Apr 15, 2023',
    readTime: '32:33 min watch',
    videoUrl: 'https://youtu.be/ZRLmUZ4y8EQ?feature=shared',
    isVideo: true,
  },
  {
    id: 4,
    title: 'Kadapa: The Land of Minerals and Energy',
    excerpt: 'Kadapa district, located in the Rayalaseema region of Andhra Pradesh, is known for its rich mineral resources and significant contributions to India\'s energy sector. This blog delves into the district\'s geological importance, highlighting its vast reserves of uranium, barytes, limestone, and asbestos.',
    image: 'kp.webp',
    category: 'Geography',
    date: 'Feb 28, 2025',
    readTime: '8 min read',
    isVideo: false,
    blogUrl: 'https://cuddapah-geostudy.blogspot.com/2025/02/kadapa-land-of-minerals-energy.html',
  },
];
