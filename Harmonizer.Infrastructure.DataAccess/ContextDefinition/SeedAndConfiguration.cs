using System.Collections.Generic;
using Harmonizer.Domain.Entities;

namespace Harmonizer.Infrastructure.DataAccess.Migrations
{
	using System;
	using System.Data.Entity;
	using System.Data.Entity.Migrations;
	using System.Linq;

	internal sealed class Configuration : DbMigrationsConfiguration<HarmonizerContext>
	{
		public Configuration()
		{
			AutomaticMigrationsEnabled = true;
		}

		
	}
}
