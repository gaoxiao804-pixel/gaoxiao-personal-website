export interface Education {
  degree: string
  school: string
  period: string
  note?: string
}

export interface WorkExperience {
  title: string
  company: string
  period: string
  description: string[]
}

export interface ProjectSummary {
  name: string
  role: string
  period: string
  description: string
  responsibilities: string[]
  techStack: string[]
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ResumeData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  github?: string
  education: Education[]
  experience: WorkExperience[]
  skills: SkillCategory[]
  certifications: { name: string; level: string; date: string; issuer: string }[]
  projects: ProjectSummary[]
}

export const resumeData: ResumeData = {
  name: '高筱',
  title: '数据工程师',
  email: 'gaoxiao@example.com',
  phone: '18893986727',
  location: '陕西省西安市',
  github: 'github.com/gaoxiao',
  education: [
    {
      degree: '本科 · 数据科学与大数据技术',
      school: '兰州城市学院',
      period: '2018 – 2022',
    },
  ],
  experience: [
    {
      title: '数据工程师',
      company: '东方国信科技股份有限公司',
      period: '2024.11 – 至今',
      description: [
        '负责银行数据仓库建设与数据开发平台升级，整合核心业务、渠道、财务等多源数据',
        '搭建标准分层数仓体系与实时数据处理链路',
        '负责ETL流程设计与开发、任务监控与异常处理',
      ],
    },
    {
      title: '数据工程师',
      company: '东华软件股份公司',
      period: '2023.03 – 2024.10',
      description: [
        '负责银行绩效管理系统ETL流程设计与开发',
        '使用Shell脚本及DMDIS调度工具构建批量调度体系',
        '负责DM8数据库迁移、部署及日常运维',
      ],
    },
  ],
  skills: [
    {
      category: '数据库',
      items: ['Oracle', '达梦数据库', 'Greenplum', 'GBase', 'MySQL', 'Hive', 'Doris'],
    },
    {
      category: 'ETL / 调度',
      items: ['Informatica', 'DMDIS', 'DMETL', 'Shell'],
    },
    {
      category: '大数据生态',
      items: ['Kafka', 'Flink', 'Hadoop', 'Spark', 'HDFS', 'Yarn'],
    },
    {
      category: '开发语言',
      items: ['SQL', 'Shell', 'Python'],
    },
    {
      category: '操作系统',
      items: ['Linux'],
    },
  ],
  certifications: [
    {
      name: '大数据技术应用证书',
      level: '高级',
      date: '2022.12.12',
      issuer: '工业和信息化部教育与考试中心',
    },
  ],
  projects: [
    {
      name: '银行数据仓库建设与数据开发平台升级项目',
      role: '数仓开发工程师',
      period: '2024.11 – 至今',
      description:
        '为银行构建数据仓库及开发平台升级，整合核心业务、渠道、财务等多源数据，搭建标准分层数仓体系与实时数据处理链路，实现数据集成、加工、治理与服务化输出。',
      responsibilities: [
        '负责多源系统数据接入与ETL开发，完成ODS/DWD/DWA层数据加工与模型开发',
        '基于Informatica完成数据抽取、转换及加载，保障数据准确性与稳定性',
        '负责批量ETL任务监控与异常处理，快速定位字段异常、连接超时及跑批失败等问题',
        '参与数据开发平台升级及运维，完成Linux环境部署、日志分析及系统问题排查',
      ],
      techStack: ['Informatica', 'Oracle', 'Linux', 'Shell'],
    },
    {
      name: '1104与金融统计监管报送系统',
      role: '数据开发工程师',
      period: '2024.11 – 至今',
      description:
        '面向银保监会监管要求，建设1104非现场报表与金融统计数据报送体系，支撑全行监管数据采集、加工、校验与上报全流程。',
      responsibilities: [
        '主导统一法人改革相关数据迁移及监管报表改造，完成1104及金融统计报表取数逻辑重构',
        '负责监管指标口径梳理、总分核对及异常数据排查，解决跨系统数据差异及数据不平问题',
        '完成日报、旬报、月报、季报等多类监管报表改造与上线',
        '负责Oracle存储过程开发及SQL性能优化，提升报表取数效率与系统稳定性',
        '负责WebLogic服务部署、系统环境初始化及权限配置',
      ],
      techStack: ['Oracle', 'SQL', 'Linux', 'WebLogic'],
    },
    {
      name: '银行绩效管理系统',
      role: '数据开发工程师',
      period: '2023.03 – 2024.10',
      description:
        '银行绩效管理系统用于支撑全行经营分析、部门KPI考核与员工绩效核算，整合核心业务系统数据源，构建统一绩效指标体系。',
      responsibilities: [
        '负责绩效系统ETL流程设计与开发，实现SFTP自动取数、数据清洗及自动化入库',
        '使用Shell脚本及DMDIS调度工具构建批量调度体系，实现任务自动化运行',
        '开发与维护绩效指标存储过程，优化SQL逻辑，提升任务执行效率',
        '负责DM8数据库迁移、部署及日常运维，保障系统稳定运行',
      ],
      techStack: ['DM8', 'Shell', 'DMDIS', 'SQL', 'SFTP'],
    },
  ],
}
