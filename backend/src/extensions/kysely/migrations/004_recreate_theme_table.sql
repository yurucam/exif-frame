-- npx wrangler d1 execute exif-frame --local --file=./src/extensions/kysely/migrations/004_recreate_theme_table.sql

-- Drop existing theme table and recreate with new columns
DROP TABLE IF EXISTS theme;

-- Create theme table with all required columns
CREATE TABLE theme (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  memberId INTEGER NOT NULL,
  
  name TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  svg TEXT NOT NULL,
  
  -- 통계 필드
  likeCount INTEGER NOT NULL DEFAULT 0,
  downloadCount INTEGER NOT NULL DEFAULT 0,
  
  FOREIGN KEY (memberId) REFERENCES member(id) ON DELETE CASCADE
);

-- Create indexes for efficient queries
CREATE INDEX idx_theme_member_id ON theme(memberId);
CREATE INDEX idx_theme_like_count ON theme(likeCount);
CREATE INDEX idx_theme_download_count ON theme(downloadCount);
CREATE INDEX idx_theme_created_at ON theme(createdAt);
