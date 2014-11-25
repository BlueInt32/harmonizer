using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;

namespace Harmonizer.Domain.Interfaces
{
    public interface ISequenceRepository
    {
	    void CreateSequence(Sequence sequence);
	    void UpdateSequence(Sequence sequence);
	    void RemoveSequence(int sequenceId);
	    Sequence GetSequence(int sequenceId);
    }
}
