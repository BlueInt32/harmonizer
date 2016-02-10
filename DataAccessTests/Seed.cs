using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Infrastructure.DapperDataAccess;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace DataAccessTests
{
    [TestFixture]
    public class Seed
    {
        private readonly IStaticDataRepository _staticDataRepository = new StaticDataRepository();

        [Test]
        [Category("Seeding")]
        public void CreateStaticData()
        {
            var tempi = new List<Tempo> {
                new Tempo { Id = 70, Name = "slow (70bpm)" },
                new Tempo { Id = 85, Name = "85 bpm" },
                new Tempo { Id = 100, Name = "100 bpm", IsDefault = true },
                new Tempo { Id = 115, Name = "115 bpm" },
                new Tempo { Id = 130, Name = "fast (130bpm)" }
            };

            var chordTypes = new List<ChordType> {
                new ChordType { Id = "maj", Name = "Major Triad", Description = "", Notation = "", IsDefault = true, SpriteOffset = 0 },
                new ChordType { Id = "min", Name = "Minor Triad", Description = "", Notation = "m", SpriteOffset = 3600 },
                new ChordType { Id = "dom7", Name = "Dominant Seventh", Description = "", Notation = "7", SpriteOffset = 7200 },
                new ChordType { Id = "maj7", Name = "Major Seventh", Description = "", Notation = "M7", SpriteOffset = 10800 }
            };

            var notes = new List<Note> {
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
            };
            var durations = new List<Duration> {
                new Duration { Id = 1, Name = "Quarter Note (1)" },
                new Duration { Id = 2, Name = "Half Note (2)", IsDefault = true },
                new Duration { Id = 4, Name = "Whole Note (4)" }
            };

           

            //context.Chords.AddOrUpdate(c => new { c.RootNote, c.DurationId, c.ChordTypeId }, chordsToAdd.ToArray());

            //context.SaveChanges();
        }

        [Category("Seeding")]
        public void CreateChordsFromStatic()
        {
            List<Chord> chordsToAdd = new List<Chord>();
            List<ChordType> chordTypes = _staticDataRepository.GetChordTypes();
            List<Note> notes = _staticDataRepository.GetNotes();
            List<Duration> durations = _staticDataRepository.GetDurations();

            foreach (ChordType chordType in chordTypes)
            {
                foreach (Note note in notes)
                {
                    foreach (Duration duration in durations)
                    {
                        chordsToAdd.Add(CreateChord(chordType, duration, note));
                    }
                }
            }
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
