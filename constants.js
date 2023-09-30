const fetchAllCharacters = async () => {
  const response = await fetch("./data.json")

  if (!response.ok) {
    throw new Error("Failed to fetch data.json")
  }

  return response.json()
}

export const { cards: ALL_CHARACTERS } = await fetchAllCharacters();

export const ALL_DIFICULTIES = {
  easy: {
    mode: "easy",
    val: 4
  },
  normal: {
    mode: "normal",
    val: 6
  },
  hard: {
    mode: "hard",
    val: 8
  },
  xD: {
    mode: "xD",
    val: 18
  }
}

export const DEFAULT_DIFFICULTY = ALL_DIFICULTIES.easy;