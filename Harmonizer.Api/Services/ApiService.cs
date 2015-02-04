using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harmonizer.Api.Services
{
	public class ApiService : IApiService
	{
		private readonly ISequenceService _sequenceService;

		public ApiService(ISequenceService sequenceService)
		{
			_sequenceService = sequenceService;
		}
		public void InitializeChordsToApplication()
		{
			HttpContext.Current.Application["staticChords"] = _sequenceService.GetStaticChords();
		}
		public List<Chord> StaticChords
		{
			get
			{
				if (HttpContext.Current.Application["staticChords"] == null)
					InitializeChordsToApplication();
				return HttpContext.Current.Application["staticChords"] as List<Chord>; 
			}
		}
	}
}