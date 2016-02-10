using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Domain.Entities
{
    public class SearchSequenceQuery
    {
        public SearchSequenceQuery()
        {
            Pagination = new Pagination
            {
                PageNumber = 1,
                PageSize = 10
            };
            Sorting = new Sorting
            {
                Property = SequenceSortingProperty.Name,
                Direction = "asc"
            };
        }
        public string Term { get; set; }

        public Pagination Pagination { get; set; }
        public Sorting Sorting { get; set; }
    }
}
