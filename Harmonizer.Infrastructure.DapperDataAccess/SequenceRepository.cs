using Harmonizer.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;
using Dapper;
using System.Data.SqlClient;
using System.Configuration;
using Harmonizer.Infrastructure.DapperDataAccess.Exceptions;

namespace Harmonizer.Infrastructure.DapperDataAccess
{
    public class SequenceRepository : ISequenceRepository
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["HarmonizerContext"].ConnectionString;

        public void CreateSequence(Sequence sequence)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                string sql = @" insert into Sequences values (@Name, @Description, @TempoId);
                                select cast(SCOPE_IDENTITY() as int)";
                var id = connection.Query<int>(sql, sequence).Single();
                sequence.Id = id;
            }
        }

        public void DeleteSequence(int sequenceId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                string sql = @" delete from Sequences where Id = @id";
                connection.Execute(sql, new { id = sequenceId });
            }
        }

        public Sequence GetSequence(int sequenceId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                string sql = @"select 
                        s.Id,
                        s.Name,
                        s.Description,
                        s.TempoId,
                        sc.Id as Chords_Id,
                        sc.ChordId as Chords_ChordId,
                        sc.PositionInSequence as Chords_PositionInSequence
                        from Sequences s
                        inner join SequenceChords sc on sc.SequenceId = s.Id
                        where s.Id = @id";

                dynamic sequence = connection.Query<dynamic>(sql, new { id = sequenceId });
                Slapper.AutoMapper.Configuration.AddIdentifiers(typeof(Sequence), new List<string> { "Id" });
                Slapper.AutoMapper.Configuration.AddIdentifiers(typeof(SequenceChord), new List<string> { "Chords_Id" });

                var mappedSequence = (Slapper.AutoMapper.MapDynamic<Sequence>(sequence) as IEnumerable<Sequence>).FirstOrDefault();

                if (mappedSequence == null)
                {
                    throw new SequenceNotFoundException(sequenceId);
                }

                return mappedSequence;
            }
        }

        public void CreateOrUpdateSequence(Sequence sequence)
        {
            //var sequenceInDb = _db.Sequences.AsNoTracking().Include("Chords").FirstOrDefault(s => s.Id == sequence.Id);
            //if (sequenceInDb != null)
            //{
            //    UpdateSequence(sequence);
            //}
            //else
            //{
            //    CreateSequence(sequence);
            //}
        }

        public List<Sequence> Search(string token)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                Func<string, string> encodeForLike = input => input.Replace("[", "[[]").Replace("%", "[%]");

                string term = "%" + encodeForLike(token) + "%";
                IEnumerable<Sequence> sequences = connection.Query<Sequence>(
                    "select * from Sequences where Name like @term",
                    new { term });
                return sequences.ToList();
            }
        }

        public void UpdateSequence(Sequence sequence)
        {
            throw new NotImplementedException();
        }
    }
}
