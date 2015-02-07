using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Harmonizer.Api.Extensions;
using Harmonizer.Api.Model;
using Harmonizer.Domain.Entities;
using Harmonizer.Services.Interfaces;

namespace Harmonizer.Api.Controllers
{
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	[RoutePrefix("api/static")]
	public class StaticDataController : ApiController
	{
		private readonly IStaticDataService _staticDataService;

		public StaticDataController(IStaticDataService staticDataService)
		{
			_staticDataService = staticDataService;
		}
		
		public IHttpActionResult GetStaticData()
		{
			var staticData = _staticDataService.GetStaticData();

			return Ok(staticData);
		}

	}
}