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
				new Tempo { Id = 70, Name = "slow (70bpm)" },
				new Tempo { Id = 85, Name = "85 bpm" },
				new Tempo { Id = 100, Name = "100 bpm", IsDefault = true },
				new Tempo { Id = 115, Name = "115 bpm" },
				new Tempo { Id = 130, Name = "fast (130bpm)" }
				);

			context.ChordTypes.AddOrUpdate(
				ct => ct.Id,
				new ChordType { Id = "maj", Name = "Major Triad", Description = "", Notation = "", IsDefault = true, SpriteOffset=0 },
				new ChordType { Id = "min", Name = "Minor Triad", Description = "", Notation = "m", SpriteOffset=7800 },
				new ChordType { Id = "dom7", Name = "Dominant Seventh", Description = "", Notation = "7" }
				);
			context.Notes.AddOrUpdate(
				note => note.Id,
				new Note { Name = "Ab", Id = "ab" },
				new Note { Name = "A", Id = "a" },
				new Note { Name = "A#", Id = "as" },
				new Note { Name = "Bb", Id = "bb" },
				new Note { Name = "B", Id = "b" },
				new Note { Name = "C", Id = "c", IsDefault = true },
				new Note { Name = "C#", Id = "cs" },
				new Note { Name = "Db", Id = "db" },
				new Note { Name = "D", Id = "d" },
				new Note { Name = "D#", Id = "ds" },
				new Note { Name = "Eb", Id = "eb" },
				new Note { Name = "E", Id = "e" },
				new Note { Name = "F", Id = "f" },
				new Note { Name = "F#", Id = "fs" },
				new Note { Name = "Gb", Id = "gb" },
				new Note { Name = "G", Id = "g" },
				new Note { Name = "G#", Id = "gs" }
				);
			context.Durations.AddOrUpdate(
				duration => duration.Name,
				new Duration { Name = "Quarter Note (1)", Id = 1, SpriteOffset = 0, SpriteDuration = 1800 },
				new Duration { Name = "Half Note (2)", Id = 2, SpriteOffset = 1800, SpriteDuration = 2400, IsDefault = true },
				new Duration { Name = "Whole Note (4)", Id = 3, SpriteOffset = 4200, SpriteDuration = 3600 }
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

			context.Chords.AddOrUpdate(c => new { c.RootNote, c.DurationId, c.ChordTypeId }, chordsToAdd.ToArray());

			context.SaveChanges();
		}

		private Chord CreateChord(ChordType cType, Duration duration, Note note)
		{
			return new Chord
			{
				ChordTypeId = cType.Id,
				DurationId = duration.Id,
				RootNoteId = note.Id
			};
		}
	}
}
