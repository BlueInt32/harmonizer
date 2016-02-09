/*
Post-Deployment Script Template                            
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.        
 Use SQLCMD syntax to include a file in the post-deployment script.            
 Example:      :r .\myfile.sql                                
 Use SQLCMD syntax to reference a variable in the post-deployment script.        
 Example:      :setvar TableName MyTable                            
               SELECT * FROM [$(TableName)]                    
--------------------------------------------------------------------------------------
*/


IF (EXISTS(SELECT * FROM [dbo].[Chords]))
BEGIN
    DELETE FROM [dbo].[Chords]
END
GO

IF (EXISTS(SELECT * FROM [dbo].[ChordTypes]))
BEGIN
    DELETE FROM [dbo].[ChordTypes]
END


IF (EXISTS(SELECT * FROM [dbo].[Tempi]))
BEGIN
    DELETE FROM [dbo].[Tempi]
END
GO


IF (EXISTS(SELECT * FROM [dbo].[Durations]))
BEGIN
    DELETE FROM [dbo].[Durations]
END
GO
IF (EXISTS(SELECT * FROM [dbo].[Notes]))
BEGIN
    DELETE FROM [dbo].[Notes]
END
GO

GO
INSERT [dbo].[ChordTypes] ([Id], [Name], [Notation], [Description], [IsDefault], [SpriteOffset]) VALUES (N'dom7', N'Dominant Seventh', N'7', N'', 0, 7200)
GO
INSERT [dbo].[ChordTypes] ([Id], [Name], [Notation], [Description], [IsDefault], [SpriteOffset]) VALUES (N'maj', N'Major Triad', N'', N'', 1, 0)
GO
INSERT [dbo].[ChordTypes] ([Id], [Name], [Notation], [Description], [IsDefault], [SpriteOffset]) VALUES (N'maj7', N'Major Seventh', N'M7', N'', 0, 10800)
GO
INSERT [dbo].[ChordTypes] ([Id], [Name], [Notation], [Description], [IsDefault], [SpriteOffset]) VALUES (N'min', N'Minor Triad', N'm', N'', 0, 3600)
GO



IF (EXISTS(SELECT * FROM [dbo].[Durations]))
BEGIN
    DELETE FROM [dbo].[Durations]
END
GO
INSERT [dbo].[Durations] ([Id], [Name], [IsDefault]) VALUES (1, N'Quarter Note (1)', 0)
GO
INSERT [dbo].[Durations] ([Id], [Name], [IsDefault]) VALUES (2, N'Half Note (2)', 1)
GO
INSERT [dbo].[Durations] ([Id], [Name], [IsDefault]) VALUES (4, N'Whole Note (4)', 0)
GO

IF (EXISTS(SELECT * FROM [dbo].[Notes]))
BEGIN
    DELETE FROM [dbo].[Notes]
END
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'a', N'A', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'ab', N'Ab', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'as', N'A#', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'b', N'B', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'bb', N'Bb', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'c', N'C', 1)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'cs', N'C#', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'd', N'D', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'db', N'Db', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'ds', N'D#', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'e', N'E', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'eb', N'Eb', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'f', N'F', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'fs', N'F#', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'g', N'G', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'gb', N'Gb', 0)
GO
INSERT [dbo].[Notes] ([Id], [Name], [IsDefault]) VALUES (N'gs', N'G#', 0)
GO




SET IDENTITY_INSERT [dbo].[Chords] ON 

INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (1, N'a', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (2, N'a', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (3, N'a', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (4, N'ab', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (5, N'ab', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (6, N'ab', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (7, N'as', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (8, N'as', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (9, N'as', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (10, N'b', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (11, N'b', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (12, N'b', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (13, N'bb', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (14, N'bb', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (15, N'bb', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (16, N'c', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (17, N'c', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (18, N'c', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (19, N'cs', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (20, N'cs', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (21, N'cs', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (22, N'd', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (23, N'd', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (24, N'd', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (25, N'db', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (26, N'db', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (27, N'db', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (28, N'ds', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (29, N'ds', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (30, N'ds', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (31, N'e', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (32, N'e', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (33, N'e', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (34, N'eb', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (35, N'eb', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (36, N'eb', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (37, N'f', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (38, N'f', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (39, N'f', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (40, N'fs', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (41, N'fs', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (42, N'fs', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (43, N'g', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (44, N'g', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (45, N'g', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (46, N'gb', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (47, N'gb', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (48, N'gb', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (49, N'gs', N'dom7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (50, N'gs', N'dom7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (51, N'gs', N'dom7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (52, N'a', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (53, N'a', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (54, N'a', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (55, N'ab', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (56, N'ab', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (57, N'ab', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (58, N'as', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (59, N'as', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (60, N'as', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (61, N'b', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (62, N'b', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (63, N'b', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (64, N'bb', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (65, N'bb', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (66, N'bb', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (67, N'c', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (68, N'c', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (69, N'c', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (70, N'cs', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (71, N'cs', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (72, N'cs', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (73, N'd', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (74, N'd', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (75, N'd', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (76, N'db', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (77, N'db', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (78, N'db', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (79, N'ds', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (80, N'ds', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (81, N'ds', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (82, N'e', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (83, N'e', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (84, N'e', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (85, N'eb', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (86, N'eb', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (87, N'eb', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (88, N'f', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (89, N'f', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (90, N'f', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (91, N'fs', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (92, N'fs', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (93, N'fs', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (94, N'g', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (95, N'g', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (96, N'g', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (97, N'gb', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (98, N'gb', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (99, N'gb', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (100, N'gs', N'maj', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (101, N'gs', N'maj', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (102, N'gs', N'maj', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (103, N'a', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (104, N'a', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (105, N'a', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (106, N'ab', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (107, N'ab', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (108, N'ab', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (109, N'as', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (110, N'as', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (111, N'as', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (112, N'b', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (113, N'b', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (114, N'b', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (115, N'bb', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (116, N'bb', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (117, N'bb', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (118, N'c', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (119, N'c', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (120, N'c', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (121, N'cs', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (122, N'cs', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (123, N'cs', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (124, N'd', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (125, N'd', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (126, N'd', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (127, N'db', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (128, N'db', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (129, N'db', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (130, N'ds', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (131, N'ds', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (132, N'ds', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (133, N'e', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (134, N'e', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (135, N'e', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (136, N'eb', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (137, N'eb', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (138, N'eb', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (139, N'f', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (140, N'f', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (141, N'f', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (142, N'fs', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (143, N'fs', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (144, N'fs', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (145, N'g', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (146, N'g', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (147, N'g', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (148, N'gb', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (149, N'gb', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (150, N'gb', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (151, N'gs', N'maj7', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (152, N'gs', N'maj7', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (153, N'gs', N'maj7', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (154, N'a', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (155, N'a', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (156, N'a', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (157, N'ab', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (158, N'ab', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (159, N'ab', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (160, N'as', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (161, N'as', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (162, N'as', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (163, N'b', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (164, N'b', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (165, N'b', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (166, N'bb', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (167, N'bb', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (168, N'bb', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (169, N'c', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (170, N'c', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (171, N'c', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (172, N'cs', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (173, N'cs', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (174, N'cs', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (175, N'd', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (176, N'd', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (177, N'd', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (178, N'db', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (179, N'db', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (180, N'db', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (181, N'ds', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (182, N'ds', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (183, N'ds', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (184, N'e', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (185, N'e', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (186, N'e', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (187, N'eb', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (188, N'eb', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (189, N'eb', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (190, N'f', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (191, N'f', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (192, N'f', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (193, N'fs', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (194, N'fs', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (195, N'fs', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (196, N'g', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (197, N'g', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (198, N'g', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (199, N'gb', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (200, N'gb', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (201, N'gb', N'min', 4)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (202, N'gs', N'min', 1)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (203, N'gs', N'min', 2)
GO
INSERT [dbo].[Chords] ([Id], [RootNoteId], [ChordTypeId], [DurationId]) VALUES (204, N'gs', N'min', 4)
GO
SET IDENTITY_INSERT [dbo].[Chords] OFF
GO

INSERT [dbo].[Tempi] ([Id], [Name], [IsDefault]) VALUES (70, N'slow (70bpm)', 0)
GO
INSERT [dbo].[Tempi] ([Id], [Name], [IsDefault]) VALUES (85, N'85 bpm', 0)
GO
INSERT [dbo].[Tempi] ([Id], [Name], [IsDefault]) VALUES (100, N'100 bpm', 1)
GO
INSERT [dbo].[Tempi] ([Id], [Name], [IsDefault]) VALUES (115, N'115 bpm', 0)
GO
INSERT [dbo].[Tempi] ([Id], [Name], [IsDefault]) VALUES (130, N'fast (130bpm)', 0)
GO
