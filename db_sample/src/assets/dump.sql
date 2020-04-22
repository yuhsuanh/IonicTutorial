/*Create developer table and dump data*/
CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, img TEXT);
INSERT or IGNORE INTO developer VALUES (1, 'Sean', 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/old_man_male_portrait-512.png');
INSERT or IGNORE INTO developer VALUES (2, 'Winnie', 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/sloth_lazybones_sluggard_avatar-512.png');
INSERT or IGNORE INTO developer VALUES (3, 'Amula', 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avocado_scream_avatar_food-512.png');

/*Create skill table and dump data*/
CREATE TABLE IF NOT EXISTS skill(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, creatorId INTEGER);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (1, 'Android App', 1);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (2, 'iOS App', 1);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (3, 'Software', 1);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (4, 'Finance', 2);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (5, 'Project', 2);
INSERT or IGNORE INTO skill (id, name, creatorId) VALUES (6, 'UI and UX', 3);