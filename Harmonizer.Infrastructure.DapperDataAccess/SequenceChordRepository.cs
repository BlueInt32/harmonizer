using Harmonizer.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;
using System.Data.SqlClient;
using System.Configuration;
using Dapper;

namespace Harmonizer.Infrastructure.DapperDataAccess
{
    public class SequenceChordRepository : ISequenceChordRepository
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["HarmonizerContext"].ConnectionString;

        public void CreateSequenceChord(SequenceChord sequenceChord)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                string sql = @"insert into SequenceChords values (@PositionInSequence, @ChordId, @SequenceId);
                                select cast(SCOPE_IDENTITY() as int)";
                var id = connection.Query<int>(sql, sequenceChord).Single();
                sequenceChord.Id = id;
            }
        }

        public void DeleteSequenceChord(int sequenceChordId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                string sql = @" delete from SequenceChords where Id = @id";
                connection.Execute(sql, new { id = sequenceChordId });
            }
        }
    }
}
