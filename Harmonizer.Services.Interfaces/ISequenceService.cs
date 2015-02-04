using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;

namespace Harmonizer.Services.Interfaces
{
    public interface ISequenceService
    {
	    Sequence GetSequence(int sequenceId);
	    void SaveSequence(Sequence sequence);
	    List<Chord> GetStaticChords();
    }
}
