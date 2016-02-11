using Elasticsearch.Net;
using Harmonizer.Domain.Entities;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Infrastructure.ElasticSearch
{
    public class SequenceES
    {
        ElasticClient _client = null;
        public SequenceES()
        {
            var node = new Uri("http://localhost:9200");

            var settings = new ConnectionSettings(
                node,
                defaultIndex: "my-application"
            );

            _client = new ElasticClient(settings);
        }

        public void IndexSequence(Sequence sequence)
        {
            _client.Index(  sequence);
        }

        public void CreateIndex()
        {
            var settings = new IndexSettings();
            settings.NumberOfReplicas = 1;
            settings.NumberOfShards = 5;
            settings.Settings.Add("merge.policy.merge_factor", "10");
            settings.Settings.Add("search.slowlog.threshold.fetch.warn", "1s");

            _client.CreateIndex(c => c
                .Index("harmonizer")
                .InitializeUsing(settings)
            );
        }
    }
}
