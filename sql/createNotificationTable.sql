CREATE TABLE updates (
    update_id SERIAL PRIMARY KEY,
    org_id INT REFERENCES organizations(org_id),
    title VARCHAR(100) NOT NULL,
    content TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
