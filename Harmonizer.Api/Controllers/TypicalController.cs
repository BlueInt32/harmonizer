using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace ProductStore.Filters
{
	using System;
	using System.Net;
	using System.Net.Http;
	using System.Web.Http.Filters;

	public class SpecialMistakeAttribute : ExceptionFilterAttribute
	{
		public override void OnException(HttpActionExecutedContext context)
		{
			if (context.Exception is NotImplementedException)
			{
				context.Response = new HttpResponseMessage(HttpStatusCode.NotImplemented);
			}
		}
	}
}


namespace Harmonizer.Api.Controllers
{
	[RoutePrefix("api/typicalobjects")]
	public class TypicalObjectsController : ApiController
	{
		[Route(""), ValidateModel]
		public HttpResponseMessage PostTypicalObject()
		{
			return Request.CreateResponse(HttpStatusCode.OK);
		}
	}
}
