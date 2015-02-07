using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Configuration
{
	[ConfigurationCollection(typeof(NoteElement))]
	public class NoteElementCollection : ConfigurationElementCollection
	{
		protected override ConfigurationElement CreateNewElement()
		{
			return new NoteElement();
		}
		protected override object GetElementKey(ConfigurationElement element)
		{
			return ((NoteElement)element).Id;
		}
	}
}
