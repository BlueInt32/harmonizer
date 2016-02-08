using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Infrastructure.DapperDataAccess;
using Harmonizer.Infrastructure.DapperDataAccess.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace DataAccessTests
{
    [TestClass]
    public class SequenceTest
    {
        private readonly ISequenceRepository _sequenceRepository = new SequenceRepository();
        private readonly ISequenceChordRepository _sequenceChordRepository = new SequenceChordRepository();
        [TestInitialize]
        public void InitClass()
        {
        }

        [TestMethod]
        public void SaveAndGetSequence()
        {
            Sequence s = new Sequence
            {
                Name = "SequenceTest_SaveAndGetSequence",
                Description = "So good !",
                TempoId = 70
            };
            _sequenceRepository.CreateSequence(s);

            int sequenceId = s.Id;

            var chordsInSequence = new List<SequenceChord>
            {
                new SequenceChord {
                    PositionInSequence = 1,
                    ChordId = 1,
                    SequenceId = sequenceId
                },

                new SequenceChord {
                    PositionInSequence = 2,
                    ChordId = 25,
                    SequenceId = sequenceId
                },
                new SequenceChord {
                    PositionInSequence = 3,
                    ChordId = 50,
                    SequenceId = sequenceId
                }
            };

            foreach (var sequenceChord in chordsInSequence)
            {
                _sequenceChordRepository.CreateSequenceChord(sequenceChord);
            }

            Assert.IsTrue(sequenceId > 0);
            Sequence sRead = _sequenceRepository.GetSequence(sequenceId);

            Assert.IsNotNull(sRead);
            Assert.AreEqual("SequenceTest_SaveAndGetSequence", sRead.Name);
            Assert.AreEqual("So good !", sRead.Description);
            Assert.AreEqual(70, sRead.TempoId);
        }

        [TestMethod,
            ExpectedException(typeof(SequenceNotFoundException), "A unexisting sequenceId did not throw")]
        public void DeleteSequence()
        {
            Sequence s = new Sequence { Name = "SequenceTest_DeleteSequencetest", Description = "So good !", TempoId = 70 };
            _sequenceRepository.CreateSequence(s);
            int sequenceId = s.Id;

            _sequenceRepository.DeleteSequence(sequenceId);

            Assert.IsNull(_sequenceRepository.GetSequence(sequenceId));

        }

        [TestMethod]
        public void SearchByNameMethod()
        {
            Sequence s1 = new Sequence { Name = "SequenceTest_SearchMethod_1", Description = "So good !", TempoId = 70 };
            Sequence s2 = new Sequence { Name = "SequenceTest_SearchMethod_1", Description = "So bad !", TempoId = 70 };

            _sequenceRepository.CreateSequence(s1);
            _sequenceRepository.CreateSequence(s2);

            var sequences = _sequenceRepository.Search("SequenceTest_SearchMethod");

            Assert.AreEqual(2, sequences.Count, "Search by name");
        }

        [TestCleanup]
        public void CleanUp()
        {
            var sequences = _sequenceRepository.Search("SequenceTest_");
            foreach (Sequence sequence in sequences)
            {
                _sequenceRepository.DeleteSequence(sequence.Id);
            }

        }

        [TestMethod, TestCategory("Exception scenario"),
            ExpectedException(typeof(SequenceNotFoundException), "A unexisting sequenceId did not throw")]
        public void ProperlyNotFoundException()
        {
            _sequenceRepository.GetSequence(-1);
        }

        public class Person
        {
            public int Id;
            public string FirstName;
            public string LastName;
            public Class Classroom;
        }

        public class Class
        {
            public int Id;
            public string Name;
        }

        [TestMethod]
        public void Can_Map_Matching_Field_Names_With_Ease()
        {
            // Arrange
            var dictionary = new Dictionary<string, object>
                            {
                                { "Id", 1 },
                                { "FirstName", "Clark" },
                                { "LastName", "Kent" },
                                { "Id", 2 },
                                { "Name", "Class B" }
                            };

            // Act
            var person = Slapper.AutoMapper.Map<Person>(dictionary);

            // Assert
            Assert.IsNotNull(person);
            Assert.IsTrue(person.Id == 1);
            Assert.IsTrue(person.FirstName == "Clark");
            Assert.IsTrue(person.LastName == "Kent");
            Assert.IsTrue(person.Classroom.Name == "Class B");
        }
    }
}
