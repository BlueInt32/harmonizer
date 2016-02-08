using Harmonizer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Domain.Interfaces
{
    public interface ISequenceChordRepository
    {
        void CreateSequenceChord(SequenceChord sequenceChord);
        void DeleteSequenceChord(int sequenceChordId);
    }
}
