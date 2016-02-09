CREATE TABLE [dbo].[Durations] (
    [Id]        INT           NOT NULL,
    [Name]      NVARCHAR (20) NOT NULL,
    [IsDefault] BIT           NOT NULL,
    CONSTRAINT [PK_dbo.Durations] PRIMARY KEY CLUSTERED ([Id] ASC)
);

