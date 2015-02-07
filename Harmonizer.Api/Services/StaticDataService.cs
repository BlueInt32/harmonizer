using Harmonizer.Api.Model;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harmonizer.Api.Services
{
	public class StaticDataService : IStaticDataService
	{
		private readonly IStaticDataRepository _staticDataRepository;
		private StaticData _staticData;

		public StaticDataService(IStaticDataRepository staticDataRepository)
		{
			_staticDataRepository = staticDataRepository;
		}

		public StaticData GetStaticData()
		{
			if (_staticData == null)
			{
				_staticData = new StaticData
				{
					Chords = _staticDataRepository.GetChords(),
					ChordTypes = _staticDataRepository.GetChordTypes(),
					Durations = _staticDataRepository.GetDurations(),
					Notes = _staticDataRepository.GetNotes(),
					Tempi = _staticDataRepository.GetTempi()
				};
			}
			return _staticData;
		}
	}
}