-- npx wrangler d1 execute exif-frame --local --file=./src/extensions/kysely/migrations/006_create_theme_tag_table.sql

-- Create themeTag table (many-to-many relationship)
CREATE TABLE themeTag (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  themeId INTEGER NOT NULL,
  tagId INTEGER NOT NULL,
  
  FOREIGN KEY (themeId) REFERENCES theme(id) ON DELETE CASCADE,
  FOREIGN KEY (tagId) REFERENCES tag(id) ON DELETE CASCADE,
  UNIQUE(themeId, tagId)
);

-- Create indexes for efficient queries
CREATE INDEX idx_theme_tag_theme_id ON themeTag(themeId);
CREATE INDEX idx_theme_tag_tag_id ON themeTag(tagId);
