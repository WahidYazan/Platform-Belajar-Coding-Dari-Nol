import { tutorials, type Tutorial } from "./tutorials"

export const curriculumOrder = [
  "Dasar",
  "HTML",
  "CSS",
  "JavaScript",
  "Tools",
  "Backend",
  "React",
  "Deployment",
]

export type CurriculumGroup = {
  category: string
  items: Tutorial[]
}

export function getCurriculum(): CurriculumGroup[] {
  const grouped = new Map<string, Tutorial[]>()
  for (const tutorial of tutorials) {
    const list = grouped.get(tutorial.category)
    if (list) {
      list.push(tutorial)
    } else {
      grouped.set(tutorial.category, [tutorial])
    }
  }
  return curriculumOrder
    .map((category) => ({ category, items: grouped.get(category) ?? [] }))
    .filter((group) => group.items.length > 0)
}
