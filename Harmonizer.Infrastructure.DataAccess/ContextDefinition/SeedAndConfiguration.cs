using System.Collections.Generic;
using Harmonizer.Domain.Entities;

namespace Harmonizer.Infrastructure.DataAccess.Migrations
{
	using System;
	using System.Data.Entity;
	using System.Data.Entity.Migrations;
	using System.Linq;

	internal sealed class Configuration : DbMigrationsConfiguration<HarmonizerContext>
	{
		public Configuration()
		{
			AutomaticMigrationsEnabled = true;
		}

		protected override void Seed(HarmonizerContext context)
		{
			context.Tempi.AddOrUpdate(
				tempo => tempo.Name,
				new Tempo { TempoId = 70, Name = "slow (70bpm)" },
				new Tempo { TempoId = 85, Name = "85 bpm" },
				new Tempo { TempoId = 100, Name = "100 bpm" },
				new Tempo { TempoId = 115, Name = "115 bpm" },
				new Tempo { TempoId = 130, Name = "fast (130bpm)" } 
				);

			context.ChordTypes.AddOrUpdate(
				ct => ct.ChordTypeId,
				new ChordType { ChordTypeId = "maj", Name = "Triade majeure", Description = "", Notation = "" },
				new ChordType { ChordTypeId = "min", Name = "Triade mineure", Description = "", Notation = "m" },
				new ChordType { ChordTypeId = "dom7", Name = "Septième de dominante", Description = "", Notation = "7" }
				);
			context.Notes.AddOrUpdate(
				note => note.Id,
				new Note { Id = "Ab" },
				new Note { Id = "A" },
				new Note { Id = "A#" },
				new Note { Id = "Bb" },
				new Note { Id = "B" },
				new Note { Id = "C" },
				new Note { Id = "C#" },
				new Note { Id = "Db" },
				new Note { Id = "D" },
				new Note { Id = "D#" },
				new Note { Id = "Eb" },
				new Note { Id = "E" },
				new Note { Id = "F" },
				new Note { Id = "F#" },
				new Note { Id = "Gb" },
				new Note { Id = "G" },
				new Note { Id = "G#" }
				);
			context.Durations.AddOrUpdate(
				duration => duration.Name,
				new Duration { Name = "Quarter Note (1)", DurationId = 1, SpriteOffset = 0, SpriteDuration = 1800 },
				new Duration { Name = "Half Note (2)", DurationId = 2, SpriteOffset = 1800, SpriteDuration = 2400 },
				new Duration { Name = "Whole Note (4)", DurationId = 3, SpriteOffset = 4200, SpriteDuration = 3600 }
				);
			context.SaveChanges();

			List<Chord> chordsToAdd = new List<Chord>();
			foreach (ChordType chordType in context.ChordTypes.ToList())
			{
				foreach (Note note in context.Notes.ToList())
				{
					foreach (Duration duration in context.Durations.ToList())
					{
						chordsToAdd.Add(CreateChord(chordType, duration, note));
					}
				}
			}

			context.Chords.AddOrUpdate(c => new {c.RootNote, c.DurationId, c.ChordTypeId}, chordsToAdd.ToArray());

			context.SaveChanges();
		}

		private Chord CreateChord(ChordType cType, Duration duration, Note note)
		{
			return new Chord
			{
				ChordTypeId = cType.ChordTypeId,
				DurationId = duration.DurationId,
				RootNoteId = note.Id
			};
		}
	}
}
