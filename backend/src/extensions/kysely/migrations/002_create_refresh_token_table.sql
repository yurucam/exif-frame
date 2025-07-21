-- npx wrangler d1 execute exif-frame --local --file=./src/extensions/kysely/migrations/002_create_refresh_token_table.sql

-- Create refresh_token table
CREATE TABLE refresh_token (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    token VARCHAR(255) NOT NULL UNIQUE,
    memberId INTEGER NOT NULL,
    expiresAt TIMESTAMP NOT NULL,
    isRevoked BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (memberId) REFERENCES member(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_refresh_token_token ON refresh_token(token);
CREATE INDEX idx_refresh_token_member_id ON refresh_token(memberId);
CREATE INDEX idx_refresh_token_expires_at ON refresh_token(expiresAt);

-- Create trigger to automatically update updatedAt timestamp
CREATE TRIGGER update_refresh_token_updated_at
    AFTER UPDATE ON refresh_token
    FOR EACH ROW
BEGIN
    UPDATE refresh_token SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
