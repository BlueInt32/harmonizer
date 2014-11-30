using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// ReSharper disable once CheckNamespace
namespace Harmonizer.Domain.Entities
{
	/// <summary>
	/// Everything relative to a note, with all the notations possible. 
	/// This entity/table cannot be in third normal form because flat/sharp notations of enharmony cannot be easily made independant.
	/// </summary>
	public class Note
	{
		public int NoteId { get; set; }

		[StringLength(2)]
		public string UsNotationSharp { get; set; }
		[StringLength(2)]
		public string UsNotationFlat { get; set; }
		[StringLength(4)]
		public string EuropeanNotationSharp { get; set; }
		[StringLength(4)]
		public string EuropeanNotationFlat { get; set; }
	}
}
