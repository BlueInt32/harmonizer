using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harmonizer.Services
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
				_staticData.DefaultChordTypeId = _staticData.ChordTypes.Where(c => c.IsDefault).Select(c => c.Id).FirstOrDefault();
				_staticData.DefaultDurationId = _staticData.Durations.Where(c => c.IsDefault).Select(c => c.Id).FirstOrDefault();
				_staticData.DefaultNoteId = _staticData.Notes.Where(c => c.IsDefault).Select(c => c.Id).FirstOrDefault();
				_staticData.DefaultTempoId = _staticData.Tempi.Where(c => c.IsDefault).Select(c => c.Id).FirstOrDefault();

			}
			return _staticData;
		}

		public List<Chord> GetChords()
		{
			return _chords ?? (_chords = _staticDataRepository.GetChords());
		}
	}
}