import React from 'react';
import {
  FaPython, FaJava, FaAws, FaDocker, FaNodeJs, FaReact, FaFigma, FaBrain, FaDatabase, FaGitAlt,
  FaCode, FaMicrochip, FaFilePdf, FaCalculator, FaChartLine, FaDraftingCompass, FaSitemap, FaRunning,
  FaStar, FaPlug, FaNetworkWired, FaChartPie, FaChartBar, FaGoogle, FaExclamationTriangle, FaLayerGroup
} from 'react-icons/fa';
import {
  SiPostgresql, SiApacheairflow, SiSpringboot, SiFlask,
  SiFastapi, SiPytorch, SiTensorflow, SiOpencv, SiSpacy,
  SiPandas, SiScikitlearn, SiMongodb,
  SiSnowflake, SiDbt, SiApachekafka, SiRedis, SiSupabase,
  SiTailwindcss, SiJavascript, SiTypescript, SiMeta, SiGooglegemini,
  SiOpenai, SiAnthropic, SiHuggingface, SiApachespark,
  SiMysql, SiSqlite, SiNumpy, SiScipy, SiTableau, SiHtml5, SiCss3, SiExpress,
  SiSocketdotio, SiDatabricks, SiFfmpeg, SiAmazonec2, SiLangchain
} from 'react-icons/si';
import { VscAzure, VscWindow } from 'react-icons/vsc';

const ICON_MAPPINGS = [
  // AI / LLM / Data Science
  { match: /gemini/i, icon: <SiGooglegemini className="text-[#8E75FF]" /> },
  { match: /openai|gpt|whisper/i, icon: <SiOpenai className="text-[#10a37f]" /> },
  { match: /anthropic|claude/i, icon: <SiAnthropic className="text-[#D97757]" /> },
  { match: /llama|meta/i, icon: <SiMeta className="text-[#0668E1]" /> },
  { match: /hugging|face/i, icon: <SiHuggingface className="text-[#FFD21E]" /> },
  { match: /groq/i, icon: <FaMicrochip className="text-[#F26522]" /> },
  { match: /langchain/i, icon: <SiLangchain className="text-[#121212] dark:text-white" /> },
  { match: /tensorflow/i, icon: <SiTensorflow className="text-[#FF6F00]" /> },
  { match: /pytorch/i, icon: <SiPytorch className="text-[#EE4C2C]" /> },
  { match: /opencv/i, icon: <SiOpencv className="text-[#5C3EE8]" /> },
  { match: /pandas/i, icon: <SiPandas className="text-[#150458]" /> },
  { match: /scikit/i, icon: <SiScikitlearn className="text-[#F7931E]" /> },
  { match: /numpy/i, icon: <SiNumpy className="text-[#013243]" /> },
  { match: /scipy/i, icon: <SiScipy className="text-[#8CAAE6]" /> },
  { match: /spacy/i, icon: <SiSpacy className="text-[#09A3D5]" /> },
  { match: /nlp|nltk|llm|reasoning/i, icon: <FaBrain className="text-[#FF6B6B]" /> },
  { match: /xgboost|random forest|svm|regression/i, icon: <FaChartLine className="text-[#FFD700]" /> },
  { match: /svd|tfidf|tf-idf|cosine/i, icon: <FaCalculator className="text-gray-400" /> },

  // Frameworks & Languages
  { match: /python/i, icon: <FaPython className="text-[#3776AB]" /> },
  { match: /flask/i, icon: <SiFlask className="text-white opacity-80" /> },
  { match: /fastapi/i, icon: <SiFastapi className="text-[#05998b]" /> },
  { match: /spring|boot|spring web|spring data/i, icon: <SiSpringboot className="text-[#6DB33F]" /> },
  { match: /java/i, icon: <FaJava className="text-[#007396]" /> },
  { match: /node/i, icon: <FaNodeJs className="text-[#339933]" /> },
  { match: /express/i, icon: <SiExpress className="text-white opacity-80" /> },
  { match: /react/i, icon: <FaReact className="text-[#61DAFB]" /> },
  { match: /html/i, icon: <SiHtml5 className="text-[#E34F26]" /> },
  { match: /css/i, icon: <SiCss3 className="text-[#1572B6]" /> },
  { match: /js|javascript/i, icon: <SiJavascript className="text-[#F7DF1E]" /> },
  { match: /ts|typescript/i, icon: <SiTypescript className="text-[#3178C6]" /> },
  { match: /tailwind/i, icon: <SiTailwindcss className="text-[#06B6D4]" /> },

  // Cloud & DE
  { match: /azure/i, icon: <VscAzure className="text-[#0089D6]" /> },
  { match: /aws|bedrock/i, icon: <FaAws className="text-[#FF9900]" /> },
  { match: /ec2/i, icon: <SiAmazonec2 className="text-[#FF9900]" /> },
  { match: /google|cloud|oauth/i, icon: <FaGoogle className="text-[#4285F4]" /> },
  { match: /snowflake/i, icon: <SiSnowflake className="text-[#29B5E8]" /> },
  { match: /databricks/i, icon: <SiDatabricks className="text-[#FF3621]" /> },
  { match: /dbt/i, icon: <SiDbt className="text-[#FF694B]" /> },
  { match: /kafka/i, icon: <SiApachekafka className="text-white opacity-80" /> },
  { match: /airflow/i, icon: <SiApacheairflow className="text-[#017CEE]" /> },
  { match: /spark|pyspark/i, icon: <SiApachespark className="text-[#E25A1C]" /> },
  { match: /docker/i, icon: <FaDocker className="text-[#2496ED]" /> },
  { match: /github|git/i, icon: <FaGitAlt className="text-[#F05032]" /> },

  // Databases & Backend
  { match: /postgres/i, icon: <SiPostgresql className="text-[#336791]" /> },
  { match: /mongodb/i, icon: <SiMongodb className="text-[#47A248]" /> },
  { match: /redis/i, icon: <SiRedis className="text-[#DC382D]" /> },
  { match: /supabase/i, icon: <SiSupabase className="text-[#3ECF8E]" /> },
  { match: /mysql/i, icon: <SiMysql className="text-[#4479A1]" /> },
  { match: /sqlite/i, icon: <SiSqlite className="text-[#003B57]" /> },
  { match: /socket/i, icon: <SiSocketdotio className="text-white opacity-80" /> },
  { match: /rest|api/i, icon: <FaNetworkWired className="text-emerald-500" /> },
  { match: /sql|db/i, icon: <FaDatabase className="text-[#336791]" /> },

  // Analytics & Tools
  { match: /power bi/i, icon: <FaChartBar className="text-[#F2C811]" /> },
  { match: /tableau/i, icon: <SiTableau className="text-[#E97627]" /> },
  { match: /figma/i, icon: <FaFigma className="text-[#F24E1E]" /> },
  { match: /sentry/i, icon: <FaExclamationTriangle className="text-[#362D59]" /> },
  { match: /ffmpeg/i, icon: <SiFfmpeg className="text-[#007800]" /> },
  { match: /pdf|fpdf/i, icon: <FaFilePdf className="text-red-500" /> },
  { match: /ui\/ux|design/i, icon: <FaDraftingCompass className="text-purple-400" /> },
  { match: /prototyping|education/i, icon: <FaLayerGroup className="text-blue-400" /> },
  { match: /data analysis/i, icon: <FaChartPie className="text-orange-400" /> },
  { match: /er model/i, icon: <FaSitemap className="text-indigo-400" /> },
  { match: /optimization/i, icon: <FaRunning className="text-green-400" /> },
  { match: /integration/i, icon: <FaPlug className="text-yellow-500" /> },
  { match: /tkinter|gui/i, icon: <VscWindow className="text-blue-500" /> },
  { match: /surprise/i, icon: <FaStar className="text-yellow-400" /> }
];

export const getTechIcon = (tech: string) => {
  for (const mapping of ICON_MAPPINGS) {
    if (mapping.match.test(tech)) {
      return mapping.icon;
    }
  }
  return <FaCode className="text-foreground/40" />;
};
