using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Infrastructure.DapperDataAccess.Exceptions
{
    public class DataAccessException : Exception
    {
        public DataAccessException(string errorCode, string errorMessage)
        {
            _errorCode = errorCode;
            _errorMessage = errorMessage;
        }

        private readonly string _errorCode;
        public string ErrorCode { get { return _errorCode; } }

        private readonly string _errorMessage;
        public string ErrorMessage { get { return _errorMessage; } }
    }
}
