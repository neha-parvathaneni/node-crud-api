SET XACT_ABORT ON;
BEGIN TRANSACTION;


IF OBJECT_ID('dbo.StudentCourse', 'U') IS NOT NULL DROP TABLE dbo.StudentCourse;
IF OBJECT_ID('dbo.Course', 'U') IS NOT NULL DROP TABLE dbo.Course;
IF OBJECT_ID('dbo.Student', 'U') IS NOT NULL DROP TABLE dbo.Student;
IF OBJECT_ID('dbo.Teacher', 'U') IS NOT NULL DROP TABLE dbo.Teacher;
IF OBJECT_ID('dbo.[User]', 'U') IS NOT NULL DROP TABLE dbo.[User];

CREATE TABLE dbo.[User] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Age INT CHECK (Age BETWEEN 3 AND 120),
    Email NVARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE dbo.Student (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    CONSTRAINT FK_Student_User
    FOREIGN KEY (UserId)
    REFERENCES dbo.[User](Id)
    ON DELETE CASCADE
);


CREATE TABLE dbo.Teacher (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    CONSTRAINT FK_Teacher_User
    FOREIGN KEY (UserId)
    REFERENCES dbo.[User](Id)
    ON DELETE CASCADE
);

CREATE TABLE dbo.Course (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(20) UNIQUE NOT NULL,
    Title NVARCHAR(120) NOT NULL,
    Credits INT CHECK (Credits BETWEEN 1 AND 10),
    TeacherId INT UNIQUE,  
    CONSTRAINT FK_Course_Teacher
    FOREIGN KEY (TeacherId)
    REFERENCES dbo.Teacher(Id)
    ON DELETE SET NULL
);


CREATE TABLE dbo.StudentCourse (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    StudentId INT NOT NULL,
    CourseId INT NOT NULL,
    CONSTRAINT UQ_StudentCourse UNIQUE (StudentId, CourseId),
    CONSTRAINT FK_SC_Student
    FOREIGN KEY (StudentId)
    REFERENCES dbo.Student(Id)
    ON DELETE CASCADE,
    CONSTRAINT FK_SC_Course
    FOREIGN KEY (CourseId)
    REFERENCES dbo.Course(Id)
    ON DELETE CASCADE
);


COMMIT TRANSACTION;
