using System.ComponentModel.DataAnnotations;

namespace Harmonizer.Domain.Entities
{
	/// <summary>
	/// Type of chord can be minor, major, dominant seventh, etc. Not note related in any way.
	/// This object has typically a 'color' in musical terms.
	/// </summary>
	public class ChordType
	{
		[StringLength(5)]
		public string Id { get; set; }

		[StringLength(50)]
		public string Name { get; set; }

		[StringLength(10)]
		public string Notation { get; set; }

		[StringLength(255)]
		public string Description { get; set; }

		public bool IsDefault { get; set; }

		public int SpriteOffset { get; set; }

	}
}