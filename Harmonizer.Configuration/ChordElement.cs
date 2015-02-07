using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Configuration
{
	public class ChordElement : ConfigurationElement
	{
		//Make sure to set IsKey=true for property exposed as the GetElementKey above
		[ConfigurationProperty("id", IsKey = true, IsRequired = true)]
		public string Id
		{
			get { return (string)base["id"]; }
			set { base["id"] = value; }
		}
	}
}
