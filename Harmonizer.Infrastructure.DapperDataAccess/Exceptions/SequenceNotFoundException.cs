using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Infrastructure.DapperDataAccess.Exceptions
{
    public class SequenceNotFoundException : DataAccessException
    {
        public SequenceNotFoundException(int sequenceId) 
            : base(
                  errorCode: "SEQUENCE_NOT_FOUND",
                  errorMessage: string.Format($"Sequence not found {sequenceId}"))
        {
        }
    }
}
