using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Domain.Entities
{
    public class SequenceToSaveArgs
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<int> ChordsIds { get; set; }
        public int TempoId { get; set; }
    }
}
