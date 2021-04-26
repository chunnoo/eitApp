CREATE SCHEMA IF NOT EXISTS eit AUTHORIZATION mathiaschunnoo;

create table eit.accounts (
  id serial not null,
  username varchar(16) not null,
  saltedhash varchar(64),
  imagePath varchar(64),
  primary key(id)
);

create table eit.challenges (
  id serial not null,
  name varchar(32) not null,
  description text not null,
  info text,
  points integer not null,
  imagePath varchar(64),
  primary key(id)
);

create table eit.notifications (
  id serial not null,
  userId integer not null,
  received timestamp not null,
  read boolean not null,
  notification text not null,
  primary key(id),
  foreign key(userId)
    references eit.accounts(id)
);

create table eit.activechallenges (
  userId integer not null,
  challengeId integer not null,
  started timestamp not null,
  primary key(userId, challengeId),
  foreign key(userId)
    references eit.accounts(id),
  foreign key(challengeId)
    references eit.challenges(id)
);

create table eit.sentchallenges (
  senderId integer not null,
  receiverId integer not null,
  challengeId integer not null,
  message text,
  primary key(senderId, receiverId, challengeId),
  foreign key(senderId)
    references eit.accounts(id),
  foreign key(receiverId)
    references eit.accounts(id),
  foreign key(challengeId)
    references eit.challenges(id)
);

create table eit.posts (
  id serial not null,
  userId integer not null,
  challengeId integer not null,
  posted timestamp not null,
  content text,
  imagePath varchar(64),
  primary key(id),
  foreign key(userId)
    references eit.accounts(id),
  foreign key(challengeId)
    references eit.challenges(id)
);

create table eit.follows (
  followerId integer not null,
  followingId integer not null,
  primary key(followerId, followingId),
  foreign key(followerId)
    references eit.accounts(id),
  foreign key(followingId)
    references eit.accounts(id)
);

CREATE TABLE eit.session (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE eit.session ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON eit.session ("expire");
