/*Create skill table and dump data*/
CREATE TABLE IF NOT EXISTS skill(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, creatorId INTEGER);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (1, 'Android App', 1);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (2, 'iOS App', 1);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (3, 'Software', 1);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (4, 'Finance', 2);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (5, 'Project', 2);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (6, 'UI and UX', 3);