CREATE TABLE [dbo].[Notes] (
    [Id]        NVARCHAR (2) NOT NULL,
    [Name]      NVARCHAR (2) NOT NULL,
    [IsDefault] BIT          NOT NULL,
    CONSTRAINT [PK_dbo.Notes] PRIMARY KEY CLUSTERED ([Id] ASC)
);

