using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;

namespace Harmonizer.Infrastructure.DataAccess
{
	public class SequenceRepository : ISequenceRepository, IDisposable
	{
		private readonly HarmonizerContext _db = new HarmonizerContext();
		void ISequenceRepository.CreateSequence(Sequence sequence)
		{
			_db.Sequences.Add(sequence);
			_db.SaveChanges();
		}

		void ISequenceRepository.UpdateSequence(Sequence sequence)
		{
			_db.Entry(sequence).State = System.Data.Entity.EntityState.Modified;
			_db.SaveChanges();
		}

		void ISequenceRepository.RemoveSequence(int sequenceId)
		{
			Sequence sequence = _db.Sequences.Single(s => s.SequenceId == sequenceId);
			_db.Sequences.Remove(sequence);
			_db.SaveChanges();
		}

		Sequence ISequenceRepository.GetSequence(int sequenceId)
		{
			Sequence sequence = _db.Sequences.Include("Chords.Chord.ChordType").Include("Chords.Chord.RootNote").Single(s => s.SequenceId == sequenceId);
			return sequence;
		}

		public void Dispose()
		{
			_db.Dispose();
		}
	}
}
