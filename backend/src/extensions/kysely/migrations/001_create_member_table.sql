-- npx wrangler d1 execute exif-frame --local --file=./src/extensions/kysely/migrations/001_create_member_table.sql

-- Create member table
CREATE TABLE member (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    nickname VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL DEFAULT ''
);

-- Create indexes for better query performance
CREATE INDEX idx_member_name ON member(name);
CREATE INDEX idx_member_role ON member(role);

-- Create trigger to automatically update updatedAt timestamp
CREATE TRIGGER update_member_updated_at
    AFTER UPDATE ON member
    FOR EACH ROW
BEGIN
    UPDATE member SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
