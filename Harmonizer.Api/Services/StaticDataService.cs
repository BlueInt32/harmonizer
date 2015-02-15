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
		private List<Chord> _chords;

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
					ChordTypes = _staticDataRepository.GetChordTypes(),
					Durations = _staticDataRepository.GetDurations(),
					Notes = _staticDataRepository.GetNotes(),
					Tempi = _staticDataRepository.GetTempi()
				};
				_staticData.DefaultChordType = _staticData.ChordTypes.FirstOrDefault(c => c.IsDefault);
				_staticData.DefaultDuration = _staticData.Durations.FirstOrDefault(c => c.IsDefault);
				_staticData.DefaultNote = _staticData.Notes.FirstOrDefault(c => c.IsDefault);
				_staticData.DefaultTempo = _staticData.Tempi.FirstOrDefault(c => c.IsDefault);

			}
			return _staticData;
		}

		public List<Chord> GetChords()
		{
			return _chords ?? (_chords = _staticDataRepository.GetChords());
		}
	}
}