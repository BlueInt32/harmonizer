using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;

namespace Harmonizer.Domain.Interfaces
{
	public interface IStaticDataRepository
	{
		List<Chord> GetChords();
		List<ChordType> GetChordTypes();
		List<Note> GetNotes();
		List<Tempo> GetTempi();
		List<Duration> GetDurations();
	}
}
