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

		public SequenceService(ISequenceRepository sequenceRepository)
		{
			_sequenceRepository = sequenceRepository;
		}
		public Sequence GetSequence(int sequenceId)
		{
			return _sequenceRepository.ReadSequence(sequenceId);
		}
		public void SaveSequence(Sequence sequence)
		{
			_sequenceRepository.SaveSequence(sequence);
		}
	}
}