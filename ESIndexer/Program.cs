using Harmonizer.Domain.Entities;
using Harmonizer.Infrastructure.ElasticSearch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESIndexer
{
    class Program
    {
        static void Main(string[] args)
        {
            SequenceES indexer = new SequenceES();
            indexer.CreateIndex();

            indexer.IndexSequence(new Sequence
            {
                Id = 1,
                Name = "salut",
                Description = "hello"
            });
        }
    }
}
