using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Harmonizer.Domain.Entities;
using Harmonizer.Services.Interfaces;

namespace Harmonizer.Api.Controllers
{
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	[RoutePrefix("api/sequence")]
	public class SequenceController : ApiController
	{
		private readonly ISequenceService _sequenceService;

		public SequenceController(ISequenceService sequenceService)
		{
			_sequenceService = sequenceService;
		}

		public IEnumerable<Sequence> GetAllProducts()
		{
			return new List<Sequence>();
		}

		[Route]
		public IHttpActionResult SaveSequence(MySuperModel model)
		{
			return Ok(model.i);
			//_sequenceService.SaveSequence(sequence);

			//return Ok(sequence);
		}
	}

	public class MySuperModel
	{
		public int i { get; set; }
	}
}