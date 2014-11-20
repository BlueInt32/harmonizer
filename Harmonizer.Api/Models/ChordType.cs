using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harmonizer.Models
{
	public class ChordType
	{
		public int ChordTypeId { get; set; }
		public string Name { get; set; }
		public string Notation { get; set; }
		public string Description { get; set; }
	}
}