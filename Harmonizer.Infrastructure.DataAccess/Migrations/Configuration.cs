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

			context.SaveChanges();
			foreach (ChordType chordType in context.ChordTypes)
	        {
				foreach (Note note in Enum.GetValues(typeof(Note)))
		        {
			        context.Chords.AddOrUpdate(
						c => c.ShortName,
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
			    RootNote = note,
			    ShortName = string.Format("{0}{1}{2}", length, note.ToString().Replace('s', '#'), cType.Notation)
		    };
	    }
    }
}
