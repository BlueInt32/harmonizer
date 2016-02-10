using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Services.Interfaces;

namespace Harmonizer.Services
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
			return _sequenceRepository.GetSequence(sequenceId);
		}
		public Sequence SaveSequence(SequenceToSaveArgs sequenceToSaveArgs)
		{
			_sequenceRepository.CreateOrUpdateSequence(sequenceToSaveArgs);
            Sequence savedSequence = new Sequence();
            savedSequence.

        }
        public List<Sequence> SearchForSequences(SearchSequenceQuery query)
        {
            return _sequenceRepository.Search(query);
        }

        private Sequence Reconciliate(int sequenceId)
    }
}