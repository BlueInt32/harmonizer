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
		private ISequenceRepository _sequenceRepository;

		public SequenceService(ISequenceRepository sequenceRepository)
		{
			_sequenceRepository = sequenceRepository;
		}
		public void SaveSequence(Sequence sequence)
		{
			throw new NotImplementedException();
		}
	}
}