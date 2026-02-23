'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaArrowUpRightFromSquare, FaCheck } from 'react-icons/fa6';

type Tab = 'fullstack' | 'automation' | 'python' | 'gamedev' | 'motion';
type FullStackFilter = 'all' | 'webapp' | 'mobile';

interface ProjectCard {
  title: string;
  description: string;
  tags: string[];
  subCategory?: 'webapp' | 'mobile';
  status?: 'live' | 'in-progress';
  link?: string;
  externalLink?: string;
  externalLinkLabel?: string;
  images?: WorkflowScreenshot[];
}

interface VideoCard {
  title: string;
  description: string;
  vimeoId: string;
}

interface WorkflowScreenshot {
  platform: string;
  src: string;
  orientation?: 'portrait';
}

interface AutomationProject {
  title: string;
  description: string;
  tools: string[];
  metrics: string[];
  toolReasoning: string;
  status: 'live' | 'in-progress';
  images?: WorkflowScreenshot[];
}

const fullStackProjects: ProjectCard[] = [
  {
    title: 'GoWater Web App',
    description:
      'HR portal for NXTLVL Water Technology built with Next.js and Supabase. Manages employee records, attendance, and shift scheduling — the source system the n8n attendance automation pipeline integrates with.',
    tags: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'TypeScript'],
    subCategory: 'webapp',
    externalLink: 'https://portal.gowatervendo.com',
    externalLinkLabel: 'Visit Portal',
    images: [{ platform: 'HR Portal', src: '/images/gowater%20hr%20portal%20webapp.png' }],
  },
  {
    title: 'GoWater Mobile App',
    description:
      'Companion React Native app in the same monorepo as the HR portal. Field staff use it to log check-in, check-out, and break events on-site — the same events that feed the n8n attendance and compliance pipeline.',
    tags: ['React Native', 'Supabase'],
    subCategory: 'mobile',
    images: [{ platform: 'HR Portal Mobile', src: '/images/gowater%20hr%20portal%20mobile%20app.png', orientation: 'portrait' }],
  },
  {
    title: 'Nextpick',
    description:
      'Fast movie search and discovery app. Accurate genre, rating, and release filters make it easy to find and pick your next film in seconds.',
    tags: ['Next.js', 'React', 'Redux', 'Tailwind CSS'],
    subCategory: 'webapp',
    externalLink: 'https://nextpick.vercel.app/',
    images: [{ platform: 'Nextpick', src: '/images/nextpick%20movie%20app.png' }],
  },
  {
    title: 'Vending Machine Controller',
    description:
      'Embedded system for automated water dispensing and remote telemetry using C++ and Arduino.',
    tags: ['C++', 'Arduino', 'IoT'],
  },
];


const automationProjects: AutomationProject[] = [
  {
    title: 'Lead Capture → AI Scoring → CRM',
    description:
      'n8n workflow that receives inbound form submissions via webhook, sends the lead data to Claude AI for scoring, and routes the result into a CRM. Claude reads the name, company, message, and budget — then classifies the lead as hot, warm, or cold with a one-sentence reason. Built in two versions: HubSpot (free CRM, clean API) and GoHighLevel (for agency clients with built-in email sequences).',
    tools: ['n8n', 'HubSpot', 'Claude AI'],
    metrics: [
      'Lead scored by Claude AI in under 3 seconds from form submission',
      'Three-tier routing: hot → In Progress, warm → Open, cold → Unqualified',
      'Two CRM versions built — HubSpot and GoHighLevel',
    ],
    toolReasoning:
      'n8n owns the entire pipeline — webhook trigger, Claude AI integration, conditional routing, and CRM API call — because it has the best code and AI nodes for stateful logic. No need for Zapier as a middleman when n8n handles the webhook natively. HubSpot is used for its free contacts API; a GHL version exists for agency clients who need built-in follow-up sequences.',
    status: 'live',
    images: [
      { platform: 'HubSpot version', src: '/images/n8n%20lead%20capture%20hubspot.png' },
      { platform: 'GHL version', src: '/images/n8n%20lead%20capture%20GHL.png' },
    ],
  },
  {
    title: 'Content Generation → Approval → Auto-Publish',
    description:
      'Three-tool pipeline for AI-assisted content creation with a mandatory human approval step before anything goes live. n8n receives a topic and tone via webhook, calls Claude AI to generate a full blog post and social caption, then forwards the draft to Make. Make emails the editor the full draft with Approve and Reject buttons and waits for a response. Once approved, Make triggers Zapier which publishes the blog post to WordPress and queues the social caption in Buffer.',
    tools: ['n8n', 'Make', 'Zapier'],
    metrics: [
      'Claude generates a full blog post + social caption in under 5 seconds',
      'Human approval gate — nothing publishes without editor sign-off',
      'Approved content posts to WordPress and queues to Buffer in one step',
    ],
    toolReasoning:
      'n8n owns the AI layer — it has the best Claude integration and code nodes for structured content generation. Make owns the approval gate because it is purpose-built for visual workflows that pause and wait for human input via webhook — no other tool handles this as cleanly. Zapier owns the publishing step because it has the deepest native connectors for WordPress and Buffer, making the final publish a single reliable step.',
    status: 'live',
    images: [
      { platform: 'n8n — AI Generation', src: '/images/02-content%20generation%20n8n.png' },
      { platform: 'Make — Approval Gate', src: '/images/02-content%20generation%20make.png' },
      { platform: 'Zapier — Auto Publish', src: '/images/02-content%20generation%20zapier.png' },
    ],
  },
  {
    title: 'GoWater HR Attendance & Compliance Tracker',
    description:
      'Production n8n workflow processing real-time check-in, check-out, and break events from the GoWater web and mobile apps. HMAC-verified webhooks calculate regular hours, overtime, undertime, and break compliance against Philippine labour law, then post threaded Slack messages per employee. A scheduled 6 PM PHT trigger fetches team-wide metrics and delivers an automated daily attendance summary with absent list.',
    tools: ['n8n', 'Slack', 'Supabase'],
    metrics: [
      'Real-time Slack notifications threaded per employee per day',
      'Auto-calculates OT, undertime & break compliance — Philippine labour law',
      'Scheduled 6 PM daily team summary with absent list and OT totals',
    ],
    toolReasoning:
      'n8n handles stateful webhook processing, conditional event routing, and scheduled triggers. Slack is the team notification layer with native thread chaining per employee. Supabase stores attendance records and thread timestamps for reply continuity.',
    status: 'live',
    images: [
      { platform: 'n8n', src: '/images/automations/gowater-attendance-workflow.png' },
    ],
  },
  {
    title: 'Invoice → Stripe Payment Tracking → Follow-up',
    description:
      'Three-tool pipeline that automates the entire post-invoice lifecycle. Make listens for Stripe webhook events and routes on the first decision — paid or unpaid. Paid payments trigger Zapier immediately to send a confirmation email. Failed payments are forwarded to n8n, which calculates how many days the invoice has been overdue and routes to the appropriate reminder — day 3, day 7, or day 14 final notice — each dispatched by Zapier via Gmail.',
    tools: ['Make', 'n8n', 'Zapier'],
    metrics: [
      'Payment confirmation email sent within 30 seconds of Stripe event',
      'Overdue reminders fire automatically at day 3, 7, and 14',
      'Zero manual invoice follow-up required',
    ],
    toolReasoning:
      'Make owns the Stripe webhook layer because it excels at watching external events and making the first routing decision cleanly. n8n owns the overdue logic because calculating days and branching across three conditions is exactly what its code and switch nodes are built for. Zapier owns email delivery because its Gmail integration is the most reliable for transactional sequences — no configuration overhead.',
    status: 'live',
    images: [
      { platform: 'Make — Stripe Routing', src: '/images/03%20-%20invoice%20payment%20make.png' },
      { platform: 'n8n — Overdue Logic', src: '/images/03%20-%20invoice%20payment%20n8n.png' },
      { platform: 'Zapier — Confirmation', src: '/images/03%20-%20invoice%20zap%201.png' },
      { platform: 'Zapier — Reminders', src: '/images/03%20-%20invoice%20zap%202.png' },
    ],
  },
];

const pythonProjects: ProjectCard[] = [
  {
    title: 'GameSync — Port Forwarding & Game Macros',
    description:
      'Desktop app built with Python and Tkinter for PC fighting game players. One-click port forwarding for Tekken 8, Street Fighter 6, MK1, and more. Includes a keyboard and controller macro system with frame-perfect timing, and AI-powered auto grab-break detection via direct Tekken 8 memory reading or OpenCV screen analysis.',
    tags: ['Python', 'Tkinter', 'OpenCV', 'psutil', 'pynput'],
    images: [{ platform: 'GameSync', src: '/images/GameSync%20Portfowarding%20%26%20Game%20macros.png' }],
  },
  {
    title: 'Personal QR Code Generator',
    description:
      'Permanent, reusable QR code generator built with Python and Tkinter. Designed for use cases like business cards and printed menus where the QR code must stay valid even when the destination URL changes — decoupled from any single link.',
    tags: ['Python', 'Tkinter', 'qrcode'],
    images: [{ platform: 'QR Generator', src: '/images/persona%20qr%20code%20generator.png' }],
  },
];

const gameDevVideos: VideoCard[] = [
  {
    title: 'Interactive RPG Battle System',
    description:
      'Interactive RPG battle system built in Unreal Engine with Blueprints and custom 3D modeling. Play in fullscreen — enable it in Vimeo settings.',
    vimeoId: '1028652000',
  },
];

const motionVideos: VideoCard[] = [
  {
    title: 'Motion Graphics Portfolio',
    description:
      'Motion graphics portfolio made with After Effects, Premiere, and Photoshop. Best viewed in fullscreen — click the Vimeo settings to enable it.',
    vimeoId: '1028812584',
  },
  {
    title: 'Explainer Video Pitch',
    description:
      'Explainer videos crafted with motion graphics and stock footage. Watch in fullscreen for the best experience — enable it in Vimeo settings.',
    vimeoId: '1028649558',
  },
  {
    title: 'Intro Animation',
    description:
      'Motion graphics intro for a school project aimed at combating fake news propaganda. Watch in fullscreen for the best experience.',
    vimeoId: '1028648399',
  },
];

const tabs: { id: Tab; label: string }[] = [
  { id: 'fullstack',   label: 'Full Stack'      },
  { id: 'automation', label: 'AI Automation'    },
  { id: 'python',     label: 'Python / Desktop' },
  { id: 'gamedev',    label: 'Game Dev'         },
  { id: 'motion',     label: 'Motion Graphics'  },
];

const fullStackSubFilters: { id: FullStackFilter; label: string }[] = [
  { id: 'all',    label: 'All'      },
  { id: 'webapp', label: 'Web App'  },
  { id: 'mobile', label: 'Mobile App' },
];


const toolBadgeClass: Record<string, string> = {
  Zapier:   'border-blue-500/30 bg-blue-500/10 text-blue-400',
  n8n:      'border-orange-500/30 bg-orange-500/10 text-orange-400',
  Make:     'border-purple-500/30 bg-purple-500/10 text-purple-400',
  GHL:      'border-green-500/30 bg-green-500/10 text-green-400',
  HubSpot:  'border-amber-500/30 bg-amber-500/10 text-amber-400',
  Slack:    'border-violet-500/30 bg-violet-500/10 text-violet-400',
  Supabase: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
};

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<Tab>('fullstack');
  const [fullStackFilter, setFullStackFilter] = useState<FullStackFilter>('all');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as Tab;
    if (tab && tabs.some((t) => t.id === tab)) {
      setActiveTab(tab);
    }
    const filter = params.get('filter') as FullStackFilter;
    if (filter && fullStackSubFilters.some((f) => f.id === filter)) {
      setFullStackFilter(filter);
    }
  }, []);

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    if (tab !== 'fullstack') setFullStackFilter('all');
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tab);
    params.delete('filter');
    window.history.replaceState({}, '', `?${params.toString()}#portfolio`);
  }

  function handleFilterChange(filter: FullStackFilter) {
    setFullStackFilter(filter);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', 'fullstack');
    if (filter === 'all') params.delete('filter');
    else params.set('filter', filter);
    window.history.replaceState({}, '', `?${params.toString()}#portfolio`);
  }

  const visibleFullStack =
    fullStackFilter === 'all'
      ? fullStackProjects
      : fullStackProjects.filter((p) => p.subCategory === fullStackFilter);

  const cardProjects: ProjectCard[] =
    activeTab === 'fullstack' ? visibleFullStack : pythonProjects;

  return (
    <section id="portfolio" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            My Work
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">My Portfolio</h2>
        </div>

        {/* Tab bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={
                activeTab === tab.id
                  ? 'rounded-full px-5 py-2 text-sm font-semibold bg-accent text-white transition-colors'
                  : 'rounded-full border border-border px-5 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary'
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Full Stack sub-filters */}
        {activeTab === 'fullstack' && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {fullStackSubFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={
                  fullStackFilter === filter.id
                    ? 'rounded-full px-4 py-1.5 text-sm font-medium bg-accent text-white transition-colors'
                    : 'rounded-full border border-border px-4 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary'
                }
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Tab content */}
        <div className="mt-12">
          {(['fullstack', 'python'] as Tab[]).includes(activeTab) && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cardProjects.map((project) => (
                <div
                  key={project.title}
                  className="relative flex flex-col rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border-hover"
                >
                  {project.status && (
                    <span
                      className={
                        project.status === 'live'
                          ? 'absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-semibold text-success border border-success/30 bg-success/10'
                          : 'absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-semibold text-warning border border-warning/30 bg-warning/10'
                      }
                    >
                      {project.status === 'live' ? 'Live' : 'In Progress'}
                    </span>
                  )}
                  <h3 className="font-semibold text-text-primary pr-20">{project.title}</h3>
                  {project.images && project.images.length > 0 && (
                    <div className={project.images.length > 1 ? 'mt-3 grid grid-cols-2 gap-2' : ''}>
                      {project.images.map((img) => (
                        <a
                          key={img.platform}
                          href={img.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative mt-3 block overflow-hidden rounded-xl border-2 border-accent/40 shadow-[0_0_18px_rgba(126,34,206,0.25)] transition-all hover:border-accent/70 hover:shadow-[0_0_28px_rgba(126,34,206,0.45)]"
                        >
                          <div
                            className={
                              img.orientation === 'portrait'
                                ? 'mx-auto aspect-[9/19.5] w-full max-w-[160px] overflow-hidden'
                                : 'aspect-video w-full overflow-hidden'
                            }
                          >
                            <img
                              src={img.src}
                              alt={`${img.platform} screenshot`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          </div>
                          <span className="absolute bottom-2 right-2 rounded-md border border-white/15 bg-black/55 px-2 py-0.5 text-xs font-medium text-white/65 backdrop-blur-sm">
                            {img.platform}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-bg-secondary px-2 py-1 text-xs text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <Link
                      href={project.link}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      View Demo
                      <FaArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                  {project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      {project.externalLinkLabel ?? 'Visit Site'}
                      <FaArrowUpRightFromSquare className="h-3 w-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'automation' && (
            <>
            <p className="mb-10 text-center text-sm leading-relaxed text-text-secondary max-w-2xl mx-auto">
              I have built automations hands-on with n8n, Make, Zapier, and GoHighLevel — each workflow below uses the right tool for each job, not the same tool for every job.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {automationProjects.map((project) => (
                <div
                  key={project.title}
                  className="relative flex flex-col rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-text-primary leading-snug">{project.title}</h3>
                    <span
                      className={
                        project.status === 'live'
                          ? 'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold text-success border border-success/30 bg-success/10'
                          : 'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold text-warning border border-warning/30 bg-warning/10'
                      }
                    >
                      {project.status === 'live' ? 'Live' : 'In Progress'}
                    </span>
                  </div>

                  {project.images && project.images.length > 0 && (
                    <div className={project.images.length > 1 ? 'mt-3 grid grid-cols-2 gap-2' : ''}>
                      {project.images.map((img, idx) => (
                        <a
                          key={img.platform}
                          href={img.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group relative mt-0 block overflow-hidden rounded-xl border-2 border-accent/40 shadow-[0_0_18px_rgba(126,34,206,0.25)] transition-all hover:border-accent/70 hover:shadow-[0_0_28px_rgba(126,34,206,0.45)]${project.images!.length === 3 && idx === 2 ? ' col-span-2' : ''}`}
                        >
                          <div
                            className={
                              img.orientation === 'portrait'
                                ? 'mx-auto aspect-[9/19.5] w-full max-w-[160px] overflow-hidden'
                                : 'aspect-video w-full overflow-hidden'
                            }
                          >
                            <img
                              src={img.src}
                              alt={`${img.platform} workflow`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          </div>
                          <span className="absolute bottom-2 right-2 rounded-md border border-white/15 bg-black/55 px-2 py-0.5 text-xs font-medium text-white/65 backdrop-blur-sm">
                            {img.platform}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`rounded-md border px-2 py-1 text-xs font-medium ${toolBadgeClass[tool] ?? 'border-border bg-bg-secondary text-text-secondary'}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 flex flex-col gap-1.5">
                    {project.metrics.map((metric) => (
                      <li key={metric} className="flex items-start gap-2 text-sm text-text-secondary">
                        <FaCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-text-muted">
                    <span className="font-medium text-text-secondary not-italic">Why this stack: </span>
                    <em>{project.toolReasoning}</em>
                  </p>
                </div>
              ))}
            </div>
            </>
          )}

          {(['gamedev', 'motion'] as Tab[]).includes(activeTab) && (
            <div className="grid gap-8 sm:grid-cols-2">
              {(activeTab === 'gamedev' ? gameDevVideos : motionVideos).map((video) => (
                <div
                  key={video.title}
                  className="overflow-hidden rounded-xl border border-border bg-bg-card transition-colors hover:border-border-hover"
                >
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={`https://player.vimeo.com/video/${video.vimeoId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-text-primary">{video.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {video.description}
                    </p>
                    <a
                      href={`https://player.vimeo.com/video/${video.vimeoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      Watch Video
                      <FaArrowUpRightFromSquare className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
