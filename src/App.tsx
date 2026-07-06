import { useMemo, useState } from "react"
import {
  Code2,
  Github,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const avatarSrc = `${import.meta.env.BASE_URL}assets/avatar.gif`

const profile = {
  name: "个人博客",
  title: "后端开发工程师",
  summary: "企业级业务系统开发经验",
}

const skillGroups = [
  {
    label: "后端",
    tone: "red",
    items: ["Java 8", "Spring Boot", "Spring MVC", "MyBatis", "MyBatis-Plus", "Spring Cloud"],
  },
  {
    label: "数据库 / 缓存",
    tone: "blue",
    items: ["MySQL", "Redis", "SQL优化", "索引设计", "事务一致性", "Zookeeper / Dubbo"],
  },
  {
    label: "工程工具",
    tone: "green",
    items: ["Maven", "Git", "Docker", "Nginx", "Postman", "IDEA", "Linux基础部署与日志排查"],
  },
  {
    label: "前端 / 其他",
    tone: "yellow",
    items: ["Vue2 / Vue3", "Element UI", "Layui", "UniApp", "微信小程序接口对接", "第三方设备接口对接"],
  },
] as const

const strengths = [
  "参与交通调度、隧道运维、材料库存、排水管网等企业级业务系统开发与落地。",
  "能独立完成接口设计、数据建模与核心编码。",
  "具备需求分析、业务流程梳理、后端开发、前后端联调到 Nginx / Docker 部署上线的完整项目经验。",
  "熟悉 RBAC 权限设计、工单流转、库存一致性、车辆状态流转、报表统计等企业系统常见场景。",
]

const projects = [
  {
    id: "ride-hailing",
    name: "交通枢纽网约车管理平台",
    label: "核心项目",
    date: "核心阶段",
    stack: "Spring Boot、MyBatis-Plus、Redis、MySQL、Nginx、Docker、Vue3、UniApp",
    description:
      "面向交通枢纽网约车上客区的数据管理与调度平台，通过对接道闸、车位诱导相机、摄像头等第三方设备，完成车辆入场、在场、入库、出库、滞留预警、小程序查询和大屏展示。",
    highlights: [
      "负责中台与小程序后端主要开发，完成需求逻辑分析、接口设计、核心业务编码和前后端联调。",
      "设计车辆状态流转模型，并沉淀入场记录、出场记录、出库记录和时间线数据。",
      "基于 Redis / Cache 缓存滞留规则、广播内容等高频可变参数。",
    ],
  },
  {
    id: "materials",
    name: "美术馆材料管理系统",
    label: "全栈项目",
    date: "独立交付",
    stack: "Java 8、Spring Boot、MyBatis-Plus、Redis、MySQL、Nginx、Vue3、JavaScript",
    description:
      "用于施工现场材料管理，覆盖采购、领用、余料、组织架构、报表统计等流程，实现材料采购、领用、库存、报表的闭环管理。",
    highlights: [
      "独立负责系统从 0 到 1 的技术选型、架构设计、后端编码、前端联调及生产环境 Nginx 部署。",
      "设计 RBAC 权限模型，支持角色、菜单、按钮级权限控制和基于角色的动态路由加载。",
      "设计材料流转与库存扣减逻辑，通过事务控制保障数据一致性。",
    ],
  },
  {
    id: "tunnel",
    name: "隧道管理维护系统",
    label: "运维业务",
    date: "长期维护",
    stack: "Spring Boot、MyBatis、MySQL、Redis、Maven、Layui",
    description:
      "用于隧道运营维护管理，覆盖设备管理、运维养护、人事考勤、备件工具管理、车辆管理等模块，实现维护资源的数字化管理与调度。",
    highlights: [
      "负责核心业务模块后端开发与接口设计，参与任务拆分、数据库表设计、后期维护和问题排查。",
      "实现设备全生命周期管理，包括入库、巡检、维修、报废等后端服务与持久化逻辑。",
      "实现备件 / 工具库存管理，并通过 MySQL 事务保障库存状态一致。",
    ],
  },
  {
    id: "drainage",
    name: "排水管网资产管理业务子系统",
    label: "资产平台",
    date: "平台建设",
    stack: "Spring Cloud、MyBatis、Redis、MySQL、Zookeeper、Vue、Element UI",
    description:
      "城市排水管网资产智能化管理平台，支持管道、设备、节点等资产数据管理、维护记录管理、数据分析报告和风险统计。",
    highlights: [
      "参与资产管理、统计分析、报表简报等后端模块开发，完成数据查询、聚合统计和接口联调。",
      "使用 MyBatis 操作 MySQL，实现 CRUD、复杂查询和导入导出校验。",
      "利用 Redis 缓存高频访问数据，优化资产统计和报表查询性能。",
    ],
  },
]

const posts = [
  {
    category: "状态机",
    title: "车辆状态流转：从入场到出库的时间线设计",
    excerpt: "把入场、正在停车、入库、出库拆成可追踪节点，让大屏、小程序和中台共享一套业务事实。",
    notes: ["入场记录、出场记录、出库记录分开沉淀。", "Redis / Cache 承接滞留规则和广播内容。", "小程序、中台、大屏共用同一套状态事实。"],
  },
  {
    category: "权限",
    title: "RBAC 权限模型：角色、菜单与按钮级控制",
    excerpt: "围绕角色、菜单、按钮级权限与动态路由加载，整理企业系统里最常见的权限落点。",
    notes: ["角色控制业务边界。", "菜单与按钮级权限控制页面能力。", "基于角色加载动态路由。"],
  },
  {
    category: "事务",
    title: "库存一致性：采购、领用与盘点里的事务边界",
    excerpt: "材料流转和备件工具管理都离不开一致性，事务边界决定库存数据能否扛住真实流程。",
    notes: ["采购、领用、库存变化保持同一事务视角。", "备件 / 工具覆盖入库、借用、归还、盘点。", "MySQL 事务保障库存状态一致。"],
  },
  {
    category: "性能",
    title: "报表查询提速：索引与缓存的组合拳",
    excerpt: "从设备、库存、车辆列表到统计报表，索引结构和 Redis 缓存让高频查询更稳。",
    notes: ["关键列表查询优先处理索引结构。", "高频访问数据进入 Redis 缓存。", "统计与报表接口减少重复数据库访问。"],
  },
]

const timeline = [
  {
    company: "企业级业务系统开发经历",
    role: "软件工程师",
    date: "近期",
    content:
      "负责多个企业级业务系统开发，包括网约车管理平台、隧道管理维护系统、材料管理系统等。",
  },
  {
    company: "信息化平台开发经历",
    role: "Java研发工程师",
    date: "早期",
    content: "参与城市排水、防汛决策等信息化系统开发，负责后端业务模块、数据统计、报表简报及后期维护。",
  },
]

function App() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id)
  const [activePostTitle, setActivePostTitle] = useState(posts[0].title)
  const [burst, setBurst] = useState<{ x: number; y: number; key: number } | null>(null)

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId],
  )

  function showBurst(event: React.MouseEvent<HTMLElement>) {
    setBurst({ x: event.clientX, y: event.clientY, key: Date.now() })
  }

  return (
    <main className="min-h-screen overflow-hidden bg-comic-paper text-comic-ink">
      {burst ? (
        <div
          key={burst.key}
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
          style={{ left: burst.x, top: burst.y }}
        >
          <div className="burst-pop">POW!</div>
        </div>
      ) : null}

      <nav className="sticky top-0 z-40 border-b-4 border-comic-ink bg-comic-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="font-display text-3xl text-comic-red [text-shadow:2px_2px_0_#000]">
            DEV!
          </a>
          <div className="hidden items-center gap-2 text-sm font-black uppercase md:flex">
            <a href="#skills" className="comic-link">
              技能装备
            </a>
            <a href="#projects" className="comic-link">
              项目连载
            </a>
            <a href="#blog" className="comic-link">
              技术手记
            </a>
            <a href="#story" className="comic-link">
              经历档案
            </a>
          </div>
          <Button asChild variant="red" size="sm">
            <a href="#projects">
              <Rocket />
              项目
            </a>
          </Button>
        </div>
      </nav>

      <section id="top" className="relative">
        <div className="speed-field" />
        <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:py-10">
          <div className="comic-panel hero-panel animate-panel-pop p-5 sm:p-7 lg:p-9">
            <Badge variant="blue" className="mb-5 text-sm">
              Backend Hero File
            </Badge>
            <h1 className="font-display text-6xl leading-none text-comic-red [text-shadow:4px_4px_0_#000,8px_8px_0_#FFD700] sm:text-7xl lg:text-8xl">
              {profile.name}
            </h1>
            <div className="mt-5 max-w-2xl border-y-4 border-comic-ink bg-white px-3 py-4 shadow-comicSm">
              <p className="text-2xl font-black leading-tight sm:text-3xl">{profile.title}</p>
              <p className="mt-2 text-lg font-extrabold text-comic-graphite">{profile.summary}</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="blue" size="lg">
                <a href="#projects">
                  <Rocket />
                  看项目
                </a>
              </Button>
            </div>
          </div>

          <aside className="relative animate-panel-pop [animation-delay:.12s]">
            <div className="sound-word">BOOM!</div>
            <div className="portrait-panel">
              <img src={avatarSrc} alt="项目头像" className="h-full w-full object-cover" />
            </div>
            <div className="speech-bubble">
              <p>把业务流程拆成可靠接口、状态流转和可维护的数据模型。</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="skills" className="section-band bg-comic-graphite text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionTitle kicker="Issue 01" title="技能装备" inverse />
          <div className="mt-8 grid gap-5 lg:grid-cols-4">
            {skillGroups.map((group, index) => (
              <article
                key={group.label}
                className={cn("comic-panel dark-panel p-5 animate-panel-pop", index % 2 === 0 ? "-rotate-1" : "rotate-1")}
              >
                <Badge variant={group.tone} className="mb-4">
                  {group.label}
                </Badge>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="skill-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="comic-panel yellow-panel p-6">
            <SectionTitle kicker="Origin" title="能力优势" compact />
            <p className="mt-5 text-xl font-black leading-relaxed">
              Java 后端开发、业务流程拆解、接口设计、数据建模、联调上线，是这份档案里的主线。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((item, index) => (
              <div key={item} className="mini-panel">
                <span className="font-display text-4xl text-comic-blue [text-shadow:2px_2px_0_#000]">
                  0{index + 1}
                </span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-band bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionTitle kicker="Issue 02" title="项目连载" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="grid gap-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={(event) => {
                    setActiveProjectId(project.id)
                    showBurst(event)
                  }}
                  className={cn("project-tab", activeProjectId === project.id && "project-tab-active")}
                >
                  <span>{project.label}</span>
                  <strong>{project.name}</strong>
                  <small>{project.date}</small>
                </button>
              ))}
            </div>
            <article className="comic-panel project-page p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge variant="red">{activeProject.label}</Badge>
                  <h3 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">{activeProject.name}</h3>
                  <p className="mt-2 text-lg font-extrabold text-comic-graphite">{activeProject.date}</p>
                </div>
                <Code2 className="h-12 w-12 text-comic-blue" strokeWidth={3} />
              </div>
              <p className="mt-5 border-y-4 border-comic-ink bg-comic-yellow px-4 py-3 text-sm font-black leading-relaxed">
                技术栈：{activeProject.stack}
              </p>
              <p className="mt-5 text-lg font-bold leading-relaxed">{activeProject.description}</p>
              <div className="mt-6 grid gap-3">
                {activeProject.highlights.map((highlight) => (
                  <div key={highlight} className="highlight-row">
                    <Zap className="mt-1 h-5 w-5 shrink-0 text-comic-red" fill="currentColor" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionTitle kicker="Issue 03" title="技术手记" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post.title}
              className={cn(
                "blog-card",
                index === 1 || index === 2 ? "blog-card-blue" : "",
                activePostTitle === post.title && "blog-card-active",
              )}
            >
              <Badge variant={index % 2 === 0 ? "green" : "blue"}>{post.category}</Badge>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              {activePostTitle === post.title ? (
                <ul className="blog-notes">
                  {post.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
              <Button
                variant={index % 2 === 0 ? "red" : "default"}
                onClick={(event) => {
                  setActivePostTitle(post.title)
                  showBurst(event)
                }}
              >
                <Sparkles />
                阅读
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="section-band bg-comic-blue text-comic-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionTitle kicker="Issue 04" title="经历档案" />
          <div className="mt-8">
            <div className="space-y-4">
              {timeline.map((item) => (
                <article key={`${item.company}-${item.date}`} className="timeline-panel">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="yellow">{item.date}</Badge>
                    <h3>{item.company}</h3>
                  </div>
                  <p className="mt-2 text-lg font-black">{item.role}</p>
                  <p className="mt-3 text-base font-bold leading-relaxed">{item.content}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-comic-ink bg-comic-graphite px-4 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-lg font-black">Java后端开发工程师 · 企业级业务系统开发</p>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="icon" aria-label="查看项目">
              <a href="#projects">
                <Github />
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </main>
  )
}

function SectionTitle({
  kicker,
  title,
  inverse = false,
  compact = false,
}: {
  kicker: string
  title: string
  inverse?: boolean
  compact?: boolean
}) {
  return (
    <div className={cn("flex flex-wrap items-end gap-3", compact && "block")}>
      <Badge variant={inverse ? "yellow" : "blue"} className="mb-2">
        {kicker}
      </Badge>
      <h2
        className={cn(
          "font-display leading-none text-comic-red [text-shadow:3px_3px_0_#000,6px_6px_0_#FFD700]",
          compact ? "mt-3 text-5xl" : "text-5xl sm:text-6xl",
          inverse && "text-white [text-shadow:3px_3px_0_#000,6px_6px_0_#E23636]",
        )}
      >
        {title}
      </h2>
    </div>
  )
}

export default App
