using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Infrastructure.DataAccess.Extensions;

namespace Harmonizer.Infrastructure.DataAccess
{
	public class SequenceRepository : ISequenceRepository, IDisposable
	{
		private readonly HarmonizerContext _db = new HarmonizerContext();
		public void SaveSequence(Sequence sequence)
		{
			var sequenceInDb = _db.Sequences.AsNoTracking().Include("Chords").FirstOrDefault(s => s.Id == sequence.Id);
			if (sequenceInDb != null)
			{
				UpdateSequence(sequence);
			}
			else
			{
				CreateSequence(sequence);
			}
		}

		public void CreateSequence(Sequence sequence)
		{
			_db.Sequences.Add(sequence);
			_db.SaveChanges();
		}

		public void UpdateSequence(Sequence sequence)
		{
			// when updating a sequence, potentially all sequenceChords are messed up so we have to check all the possibilities

			//1- Get fresh data from database
			//var existingStudent = _db.Students.AsNoTracking().Include(s => s.Standard).Include(s => s.Standard.Teachers).Where(s => s.StudentName == "updated student").FirstOrDefault<Student>();

			var existingSequence = _db.Sequences.Include("Chords").SingleOrDefault(s => s.Id == sequence.Id);

			var existingSequenceChords = existingSequence.Chords.ToList<SequenceChord>();

			var updatedSequenceChords = sequence.Chords;

			//2- Find newly added teachers by updatedTeachers (teacher came from client sided) - existingTeacher = newly added teacher
			var addedSequenceChords = updatedSequenceChords.Except(existingSequenceChords, sChord => sChord.Id);

			//3- Find deleted teachers by existing teachers - updatedTeachers = deleted teachers
			var deletedSequenceChords = existingSequenceChords.Except(updatedSequenceChords, sChord => sChord.Id);

			//4- Find modified teachers by updatedTeachers - addedTeachers = modified teachers
			var modifiedSequenceChords = updatedSequenceChords.Except(addedSequenceChords, sChord => sChord.Id);

			//5- Mark all added teachers entity state to Added
			addedSequenceChords.ToList<SequenceChord>().ForEach(sChord => _db.Entry(sChord).State = EntityState.Added);

			//6- Mark all deleted teacher entity state to Deleted
			deletedSequenceChords.ToList<SequenceChord>().ForEach(sChord => _db.Entry(sChord).State = EntityState.Deleted);


			//7- Apply modified teachers current property values to existing property values
			foreach (SequenceChord sChord in modifiedSequenceChords)
			{
				//8- Find existing teacher by id from fresh database teachers
				var existingSequenceChord = _db.SequenceChords.Find(sChord.Id);

				if (existingSequenceChord != null)
				{
					//9- Get DBEntityEntry object for each existing teacher entity
					var sequenceChordEntry = _db.Entry(existingSequenceChord);
					//10- overwrite all property current values from modified teachers' entity values, 
					//so that it will have all modified values and mark entity as modified
					sequenceChordEntry.CurrentValues.SetValues(sChord);
				}

			}
			_db.SaveChanges();
		}

		public void DeleteSequence(int sequenceId)
		{
			Sequence sequence = _db.Sequences.Single(s => s.Id == sequenceId);
			_db.Sequences.Remove(sequence);
			_db.SaveChanges();
		}

		public List<Sequence> Search(string token)
		{
			List<Sequence> results = _db.Sequences.Where(s => s.Name.Contains(token) || s.Description.Contains(token)).ToList();
			return results;
		}

		public Sequence ReadSequence(int sequenceId)
		{
			Sequence sequence = _db.Sequences.Include("Chords.Chord.ChordType").Include("Chords.Chord.RootNote").SingleOrDefault(s => s.Id == sequenceId);
			return sequence;
		}

		public void Dispose()
		{
			_db.Dispose();
		}
	}
}
