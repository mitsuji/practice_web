-- sqlite3 db/practice.sqlite3 < sql/init.sql

DROP TABLE TTest1;

CREATE TABLE TTest1 (
     testId INTEGER PRIMARY KEY AUTOINCREMENT
    ,testNum INTEGER
    ,testText TEXT
);

INSERT INTO TTest1(testNum,testText) VALUES (100,'ABCD1234');
INSERT INTO TTest1(testNum,testText) VALUES (200,'ABCD2234');
