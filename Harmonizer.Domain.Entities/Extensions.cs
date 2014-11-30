using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Domain.Entities
{
	public static class Extensions
	{
		public static string Notation(this Chord chord)
		{
			return string.Format("{0}{1}{2}", chord.Length, chord.RootNote.ToString().Replace('s', '#'), chord.ChordType.Notation);
		}
	}
}
