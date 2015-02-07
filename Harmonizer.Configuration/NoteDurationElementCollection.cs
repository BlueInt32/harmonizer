using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace Harmonizer.Configuration
{
	public class NoteDurationElementCollection : ConfigurationElementCollection
	{
		protected override ConfigurationElement CreateNewElement()
		{
			return new NoteDurationElement();
		}
		protected override object GetElementKey(ConfigurationElement element)
		{
			return ((NoteDurationElement)element).Id;
		}
	}
}
