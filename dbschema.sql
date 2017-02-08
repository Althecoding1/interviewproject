CREATE TABLE Users(
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(255),
  name VARCHAR(100),
  password VARCHAR(255),
  email VARCHAR(150),
  PRIMARY KEY ( id )
);
