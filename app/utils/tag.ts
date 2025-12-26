export const sortTags = (tags: Tag[]): Tag[] => {
  const typesOrder: Record<string, number> = {
    category: 1,
    artist: 2
  }
  return tags.sort((a: Tag, b: Tag) => typesOrder[a.type]! - typesOrder[b.type]!)
}