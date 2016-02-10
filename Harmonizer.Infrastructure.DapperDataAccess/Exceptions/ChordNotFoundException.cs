using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Infrastructure.DapperDataAccess.Exceptions
{
    public class ChordNotFoundException : DataAccessException
    {
        public ChordNotFoundException(string noteId, int durationId, string chordTypeId) 
            : base(
                  errorCode: "CHORD_NOT_FOUND",
                  errorMessage: string.Format($"Chord not found note:{noteId}, duration:{durationId}, chordType:{chordTypeId}"))
        {
        }
    }
}
