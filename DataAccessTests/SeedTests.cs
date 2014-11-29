using System;
using Harmonizer.Domain.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DataAccessTests
{
	[TestClass]
	public class SeedTests
	{
		[TestMethod]
		public void CreateNotes()
		{
			var notes = Enum.GetValues(typeof (Note));

			//Assert.
		}
	}
}
