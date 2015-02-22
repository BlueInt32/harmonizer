using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Harmonizer.Domain.Entities
{
	public class Duration
	{
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public int Id { get; set; }

		[StringLength(20)]
		public string Name { get; set; }

		public int SpriteOffset { get; set; }

		public int SpriteDuration { get; set; }

		public bool IsDefault { get; set; }
	}
}
