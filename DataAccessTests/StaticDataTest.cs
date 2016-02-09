using Harmonizer.Domain.Interfaces;
using Harmonizer.Infrastructure.DapperDataAccess;
using NUnit.Framework;
using System;

namespace DataAccessTests
{

    [TestFixture]
    public class StaticDataTest
    {
        private readonly IStaticDataRepository _staticDataRepository = new StaticDataRepository();


        [Test]
        public void TestStaticData()
        {
            var tempi = _staticDataRepository.GetTempi();
            var notes = _staticDataRepository.GetNotes();
            var durations = _staticDataRepository.GetDurations();
            var chordTypes = _staticDataRepository.GetChordTypes();
            var chords = _staticDataRepository.GetChords();

            //var nbTempi = 


            Assert.IsNotNull(chords);
            Assert.IsTrue(chords.Count > 1);
        }
    }
}
