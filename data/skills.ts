import rawSkills from "./skills.json"

export interface Skill {
  name: string
  description: string
  tags: string[]
  installation: string
  author: string
  stars: string
  installs: string
  series?: string
  skillsUrl?: string
  repositoryUrl?: string
}

// Transform raw JSON data to the format expected by our components
export const skills: Skill[] = rawSkills.map((raw) => ({
  name: raw.skill_name,
  description: raw.description,
  tags: [raw.tag],
  installation: raw.install_method,
  author: raw.author,
  stars: raw.github_stars,
  installs: raw.installs,
  series: raw.skill_series,
  skillsUrl: raw.skills_url,
  repositoryUrl: raw.repository_url,
}))
