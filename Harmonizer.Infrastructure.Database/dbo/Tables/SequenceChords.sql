CREATE TABLE [dbo].[SequenceChords] (
    [Id]                 INT IDENTITY (1, 1) NOT NULL,
    [PositionInSequence] INT NOT NULL,
    [ChordId]            INT NOT NULL,
    [SequenceId]         INT NOT NULL,
    CONSTRAINT [PK_dbo.SequenceChords] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.SequenceChords_dbo.Chords_ChordId] FOREIGN KEY ([ChordId]) REFERENCES [dbo].[Chords] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_dbo.SequenceChords_dbo.Sequences_SequenceId] FOREIGN KEY ([SequenceId]) REFERENCES [dbo].[Sequences] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_ChordId]
    ON [dbo].[SequenceChords]([ChordId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_SequenceId]
    ON [dbo].[SequenceChords]([SequenceId] ASC);

