using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Harmonizer.Domain.Entities
{
	public class Tempo
	{
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public int TempoId { get; set; }

		[StringLength(20)]
		public string Name { get; set; }
	}
}
