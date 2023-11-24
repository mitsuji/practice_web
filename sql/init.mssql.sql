use [master];
GO

IF DB_ID('practice') IS NOT NULL
BEGIN
  ALTER DATABASE [practice] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  ALTER DATABASE [practice] SET MULTI_USER;
  DROP DATABASE [practice];
  DROP LOGIN [practice_admin];
  DROP LOGIN [practice_rw];
END
GO

CREATE DATABASE [practice];
ALTER DATABASE [practice] SET COMPATIBILITY_LEVEL = 140;
ALTER DATABASE [practice] SET ALLOW_SNAPSHOT_ISOLATION ON;
ALTER DATABASE [practice] SET READ_COMMITTED_SNAPSHOT ON;
CREATE LOGIN [practice_admin] WITH PASSWORD=N'prac_adm-1234';
CREATE LOGIN [practice_rw] WITH PASSWORD=N'prac_rw-1234';
GO

use [practice];
GO

CREATE USER [admin] FOR LOGIN [practice_admin] WITH DEFAULT_SCHEMA=[dbo];
CREATE USER [rw] FOR LOGIN [practice_rw] WITH DEFAULT_SCHEMA=[dbo];
ALTER ROLE [db_owner] ADD MEMBER [admin];
ALTER ROLE [db_datareader] ADD MEMBER [rw];
ALTER ROLE [db_datawriter] ADD MEMBER [rw];
GO



---
--- Auto DROPs
---
DECLARE @Name varchar(128)
DECLARE @Type varchar(2)
DECLARE CUR CURSOR LOCAL FOR
    SELECT name, type FROM sys.objects
    where (type = N'SO' OR type = N'FN' OR type = N'U' OR type = N'V' OR type = N'P')

OPEN CUR;

FETCH NEXT FROM CUR
INTO @Name, @Type;

WHILE @@FETCH_STATUS = 0
BEGIN

  IF @Type = 'P'
    BEGIN
      DECLARE @DropProcedureSQL nvarchar(max);
      SET @DropProcedureSQL = N'DROP PROCEDURE [dbo].[' + @Name + N']';
      EXEC sp_executesql
      @DropProcedureSQL;
    END

  IF @Type = 'V'
    BEGIN
      DECLARE @DropViewSQL nvarchar(max);
      SET @DropViewSQL = N'DROP VIEW [dbo].[' + @Name + N']';
      EXEC sp_executesql
      @DropViewSQL;
    END

  IF @Type = 'U'
    BEGIN
      DECLARE @DropTableSQL nvarchar(max);
      SET @DropTableSQL = N'DROP TABLE [dbo].[' + @Name + N']';
      EXEC sp_executesql
      @DropTableSQL;
    END

  IF @Type = 'FN'
    BEGIN
      DECLARE @DropFunctionSQL nvarchar(max);
      SET @DropFunctionSQL = N'DROP FUNCTION [dbo].[' + @Name + N']';
      EXEC sp_executesql
      @DropFunctionSQL;
    END

  IF @Type = 'SO'
    BEGIN
      DECLARE @DropSequenceSQL nvarchar(max);
      SET @DropSequenceSQL = N'DROP SEQUENCE [dbo].[' + @Name + N']';
      EXEC sp_executesql
      @DropSequenceSQL;
    END

  FETCH NEXT FROM CUR
  INTO @Name, @Type;

END
GO





---
--- Table Definitions
---
CREATE TABLE TTest1 (
     testId [int] IDENTITY (1,1) NOT NULL
    ,testNum [int]
    ,testText [nvarchar] (max)
);
GO



---
--- View Definitions
---





---
--- PROCEDURE Definitions
---
CREATE PROCEDURE PCreateTest1
     @Num [int]
    ,@Text [nvarchar] (max)
    ,@Id [int] OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO TTest1(testNum,testText) VALUES (@Num, @Text);
    SET @Id = SCOPE_IDENTITY();
END;

GO


---
--- Data Definitions (INSERTs)
---
DECLARE @Id int;
EXEC PCreateTest1 @Num = 100, @Text = N'ABCD1234', @Id = @Id OUTPUT;
PRINT @Id;
EXEC PCreateTest1 @Num = 200, @Text = N'ABCD2234', @Id = @Id OUTPUT;
PRINT @Id;
GO




---
--- Auto GRANTs
---
DECLARE @Name varchar(128)
DECLARE @Type varchar(2)
DECLARE CUR CURSOR LOCAL FOR
    SELECT name, type FROM sys.objects
    where (type = N'FN' OR type = N'P')

OPEN CUR;

FETCH NEXT FROM CUR
INTO @Name, @Type;

WHILE @@FETCH_STATUS = 0
BEGIN
	DECLARE @GrantSQL nvarchar(max);
	SET @GrantSQL = N'GRANT EXECUTE ON OBJECT::[' + @Name + N'] TO [rw]'

	EXEC sp_executesql
	@GrantSQL;

	FETCH NEXT FROM CUR
	INTO @Name, @Type;

END

GO
