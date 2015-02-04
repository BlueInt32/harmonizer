using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Services.Interfaces;

namespace Harmonizer.Api.Services
{
	public class SequenceService : ISequenceService
	{
		private readonly ISequenceRepository _sequenceRepository;
		private readonly IChordsRepository _chordsRepository;

		public SequenceService(ISequenceRepository sequenceRepository, IChordsRepository chordsRepository)
		{
			_sequenceRepository = sequenceRepository;
			_chordsRepository = chordsRepository;
		}
		public void SaveSequence(Sequence sequence)
		{
			_sequenceRepository.CreateSequence(sequence);
		}
		/// <summary>
		/// This method gets all the chords possible into a list.
		/// This method was created to be used in Composition Root (only once)
		/// </summary>
		/// <returns></returns>
		public List<Chord> GetStaticChords()
		{
			return _chordsRepository.GetChords();
		}
	}
}