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
	    void CreateOrUpdateSequence(SequenceToSaveArgs sequence);
	    void CreateSequence(SequenceToSaveArgs sequence);
	    void UpdateSequence(SequenceToSaveArgs sequence);
	    Sequence GetSequence(int sequenceId);
	    void DeleteSequence(int sequenceId);
		List<Sequence> Search(SearchSequenceQuery query);
    }
}
