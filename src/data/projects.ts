export interface Project {
  name: string
  description: string
  techStack: string[]
  role: string
  period: string
  liveUrl?: string
  sourceUrl?: string
}

export const projectsData: Project[] = [
  {
    name: '银行数据仓库建设与数据开发平台升级项目',
    period: '2024.11 – 至今',
    role: '数仓开发工程师',
    description:
      '为银行构建数据仓库及开发平台升级，整合多源数据，搭建标准分层数仓体系与实时数据处理链路，实现数据集成、加工、治理与服务化输出。',
    techStack: ['Informatica', 'Oracle', 'Linux', 'Shell', 'SQL'],
  },
  {
    name: '1104与金融统计监管报送系统',
    period: '2024.11 – 至今',
    role: '数据开发工程师',
    description:
      '建设1104非现场报表与金融统计数据报送体系，支撑全行监管数据采集、加工、校验与上报全流程，主导统一法人改革落地。',
    techStack: ['Oracle', 'SQL', 'WebLogic', 'Linux', 'Shell'],
  },
  {
    name: '银行绩效管理系统',
    period: '2023.03 – 2024.10',
    role: '数据开发工程师',
    description:
      '支撑全行经营分析、部门KPI考核与员工绩效核算，整合核心业务系统数据源，构建统一绩效指标体系，涵盖数据采集到报表输出全流程。',
    techStack: ['DM8', 'Shell', 'DMDIS', 'SQL', 'SFTP'],
  },
]
