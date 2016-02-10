using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using System.Configuration;
using System.Data.SqlClient;
using Dapper;
using Harmonizer.Infrastructure.DapperDataAccess.Exceptions;

namespace Harmonizer.Infrastructure.DapperDataAccess
{
	public class StaticDataRepository : IStaticDataRepository
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["HarmonizerContext"].ConnectionString;

        public List<Chord> GetChords()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                IEnumerable<Chord> chords = connection.Query<Chord>("select * from Chords");
                return chords.ToList();
            }
        }
		public List<ChordType> GetChordTypes()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                IEnumerable<ChordType> chordTypes = connection.Query<ChordType>("select * from ChordTypes");
                return chordTypes.ToList();
            }
        }
		public List<Note> GetNotes()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                IEnumerable<Note> notes = connection.Query<Note>("select * from Notes");
                return notes.ToList();
            }
        }
		public List<Tempo> GetTempi()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                IEnumerable<Tempo> tempi = connection.Query<Tempo>("select * from Tempi");
                return tempi.ToList();
            }
        }

		public List<Duration> GetDurations()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                IEnumerable<Duration> durations = connection.Query<Duration>("select * from Durations");
                return durations.ToList();
            }
        }

        public int FindChord(string noteId, int durationId, string chordTypeId)
        {
            var foundChord = GetChords().FirstOrDefault(
                    c => c.RootNoteId == noteId
                    && c.DurationId == durationId
                    && c.ChordTypeId == chordTypeId);
            if (foundChord == null)
            {
                throw new ChordNotFoundException(noteId, durationId, chordTypeId);
            }
            return foundChord.Id;
        }
    }
}
