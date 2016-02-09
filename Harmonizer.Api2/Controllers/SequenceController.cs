using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.AspNet.Mvc;
using Harmonizer.Services.Interfaces;
using Harmonizer.Domain.Entities;
using Harmonizer.Api2.Extensions;
using Harmonizer.Api2.Model;

namespace Harmonizer.Api.Controllers
{
	//[EnableCors(origins: "*", headers: "*", methods: "*")]
	[Route("api/sequence")]
	public class SequenceController : Controller
    {
		private readonly ISequenceService _sequenceService;
		private readonly IStaticDataService _staticDataService;

		public SequenceController(ISequenceService sequenceService, IStaticDataService staticDataService)
		{
			_sequenceService = sequenceService;
			_staticDataService = staticDataService;
		}

		[HttpPost]
		public IActionResult SaveSequence(SequenceViewModel model)
		{
			Sequence sequence = model.ToDomainSequence(_staticDataService);
			_sequenceService.SaveSequence(sequence);
			return Ok(sequence.ToWebSequence(_staticDataService));
		}

        [HttpGet("{id}")]
        public IActionResult GetSequence(int id)
		{
			return Ok(_sequenceService.GetSequence(id).ToWebSequence(_staticDataService));
		}
	}
}