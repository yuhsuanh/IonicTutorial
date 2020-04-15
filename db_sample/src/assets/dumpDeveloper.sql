/*Create developer table and dump data*/
CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, skills TEXT, img TEXT);
INSERT or IGNORE INTO developer VALUES (1, 'Sean', '', 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/old_man_male_portrait-512.png');
INSERT or IGNORE INTO developer VALUES (2, 'Winnie', '', 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/sloth_lazybones_sluggard_avatar-512.png');
INSERT or IGNORE INTO developer VALUES (3, 'Amula', '', 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avocado_scream_avatar_food-512.png');