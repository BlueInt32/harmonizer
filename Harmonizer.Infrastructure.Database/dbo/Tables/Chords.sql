CREATE TABLE [dbo].[Chords] (
    [Id]          INT          IDENTITY (1, 1) NOT NULL,
    [RootNoteId]  NVARCHAR (2) NOT NULL,
    [ChordTypeId] NVARCHAR (5) NOT NULL,
    [DurationId]  INT          NOT NULL,
    CONSTRAINT [PK_dbo.Chords] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.Chords_dbo.ChordTypes_ChordTypeId] FOREIGN KEY ([ChordTypeId]) REFERENCES [dbo].[ChordTypes] ([Id]),
    CONSTRAINT [FK_dbo.Chords_dbo.Durations_DurationId] FOREIGN KEY ([DurationId]) REFERENCES [dbo].[Durations] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_dbo.Chords_dbo.Notes_RootNoteId] FOREIGN KEY ([RootNoteId]) REFERENCES [dbo].[Notes] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_RootNoteId]
    ON [dbo].[Chords]([RootNoteId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ChordTypeId]
    ON [dbo].[Chords]([ChordTypeId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DurationId]
    ON [dbo].[Chords]([DurationId] ASC);

