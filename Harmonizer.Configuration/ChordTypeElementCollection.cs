using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace Harmonizer.Configuration
{
	public class ChordTypeElementCollection : ConfigurationElementCollection
	{
		protected override ConfigurationElement CreateNewElement()
		{
			return new ChordTypeElement();
		}
		protected override object GetElementKey(ConfigurationElement element)
		{
			return ((ChordTypeElement)element).Id;
		}
	}
}
