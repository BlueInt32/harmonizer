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
	/// Everything relative to a note. 
	/// This entity/table cannot be in third normal form because flat/sharp notations of enharmony cannot be easily made independant.
	/// </summary>
	public class Note
	{
		[Key, StringLength(2)]
		public string Id { get; set; }
	}
}
