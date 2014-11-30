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
			context.ChordTypes.AddOrUpdate(
				ct => ct.Name,
				new ChordType { Name = "Triade majeure", Description = "", Notation = "" },
				new ChordType { Name = "Triade mineure", Description = "", Notation = "m" },
				new ChordType { Name = "Septième de dominante", Description = "", Notation = "7" }
				);
			context.Notes.AddOrUpdate(
				note => note.UsNotationFlat,
				new Note { UsNotationFlat = "A", UsNotationSharp = "A", EuropeanNotationFlat = "La", EuropeanNotationSharp = "La" },
				new Note { UsNotationFlat = "Bb", UsNotationSharp = "A#", EuropeanNotationFlat = "Sib", EuropeanNotationSharp = "La#" },
				new Note { UsNotationFlat = "B", UsNotationSharp = "B", EuropeanNotationFlat = "Si", EuropeanNotationSharp = "Si" },
				new Note { UsNotationFlat = "C", UsNotationSharp = "C", EuropeanNotationFlat = "Do", EuropeanNotationSharp = "Do" },
				new Note { UsNotationFlat = "Db", UsNotationSharp = "C#", EuropeanNotationFlat = "Réb", EuropeanNotationSharp = "Do#" },
				new Note { UsNotationFlat = "D", UsNotationSharp = "D", EuropeanNotationFlat = "Ré", EuropeanNotationSharp = "Ré" },
				new Note { UsNotationFlat = "Eb", UsNotationSharp = "D#", EuropeanNotationFlat = "Mib", EuropeanNotationSharp = "Ré#" },
				new Note { UsNotationFlat = "E", UsNotationSharp = "E", EuropeanNotationFlat = "Mi", EuropeanNotationSharp = "Mi" },
				new Note { UsNotationFlat = "F", UsNotationSharp = "F", EuropeanNotationFlat = "Fa", EuropeanNotationSharp = "Fa" },
				new Note { UsNotationFlat = "Gb", UsNotationSharp = "F#", EuropeanNotationFlat = "Solb", EuropeanNotationSharp = "Fa#" },
				new Note { UsNotationFlat = "G", UsNotationSharp = "G", EuropeanNotationFlat = "Sol", EuropeanNotationSharp = "Sol" },
				new Note { UsNotationFlat = "Ab", UsNotationSharp = "G#", EuropeanNotationFlat = "La", EuropeanNotationSharp = "Sol#" }
				);

			context.SaveChanges();
			foreach (ChordType chordType in context.ChordTypes)
	        {
				foreach (Note note in context.Notes)
		        {
			        context.Chords.AddOrUpdate(
						c => new {c.RootNoteId, c.Length, c.ChordTypeId },
						CreateChord(chordType, 1, note),
						CreateChord(chordType, 2, note),
						CreateChord(chordType, 4, note)
						);
		        }
	        }
	        context.SaveChanges();
        }

	    private Chord CreateChord(ChordType cType, int length, Note note)
	    {
		    return new Chord
		    {
			    ChordType = cType,
			    Length = length,
			    RootNote = note
		    };
	    }
    }
}
