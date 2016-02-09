CREATE TABLE [dbo].[Tempi] (
    [Id]        INT           NOT NULL,
    [Name]      NVARCHAR (20) NOT NULL,
    [IsDefault] BIT           NOT NULL,
    CONSTRAINT [PK_dbo.Tempi] PRIMARY KEY CLUSTERED ([Id] ASC)
);

