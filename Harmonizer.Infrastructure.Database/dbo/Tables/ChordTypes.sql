CREATE TABLE [dbo].[ChordTypes] (
    [Id]           NVARCHAR (5)   NOT NULL,
    [Name]         NVARCHAR (50)  NOT NULL,
    [Notation]     NVARCHAR (10)  NOT NULL,
    [Description]  NVARCHAR (255) NULL,
    [IsDefault]    BIT            NOT NULL,
    [SpriteOffset] INT            NOT NULL,
    CONSTRAINT [PK_dbo.ChordTypes] PRIMARY KEY CLUSTERED ([Id] ASC)
);

