using Harmonizer.Domain.Entities;
using Harmonizer.Infrastructure.DataAccess;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DataAccessTests
{
	[TestClass]
	public class SequenceTest
	{
		private readonly SequenceRepository _sequenceRepository = new SequenceRepository();
		[TestInitialize]
		public void InitClass()
		{
		}
		
		[TestMethod]
		public void SaveAndGetSequence()
		{
			Sequence s = new Sequence { Name = "SequenceTest_SaveAndGetSequence", Description = "So good !", TempoId = 70 };
			_sequenceRepository.CreateSequence(s);

			int sequenceId = s.SequenceId;
			Assert.IsTrue(sequenceId > 0);
			Sequence sRead = _sequenceRepository.ReadSequence(sequenceId);

			Assert.IsNotNull(sRead);
			Assert.AreEqual("SequenceTest_SaveAndGetSequence", sRead.Name);
			Assert.AreEqual("So good !", sRead.Description);
			Assert.AreEqual(70, sRead.TempoId);
		}

		[TestMethod]
		public void DeleteSequence()
		{
			Sequence s = new Sequence { Name = "SequenceTest_DeleteSequencetest", Description = "So good !", TempoId = 70 };
			_sequenceRepository.CreateSequence(s);
			int sequenceId = s.SequenceId;

			_sequenceRepository.DeleteSequence(sequenceId);
			
			Assert.IsNull(_sequenceRepository.ReadSequence(sequenceId));

		}

		[TestMethod]
		public void SearchMethod()
		{
			Sequence s1 = new Sequence { Name = "SequenceTest_SearchMethod_1", Description = "So good !", TempoId = 70 };
			Sequence s2 = new Sequence { Name = "SequenceTest_SearchMethod_1", Description = "So bad !", TempoId = 70 };

			_sequenceRepository.CreateSequence(s1);
			_sequenceRepository.CreateSequence(s2);

			var sequences = _sequenceRepository.Search("SequenceTest_SearchMethod");
			var goodSequences = _sequenceRepository.Search("So good");

			Assert.AreEqual(2, sequences.Count);
			Assert.AreEqual(1, goodSequences.Count);
		}

		[TestCleanup]
		public void CleanUp()
		{
			var sequences = _sequenceRepository.Search("SequenceTest_");
			foreach (Sequence sequence in sequences)
			{
				_sequenceRepository.DeleteSequence(sequence.SequenceId);
			}

		}
	}
}
