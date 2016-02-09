CREATE TABLE [dbo].[Sequences] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (50)  NOT NULL,
    [Description] NVARCHAR (255) NULL,
    [TempoId]     INT            NOT NULL,
    CONSTRAINT [PK_dbo.Sequences] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.Sequences_dbo.Tempi_TempoId] FOREIGN KEY ([TempoId]) REFERENCES [dbo].[Tempi] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_TempoId]
    ON [dbo].[Sequences]([TempoId] ASC);

