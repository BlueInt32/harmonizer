using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Configuration
{
	public class NoteDurationElement : ConfigurationElement
	{
		//Make sure to set IsKey=true for property exposed as the GetElementKey above
		[ConfigurationProperty("id", IsKey = true, IsRequired = true)]
		public int Id
		{
			get { return (int)base["id"]; }
			set { base["id"] = value; }
		}

		[ConfigurationProperty("name", IsRequired = true)]
		public string Name
		{
			get { return (string)base["name"]; }
			set { base["name"] = value; }
		}

		[ConfigurationProperty("spriteOffset", IsRequired = true)]
		public int spriteOffset
		{
			get { return (int)base["spriteOffset"]; }
			set { base["spriteOffset"] = value; }
		}
		[ConfigurationProperty("spriteExcerptDuration", IsRequired = true)]
		public int spriteExcerptDuration
		{
			get { return (int)base["spriteExcerptDuration"]; }
			set { base["spriteExcerptDuration"] = value; }
		}
	}
}
