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
	[RoutePrefix("api/sequence")]
	public class SequenceController : ApiController
	{
		private readonly ISequenceService _sequenceService;
		private readonly IStaticDataService _staticDataService;

		public SequenceController(ISequenceService sequenceService, IStaticDataService staticDataService)
		{
			_sequenceService = sequenceService;
			_staticDataService = staticDataService;
		}

		//public IEnumerable<Sequence> GetAllProducts()
		//{
		//	return new List<Sequence>();
		//}

		[Route]
		public IHttpActionResult SaveSequence(SequenceViewModel model)
		{
			_sequenceService.SaveSequence(model.ToDomainSequence(_staticDataService));
			return Ok(model);
		}

		public IHttpActionResult GetSequence(int id)
		{
			return Ok(_sequenceService.GetSequence(id).ToWebSequence(_staticDataService));
		}
	}
}