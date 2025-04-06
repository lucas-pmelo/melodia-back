export const INSERT_ARTIST = (columns: string, params: string) =>
  `INSERT INTO artists (${columns}) VALUES (${params})`;
