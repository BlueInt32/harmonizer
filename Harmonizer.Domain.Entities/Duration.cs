using System.ComponentModel.DataAnnotations;

namespace Harmonizer.Domain.Entities
{
	public class Duration
	{
		public int DurationId { get; set; }

		[StringLength(20)]
		public string Name { get; set; }

		public int SpriteOffset { get; set; }

		public int SpriteDuration { get; set; }
	}
}
