using System.ComponentModel.DataAnnotations;

namespace Harmonizer.Domain.Entities
{
	public class ChordType
	{
		public int ChordTypeId { get; set; }

		[StringLength(50)]
		public string Name { get; set; }

		[StringLength(10)]
		public string Notation { get; set; }

		[StringLength(255)]
		public string Description { get; set; }
	}
}