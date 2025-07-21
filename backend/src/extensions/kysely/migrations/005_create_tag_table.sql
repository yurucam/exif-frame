-- npx wrangler d1 execute exif-frame --local --file=./src/extensions/kysely/migrations/005_create_tag_table.sql

-- Create tag table
CREATE TABLE tag (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  usageCount INTEGER NOT NULL DEFAULT 0
);

-- Create index for tag name
CREATE INDEX idx_tag_name ON tag(name);

-- Create index for usage count (for sorting)
CREATE INDEX idx_tag_usage_count ON tag(usageCount);
