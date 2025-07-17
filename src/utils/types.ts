export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  image: string
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  email: string
  phone: string
  location: string
  bio: string
}

export interface Skills {
  frontend: string[]
  backend: string[]
  tools: string[]
}

export interface Social {
  github: string
  linkedin: string
  twitter: string
}