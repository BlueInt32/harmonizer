use Harmonizer;


SELECT TOP 1000 [Id]
      ,[Name]
      ,[Description]
      ,[TempoId]
  FROM [Harmonizer].[dbo].[Sequences]


  select * from [dbo].[Sequences] where Name like '%SequenceTest_SearchMethod%'

  delete from [dbo].[Sequences]