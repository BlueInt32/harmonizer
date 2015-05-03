using Harmonizer.Front.Models;
using Harmonizer.Services.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Harmonizer.Front.Controllers
{
    public class HomeController : Controller
	{
		private readonly IStaticDataService _staticDataService;
        // GET: Home
		public HomeController(IStaticDataService staticDataService)
		{
			_staticDataService = staticDataService;
		}
        public ActionResult Index()
		{
			var staticData = _staticDataService.GetStaticData();

			HarmonizerModel model = new HarmonizerModel
			{
				StaticData = JsonConvert.SerializeObject(staticData, new JsonSerializerSettings
				{
					ContractResolver = new CamelCasePropertyNamesContractResolver()
				})
			};
			return View(model);
        }

	    public ActionResult Test()
	    {
		    return View();
	    }
    }
}