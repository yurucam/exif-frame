-- npx wrangler d1 execute exif-frame --local --file=./src/extensions/kysely/migrations/007_create_theme_like_table.sql

-- Create themeLike table
CREATE TABLE themeLike (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  themeId INTEGER NOT NULL,
  memberId INTEGER NOT NULL,
  
  FOREIGN KEY (themeId) REFERENCES theme(id) ON DELETE CASCADE,
  FOREIGN KEY (memberId) REFERENCES member(id) ON DELETE CASCADE,
  UNIQUE(themeId, memberId)
);

-- Create indexes for efficient queries
CREATE INDEX idx_theme_like_theme_id ON themeLike(themeId);
CREATE INDEX idx_theme_like_member_id ON themeLike(memberId);
