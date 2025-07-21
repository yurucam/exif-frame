-- npx wrangler d1 execute exif-frame --local --file=./src/extensions/kysely/migrations/003_rename_refresh_token_to_refreshToken.sql

-- Drop existing indexes and trigger
DROP INDEX IF EXISTS idx_refresh_token_token;
DROP INDEX IF EXISTS idx_refresh_token_member_id;
DROP INDEX IF EXISTS idx_refresh_token_expires_at;
DROP TRIGGER IF EXISTS update_refresh_token_updated_at;

-- Create new refreshToken table
CREATE TABLE refreshToken (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    token VARCHAR(255) NOT NULL UNIQUE,
    memberId INTEGER NOT NULL,
    expiresAt TIMESTAMP NOT NULL,
    isRevoked BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (memberId) REFERENCES member(id) ON DELETE CASCADE
);

-- Copy data from old table to new table
INSERT INTO refreshToken (id, createdAt, updatedAt, token, memberId, expiresAt, isRevoked)
SELECT id, createdAt, updatedAt, token, memberId, expiresAt, isRevoked
FROM refresh_token;

-- Drop old table
DROP TABLE refresh_token;

-- Create indexes for better query performance
CREATE INDEX idx_refreshToken_token ON refreshToken(token);
CREATE INDEX idx_refreshToken_member_id ON refreshToken(memberId);
CREATE INDEX idx_refreshToken_expires_at ON refreshToken(expiresAt);

-- Create trigger to automatically update updatedAt timestamp
CREATE TRIGGER update_refreshToken_updated_at
    AFTER UPDATE ON refreshToken
    FOR EACH ROW
BEGIN
    UPDATE refreshToken SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
