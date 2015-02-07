using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace Harmonizer.Configuration
{
	public class ChordElementCollection : ConfigurationElementCollection
	{
		protected override ConfigurationElement CreateNewElement()
		{
			return new ChordElement();
		}
		protected override object GetElementKey(ConfigurationElement element)
		{
			return ((ChordElement)element).Id;
		}
	}
}
