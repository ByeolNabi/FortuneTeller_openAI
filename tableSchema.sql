CREATE TABLE `user_info` (
	`user_id`	varchar(100)	NOT NULL,
	`pw`	varchar(100)	NULL,
	`name`	varchar(100)	NULL
);

CREATE TABLE `fortune_relation` (
	`user_id`	varchar(100)	NOT NULL,
	`fortune_id`	int	NOT NULL
);

CREATE TABLE `fortune_info` (
	`fortune_id`	int	NOT NULL,
	`fortune_data`	varchar(100)	NULL,
	`fortune_date`	TIMESTAMP	NULL,
	`public`	boolean	NULL
);

ALTER TABLE `user_info` ADD CONSTRAINT `PK_USER_INFO` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `fortune_relation` ADD CONSTRAINT `PK_FORTUNE_RELATION` PRIMARY KEY (
	`user_id`,
	`fortune_id`
);

ALTER TABLE `fortune_info` ADD CONSTRAINT `PK_FORTUNE_INFO` PRIMARY KEY (
	`fortune_id`
);

ALTER TABLE `fortune_relation` ADD CONSTRAINT `FK_user_info_TO_fortune_relation_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user_info` (
	`user_id`
);

ALTER TABLE `fortune_relation` ADD CONSTRAINT `FK_fortune_info_TO_fortune_relation_1` FOREIGN KEY (
	`fortune_id`
)
REFERENCES `fortune_info` (
	`fortune_id`
);

